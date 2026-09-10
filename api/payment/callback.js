import { callbackClaims, decryptPayload, signPaymentToken } from "../_lib/treasury.js";

export default function handler(request, response) {
  const siteUrl = process.env.PUBLIC_SITE_URL || "https://iyfmayapur.org";
  try {
    if (request.method !== "GET" || !request.query.data) throw new Error("Missing Treasury callback data");
    const claims = callbackClaims(decryptPayload(request.query.data));
    if (!claims.reference_id) throw new Error("Treasury response did not include a reference number");
    const token = signPaymentToken(claims);
    const destination = claims.course_id
      ? `${siteUrl}/lms/course/${encodeURIComponent(claims.course_id)}`
      : `${siteUrl}/donation`;
    return response.redirect(302, `${destination}?payment_token=${encodeURIComponent(token)}`);
  } catch (error) {
    console.error(error);
    return response.redirect(302, `${siteUrl}/donation?payment_error=callback`);
  }
}
