# Adrielle Estacio — Personal Portfolio

Portfolio site for Adrielle Q. Estacio, BS Information Technology student at
Pampanga State Agricultural University. Live at
<https://my-personal-portfolio-pi-one.vercel.app/>.

Built with React 19, Vite 7, Tailwind CSS v4 and React Router.

## Getting started

```bash
npm install
npm run dev
```

| Script            | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the dev server with HMR         |
| `npm run build`   | Production build into `dist/`         |
| `npm run preview` | Serve the production build locally    |
| `npm run lint`    | Run ESLint                            |

## Editing content

All copy lives in `src/data/` so the components never need touching:

| File                      | Contents                                        |
| ------------------------- | ----------------------------------------------- |
| `src/data/profile.js`     | Name, headline, bio, contact details, socials   |
| `src/data/skills.js`      | Skill groups and soft skills                    |
| `src/data/projects.js`    | Projects (the one with `featured: true` is pinned at the top) |
| `src/data/education.js`   | Education history and seminars                  |

The résumé served by the **Download CV** buttons is
`public/resume/Adrielle-Estacio-Resume.docx` — replace that file to update it
(a PDF works too; just update `resumeUrl` in `profile.js`).

## Contact form

By default the form opens the visitor's mail client with the message
pre-filled. To have submissions delivered to your inbox instead:

1. Go to <https://web3forms.com>, enter your email, and copy the access key
   they send you (it's safe to expose — it only lets the form send to you).
2. Locally: create `.env` with `VITE_CONTACT_ACCESS_KEY=<key>` (see
   `.env.example`).
3. On Vercel: Project → **Settings → Environment Variables** → add
   `VITE_CONTACT_ACCESS_KEY`, then **Redeploy** (Vite bakes env vars in at
   build time, so a redeploy is required).

Any other service that accepts a JSON POST works through
`VITE_CONTACT_ENDPOINT`. The form includes a honeypot field, and a failed
delivery shows your email address so a message is never silently lost.

## Project structure

```
src/
├── components/   # Page sections and shared UI
├── data/         # All site content
├── hooks/        # useTheme, useActiveSection, useReveal, use-toast
├── pages/        # Home and NotFound routes
└── index.css     # Tailwind theme tokens, light/dark palette, utilities
```
