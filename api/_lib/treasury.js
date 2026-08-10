import { createCipheriv, createDecipheriv, createHmac, timingSafeEqual } from "node:crypto";

export const GATEWAY_URL = process.env.MAYAPUR_PAYMENT_GATEWAY_URL
  || "https://payments.mayapur.com/process/payment/request";
export const DEPARTMENT_CODE = "IYF";

function key() {
  const value = process.env.MAYAPUR_PAYMENT_AUTH_KEY;
  if (!value || Buffer.byteLength(value) !== 32) {
    throw new Error("MAYAPUR_PAYMENT_AUTH_KEY is not configured correctly");
  }
  return Buffer.from(value, "utf8");
}

export function encryptPayload(payload) {
  const cipher = createCipheriv("aes-256-ecb", key(), null);
  const encrypted = Buffer.concat([
    cipher.update(new URLSearchParams(payload).toString(), "utf8"),
    cipher.final(),
  ]).toString("base64");
  return Buffer.from(encrypted, "utf8").toString("base64");
}

export function decryptPayload(value) {
  const encrypted = Buffer.from(value, "base64").toString("utf8");
  const decipher = createDecipheriv("aes-256-ecb", key(), null);
  const text = Buffer.concat([
    decipher.update(encrypted, "base64"), decipher.final(),
  ]).toString("utf8");
  try { return JSON.parse(text); } catch { return Object.fromEntries(new URLSearchParams(text)); }
}

export function paymentSucceeded(payload) {
  const status = [payload.status, payload.payment_status, payload.response, payload.message, payload.Response_Message]
    .filter(Boolean).join(" ").toLowerCase();
  return payload.Response_Code === "E000" || /success|successful|completed|captured|approved/.test(status);
}

export function callbackClaims(payload) {
  return {
    reference_id: payload.reference_id || payload.sub_merchant_reference_no,
    transaction_id: payload.Unique_Ref_Number || payload.transaction_id || payload.payment_id || "",
    amount: payload.Total_Amount || payload.requested_payment_amount || payload.amount || "",
    status: paymentSucceeded(payload) ? "success" : "failed",
    transaction_date: payload.Transaction_Date || new Date().toISOString(),
    payment_mode: payload.Payment_Mode || "",
    purpose: "General Donation",
  };
}

export function signPaymentToken(claims) {
  const payload = Buffer.from(JSON.stringify({ ...claims, issued_at: Date.now() })).toString("base64url");
  const signature = createHmac("sha256", key()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyPaymentToken(token) {
  const [payload, signature] = String(token || "").split(".");
  if (!payload || !signature) throw new Error("Invalid payment token");
  const expected = createHmac("sha256", key()).update(payload).digest();
  const received = Buffer.from(signature, "base64url");
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) throw new Error("Invalid payment signature");
  const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  if (Date.now() - claims.issued_at > 1000 * 60 * 60 * 24 * 365) throw new Error("Payment token expired");
  return claims;
}

function escapePdf(value) {
  return String(value ?? "").replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export function createReceiptPdf(payment) {
  const rows = [
    "IYF MAYAPUR - DONATION RECEIPT", "Thank you for your generous contribution.", "",
    `Receipt / Reference: ${payment.reference_id}`,
    `Transaction date: ${payment.transaction_date}`,
    `Purpose: ${payment.purpose}`,
    `Amount: INR ${Number(payment.amount).toFixed(2)}`,
    `Transaction ID: ${payment.transaction_id || "Confirmed by Mayapur Treasury"}`,
    `Payment mode: ${payment.payment_mode || "Online"}`, "",
    "This is a computer-generated payment acknowledgement.",
  ];
  const stream = `BT /F1 16 Tf 54 760 Td (${escapePdf(rows[0])}) Tj /F1 11 Tf 0 -34 Td ${rows.slice(1).map((row) => `(${escapePdf(row)}) Tj 0 -23 Td`).join(" ")} ET`;
  const objects = ["<< /Type /Catalog /Pages 2 0 R >>", "<< /Type /Pages /Kids [3 0 R] /Count 1 >>", "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>", `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => { offsets.push(Buffer.byteLength(pdf)); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n `).join("\n")}\ntrailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf);
}
