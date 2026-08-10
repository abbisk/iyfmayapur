import { verifyPaymentToken } from "../_lib/treasury.js";

export default function handler(request, response) {
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed" });
  try {
    const payment = verifyPaymentToken(request.query.token);
    return response.status(200).json(payment);
  } catch {
    return response.status(400).json({ error: "The payment response could not be verified." });
  }
}
