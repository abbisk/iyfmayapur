import { createReceiptPdf, verifyPaymentToken } from "../_lib/treasury.js";

export default function handler(request, response) {
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed" });
  try {
    const payment = verifyPaymentToken(request.query.token);
    if (payment.status !== "success") return response.status(403).json({ error: "A confirmed receipt is not available." });
    const pdf = createReceiptPdf(payment);
    response.setHeader("Content-Type", "application/pdf");
    response.setHeader("Content-Disposition", `attachment; filename="IYF-Receipt-${payment.reference_id}.pdf"`);
    return response.status(200).send(pdf);
  } catch {
    return response.status(400).json({ error: "The receipt link is invalid or expired." });
  }
}
