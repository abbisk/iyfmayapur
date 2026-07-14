# React + Vite

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
