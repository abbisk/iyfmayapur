import { randomUUID } from "node:crypto";
import { DEPARTMENT_CODE, encryptPayload, GATEWAY_URL } from "../../_lib/treasury.js";

const required = ["email", "amount", "mobile", "first_name", "last_name", "address_1", "pin_code", "district", "city", "state", "country", "course_id"];

export default function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  try {
    const input = request.body || {};
    const missing = required.filter((field) => !String(input[field] ?? "").trim());
    const amount = Number(input.amount);
    if (missing.length || !Number.isFinite(amount) || amount <= 0) {
      return response.status(400).json({ error: "Please complete the course payment details.", fields: missing });
    }

    const referenceId = `IYF-LMS-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
    const payload = {
      dept_code: DEPARTMENT_CODE,
      name: `${input.first_name} ${input.last_name}`,
      email: input.email,
      reference_id: referenceId,
      amount: amount.toFixed(2),
      mode: "1",
      type: "1",
      isRecurring: "0",
      mobile: input.mobile,
      first_name: input.first_name,
      middle_name: input.middle_name || "",
      last_name: input.last_name,
      transaction_purpose: `LMS Course Enrollment (course_id:${input.course_id})`,
      course_id: String(input.course_id),
      pan_card: "",
      passport_no: "",
      address_1: input.address_1,
      address_2: input.address_2 || "",
      post_office: "",
      pin_code: input.pin_code,
      district: input.district,
      city: input.city,
      state: input.state,
      country: input.country,
    };

    const data = encryptPayload(payload);
    return response.status(200).json({
      reference_id: referenceId,
      payment_url: `${GATEWAY_URL}?dept_code=${DEPARTMENT_CODE}&data=${encodeURIComponent(data)}`,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Unable to start the LMS course payment." });
  }
}
