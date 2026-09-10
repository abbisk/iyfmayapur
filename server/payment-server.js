import { createCipheriv, createDecipheriv, randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { URL, URLSearchParams } from "node:url";

function loadLocalEnv() {
  try {
    const contents = readFileSync(new URL("../.env", import.meta.url), "utf8");
    for (const line of contents.split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
    }
  } catch { /* Production provides environment variables directly. */ }
}

loadLocalEnv();
const PORT = Number(process.env.PAYMENT_SERVER_PORT || 1769);
const SITE_URL = process.env.PUBLIC_SITE_URL || "http://localhost:5173";
const GATEWAY_URL = process.env.MAYAPUR_PAYMENT_GATEWAY_URL
  || "https://payments.mayapur.com/process/payment/request";
const DEPARTMENT_CODE = "IYF";
const payments = new Map();
const requiredFields = ["email", "amount", "mobile", "first_name", "last_name", "address_1", "pin_code", "district", "city", "state", "country"];

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => { body += chunk; if (body.length > 50_000) request.destroy(); });
    request.on("end", () => { try { resolve(JSON.parse(body || "{}")); } catch (error) { reject(error); } });
    request.on("error", reject);
  });
}

function encryptionKey() {
  const key = process.env.MAYAPUR_PAYMENT_AUTH_KEY;
  if (!key || Buffer.byteLength(key) !== 32) throw new Error("MAYAPUR_PAYMENT_AUTH_KEY must be the 32-character Treasury key");
  return Buffer.from(key, "utf8");
}

function encryptPayload(payload) {
  const cipher = createCipheriv("aes-256-ecb", encryptionKey(), null);
  const encrypted = Buffer.concat([cipher.update(new URLSearchParams(payload).toString(), "utf8"), cipher.final()]).toString("base64");
  return Buffer.from(encrypted, "utf8").toString("base64");
}

function decryptPayload(value) {
  const encrypted = Buffer.from(value, "base64").toString("utf8");
  const decipher = createDecipheriv("aes-256-ecb", encryptionKey(), null);
  const text = Buffer.concat([decipher.update(encrypted, "base64"), decipher.final()]).toString("utf8");
  try { return JSON.parse(text); } catch { return Object.fromEntries(new URLSearchParams(text)); }
}

function paymentSucceeded(payload) {
  const status = [payload.status, payload.payment_status, payload.response, payload.message, payload.Response_Message].filter(Boolean).join(" ").toLowerCase();
  return payload.Response_Code === "E000" || /success|successful|completed|captured|approved/.test(status);
}

