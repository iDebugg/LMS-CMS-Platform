# Von Newman Atlas

An immersive learning management system (LMS), content management system
(CMS), and public landing experience built with Next.js, React, TypeScript,
GSAP, and mock catalogue data.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Main routes:

- `/` — public landing page
- `/auth` — authentication prototype
- `/onboarding` — learner walkthrough
- `/learn` — LMS
- `/admin` — CMS

## Production

```bash
npm ci
npm run build
npm start
```

The repository is a standard Next.js application and can be connected to a
GitHub-compatible Next.js host such as Vercel. No database or external service
is required for the current prototype; state is backed by mock catalogue data
and browser storage.

## Other commands

```bash
npm run lint
npm test
npm run catalogue:generate
```

`catalogue:generate` rebuilds `app/ui/catalogue.generated.ts` from the catalogue
source expected by the generator.
