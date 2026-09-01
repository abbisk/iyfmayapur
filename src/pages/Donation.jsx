import { useEffect, useState } from "react";
import { FiCheckCircle, FiDownload, FiHeart, FiLock } from "react-icons/fi";

const amountOptions = [501, 1100, 2100, 3001, 4001, 5001];
const initialForm = {
  amount: "", first_name: "", middle_name: "", last_name: "", email: "", mobile: "",
  pan_card: "", address_1: "", address_2: "", pin_code: "", district: "", city: "",
  state: "", country: "India",
};

async function readApiResponse(response) {
  const body = await response.text();

  if (!body.trim()) {
    throw new Error(
      response.ok
        ? "The payment server returned an empty response."
        : "The payment server is unavailable. Start it with `npm run payment-server` and try again."
    );
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new Error("The payment server returned an invalid response. Please try again.");
  }
}

export default function Donation() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState(null);
  const [paymentToken, setPaymentToken] = useState("");

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const token = search.get("payment_token");
    if (token) {
      setPaymentToken(token);
      fetch(`/api/payment/status?token=${encodeURIComponent(token)}`)
        .then(async (response) => {
          const data = await readApiResponse(response);
          if (!response.ok) throw new Error(data.error || "Unable to verify payment.");
          setPayment(data);
        })
        .catch((requestError) => setError(requestError.message));
      return;
    }

    const referenceId = search.get("reference_id");
    if (!referenceId) return;
    fetch(`/api/payment/status/${encodeURIComponent(referenceId)}`)
      .then(async (response) => {
        const data = await readApiResponse(response);
        if (!response.ok) throw new Error(data.error || "Unable to verify payment.");
        setPayment(data);
      })
      .catch((requestError) => setError(requestError.message));
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const beginPayment = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await readApiResponse(response);
      if (!response.ok) throw new Error(data.error || "Unable to start payment.");
      if (!data.payment_url) throw new Error("The payment server did not return a checkout URL.");
      window.location.assign(data.payment_url);
    } catch (requestError) {
      setError(requestError.message);
      setLoading(false);
    }
  };

  if (payment?.status === "success") {
    return (
      <div className="donation-result-page">
        <section className="donation-result-card">
          <FiCheckCircle className="donation-result-card__icon" aria-hidden="true" />
          <p className="donation-kicker">Payment successful</p>
          <h1>{payment.first_name ? `Thank you, ${payment.first_name}.` : "Thank you for your offering."}</h1>
          <p>Your contribution helps us serve and inspire the youth community of Sridham Mayapur.</p>
          <div className="donation-receipt-summary">
            <span>Donation amount <strong>₹{Number(payment.amount).toLocaleString("en-IN")}</strong></span>
            <span>Reference <strong>{payment.reference_id}</strong></span>
          </div>
          <a
            className="donation-primary-button"
            href={paymentToken
              ? `/api/payment/receipt?token=${encodeURIComponent(paymentToken)}`
              : `/api/payment/receipt/${encodeURIComponent(payment.reference_id)}`}
          >
            <FiDownload aria-hidden="true" /> Download PDF receipt
          </a>
        </section>
      </div>
    );
  }

  if (payment && payment.status !== "success") {
    return (
      <div className="donation-result-page">
        <section className="donation-result-card">
          <p className="donation-kicker">Payment not completed</p>
          <h1>We could not confirm your donation.</h1>
          <p>No receipt has been issued. Please retry, or contact IYF Mayapur with reference <strong>{payment.reference_id}</strong>.</p>
          <a className="donation-primary-button" href="/donation">Try again</a>
        </section>
      </div>
    );
  }

  return (
    <div className="donation-page">
      <header className="donation-hero">
        <div className="donation-shell">
          <p className="donation-kicker">One-time contribution</p>
          <h1>Give with devotion.<br />Create lasting impact.</h1>
          <p>Support IYF Mayapur’s spiritual education, youth outreach and community service.</p>
        </div>
      </header>

      <main className="donation-layout donation-shell">
        <aside className="donation-story">
          <div className="donation-story__image"><img src="/donation/Chaitanya-Mahaprabhu.webp" alt="Chaitanya Mahaprabhu" /></div>
          <FiHeart aria-hidden="true" />
          <h2>Your offering makes service possible.</h2>
          <p>Every donation is securely processed by the ISKCON Mayapur Treasury payment gateway.</p>
          <span><FiLock aria-hidden="true" /> Secure one-time payment</span>
        </aside>

        <form className="donation-form" onSubmit={beginPayment}>
          <div className="donation-form__heading">
            <span>1</span><div><p>Your offering</p><h2>Choose an amount</h2></div>
          </div>
          <div className="donation-amounts">
            {amountOptions.map((amount) => (
              <button type="button" className={Number(form.amount) === amount ? "is-selected" : ""} onClick={() => setForm((current) => ({ ...current, amount: String(amount) }))} key={amount}>₹{amount.toLocaleString("en-IN")}</button>
            ))}
          </div>
          <label className="donation-field donation-field--full"><span>Custom amount (₹) *</span><input required min="1" step="1" type="number" name="amount" value={form.amount} onChange={updateField} placeholder="Enter amount" /></label>

          <div className="donation-form__heading donation-form__heading--spaced">
            <span>2</span><div><p>Donor details</p><h2>Tell us about yourself</h2></div>
          </div>
          <div className="donation-fields">
            <label className="donation-field"><span>First name *</span><input required name="first_name" value={form.first_name} onChange={updateField} /></label>
            <label className="donation-field"><span>Middle name</span><input name="middle_name" value={form.middle_name} onChange={updateField} /></label>
            <label className="donation-field"><span>Last name *</span><input required name="last_name" value={form.last_name} onChange={updateField} /></label>
            <label className="donation-field"><span>Email *</span><input required type="email" name="email" value={form.email} onChange={updateField} /></label>
            <label className="donation-field"><span>Mobile *</span><input required inputMode="numeric" name="mobile" value={form.mobile} onChange={updateField} /></label>
            <label className="donation-field"><span>PAN card (required for 80G)</span><input name="pan_card" value={form.pan_card} onChange={updateField} /></label>
            <label className="donation-field donation-field--full"><span>Address line 1 *</span><input required name="address_1" value={form.address_1} onChange={updateField} /></label>
            <label className="donation-field donation-field--full"><span>Address line 2</span><input name="address_2" value={form.address_2} onChange={updateField} /></label>
            <label className="donation-field"><span>PIN / postal code *</span><input required name="pin_code" value={form.pin_code} onChange={updateField} /></label>
            <label className="donation-field"><span>District *</span><input required name="district" value={form.district} onChange={updateField} /></label>
            <label className="donation-field"><span>City *</span><input required name="city" value={form.city} onChange={updateField} /></label>
            <label className="donation-field"><span>State *</span><input required name="state" value={form.state} onChange={updateField} /></label>
            <label className="donation-field donation-field--full"><span>Country *</span><input required name="country" value={form.country} onChange={updateField} /></label>
          </div>
          {error && <p className="donation-error" role="alert">{error}</p>}
          <button className="donation-primary-button" type="submit" disabled={loading}>
            <FiLock aria-hidden="true" /> {loading ? "Connecting securely…" : `Proceed to pay ₹${Number(form.amount || 0).toLocaleString("en-IN")}`}
          </button>
          <p className="donation-form__note">You’ll continue to Mayapur Treasury’s secure payment page. This is a one-time donation and will not recur.</p>
        </form>
      </main>
    </div>
  );
}