function escapePdfText(value) {
  return String(value ?? "").replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function createReceiptPdf(payment) {
  const rows = [
    "IYF MAYAPUR - DONATION RECEIPT", "Thank you for your generous contribution.", "",
    `Receipt / Reference: ${payment.reference_id}`,
    `Date: ${new Date(payment.completed_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
    `Donor: ${payment.first_name} ${payment.middle_name || ""} ${payment.last_name}`.replace(/\s+/g, " "),
    `Email: ${payment.email}`, `Mobile: ${payment.mobile}`,
    `Purpose: ${payment.transaction_purpose}`, `Amount: INR ${Number(payment.amount).toFixed(2)}`,
    `Transaction ID: ${payment.Unique_Ref_Number || payment.transaction_id || payment.payment_id || "Confirmed by Mayapur Treasury"}`,
    "", "This is a computer-generated acknowledgement.",
  ];
  const stream = `BT /F1 16 Tf 54 760 Td (${escapePdfText(rows[0])}) Tj /F1 11 Tf 0 -34 Td ${rows.slice(1).map((row) => `(${escapePdfText(row)}) Tj 0 -23 Td`).join(" ")} ET`;
  const objects = ["<< /Type /Catalog /Pages 2 0 R >>", "<< /Type /Pages /Kids [3 0 R] /Count 1 >>", "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>", `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => { offsets.push(Buffer.byteLength(pdf)); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n `).join("\n")}\ntrailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf);
}

async function handleInitiate(request, response) {
  const input = await readJson(request);
  const missing = requiredFields.filter((field) => !String(input[field] ?? "").trim());
  const amount = Number(input.amount);
  if (missing.length || !Number.isFinite(amount) || amount <= 0) return sendJson(response, 400, { error: "Please complete all required donation details.", fields: missing });
  const referenceId = `IYF-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const payload = {
    dept_code: DEPARTMENT_CODE, name: `${input.first_name} ${input.last_name}`, email: input.email,
    reference_id: referenceId, amount: amount.toFixed(2), mode: "1", type: "1", isRecurring: "0",
    mobile: input.mobile, first_name: input.first_name, middle_name: input.middle_name || "", last_name: input.last_name,
    transaction_purpose: input.transaction_purpose || "General Donation", course_id: input.course_id || "", pan_card: input.pan_card || "", passport_no: input.passport_no || "",
    address_1: input.address_1, address_2: input.address_2 || "", post_office: input.post_office || "",
    pin_code: input.pin_code, district: input.district, city: input.city, state: input.state, country: input.country,
  };
  payments.set(referenceId, { ...payload, status: "pending", created_at: new Date().toISOString() });
  const data = encryptPayload(payload);
  sendJson(response, 200, { reference_id: referenceId, payment_url: `${GATEWAY_URL}?dept_code=${DEPARTMENT_CODE}&data=${encodeURIComponent(data)}` });
}

function handleCallback(requestUrl, response) {
  try {
    const result = decryptPayload(requestUrl.searchParams.get("data") || "");
    const referenceId = result.reference_id || result.sub_merchant_reference_no;
    if (!referenceId) throw new Error("Treasury response did not include a reference number");
    const existing = payments.get(referenceId) || {};
    const succeeded = paymentSucceeded(result);
    payments.set(referenceId, { ...existing, ...result, status: succeeded ? "success" : "failed", completed_at: new Date().toISOString() });
    const courseId = existing.course_id || result.course_id || result.transaction_purpose?.match(/course[_ ]id[:=]([\w-]+)/i)?.[1] || "";
    const destination = courseId ? `${SITE_URL}/lms/course/${encodeURIComponent(courseId)}` : `${SITE_URL}/donation`;
    response.writeHead(302, { Location: `${destination}?reference_id=${encodeURIComponent(referenceId)}` });
    response.end();
  } catch (error) {
    console.error("Payment callback error:", error.message);
    response.writeHead(302, { Location: `${SITE_URL}/donation?payment_error=callback` });
    response.end();
  }
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  try {
    if (request.method === "POST" && requestUrl.pathname === "/api/payment/initiate") return await handleInitiate(request, response);
    if (request.method === "GET" && requestUrl.pathname === "/api/payment/callback") return handleCallback(requestUrl, response);
    const statusMatch = requestUrl.pathname.match(/^\/api\/payment\/status\/([^/]+)$/);
    if (request.method === "GET" && requestUrl.pathname === "/api/payment/status" && requestUrl.searchParams.has("token")) {
      return sendJson(response, 400, { error: "Token verification is only available through the deployed payment API." });
    }
    if (request.method === "GET" && statusMatch) {
      const payment = payments.get(decodeURIComponent(statusMatch[1]));
      if (!payment) return sendJson(response, 404, { error: "Payment record not found." });
      return sendJson(response, 200, { reference_id: payment.reference_id, amount: payment.amount, first_name: payment.first_name, transaction_purpose: payment.transaction_purpose, course_id: payment.course_id || "", status: payment.status });
    }
    const receiptMatch = requestUrl.pathname.match(/^\/api\/payment\/receipt\/([^/]+)$/);
    if (request.method === "GET" && receiptMatch) {
      const payment = payments.get(decodeURIComponent(receiptMatch[1]));
      if (!payment || payment.status !== "success") return sendJson(response, 404, { error: "A confirmed receipt is not available." });
      const pdf = createReceiptPdf(payment);
      response.writeHead(200, { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="IYF-Receipt-${payment.reference_id}.pdf"`, "Content-Length": pdf.length });
      return response.end(pdf);
    }
    sendJson(response, 404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "Unable to process the payment request." });
  }
});

server.listen(PORT, () => console.log(`Payment server listening on http://localhost:${PORT}`));
