# React + Vite

## Donation payment flow

The one-time donation flow uses the ISKCON Mayapur Treasury gateway. Keep the Treasury authentication key on the server only.

1. Copy `.env.example` to `.env` and add the Treasury key.
2. Start the API with `npm run payment-server`.
3. Start the website in another terminal with `npm run dev`.

Production must expose the Node payment server at `/api/payment/*`, set `PUBLIC_SITE_URL=https://iyfmayapur.org`, and configure Treasury's callback URL as `https://iyfmayapur.org/api/payment/callback`.

The active Treasury request host is configured with `MAYAPUR_PAYMENT_GATEWAY_URL`. Use the non-`www` host (`https://payments.mayapur.com/process/payment/request`), because the `www.payments.mayapur.com` hostname does not resolve.

### Vercel deployment

The `api/payment` directory contains Vercel serverless functions for payment initiation, callbacks, verification, and PDF receipts. Add these encrypted environment variables to the Vercel project for Production, Preview, and Development:

- `MAYAPUR_PAYMENT_AUTH_KEY` — the 32-character key supplied by Treasury
- `MAYAPUR_PAYMENT_GATEWAY_URL` — `https://payments.mayapur.com/process/payment/request`
- `PUBLIC_SITE_URL` — `https://iyfmayapur.org`

Point both `iyfmayapur.org` and `www.iyfmayapur.org` to the Vercel project, with `iyfmayapur.org` as the primary domain. Treasury's configured callback URL must remain `https://iyfmayapur.org/api/payment/callback`.

## Event registration Google Form

Each event can have its own Google Form URL and its own questions. Add a `registrationForm` object to that event in `src/data/events.js`, containing its `url` and `fields`. Events without this object display “Registration opening soon” and never submit to another event's form.

The **Alumni Camp 2026 — Jagannath Puri** event is connected only to its dedicated Google Form and submits Full Name, Mobile No, Japa Count, and Date using that form's matching field IDs.

To find a field ID for another event, open its Google Form, choose **Get pre-filled link**, enter recognizable sample values, and inspect the generated link. Each field appears as an `entry.123456=value` query parameter.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
