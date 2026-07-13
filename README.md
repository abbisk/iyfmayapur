# React + Vite

## Event registration Google Form

The **Alumni Camp 2026 — Jagannath Puri** event is already connected to its dedicated Google Form and submits Full Name, Mobile No, Japa Count, and Date using the form's matching field IDs.

The event registration form posts directly to Google Forms. Copy `.env.example` to `.env`, then replace the form URL and every `entry.*` value with the values from your Google Form. Create fields for full name, email, phone, city, age, occupation/college, event, and message.

To find a field ID, open the Google Form, choose **Get pre-filled link**, enter recognizable sample values, and inspect the generated link. Each field appears as an `entry.123456=value` query parameter. Restart the Vite dev server after updating `.env`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
