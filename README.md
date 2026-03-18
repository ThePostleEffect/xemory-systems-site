# Xemory Systems Website

Official marketing website for Xemory Systems, built with Next.js, TypeScript, Tailwind CSS, and the App Router.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- App Router

## Local setup

1. Open a terminal in `C:\Users\Daniel\xemory-systems-website`
2. Install dependencies if needed:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`

## Build

Create a production build:

```bash
npm run build
```

Run the production server locally after building:

```bash
npm run start
```

## Project structure

```text
src/
  app/
    api/
      contact/
        route.ts
    about/
      page.tsx
    ai-training/
      page.tsx
    capabilities/
      page.tsx
    contact/
      page.tsx
    what-we-do/
      page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    brand-lockup.tsx
    contact-action.tsx
    contact-intake-form.tsx
    home-experience.tsx
    page-dock.tsx
    page-shell.tsx
    portal-art.tsx
  lib/
    contact-form.ts
    site-content.ts
```

## Content and branding notes

- The homepage uses an immersive navigation layout instead of a conventional top navigation bar.
- The site uses the supplied logo image from `public/`.
- The primary contact experience is a real form submission flow.
- To change the public contact address or inquiry subject line, edit [site-content.ts](C:\Users\Daniel\xemory-systems-website\src\lib\site-content.ts).

## Accessibility notes

- Semantic page structure and heading hierarchy are built into each route.
- Focus states are visible across interactive elements.
- Motion respects `prefers-reduced-motion`.
- Large homepage navigation targets remain keyboard accessible.
- Contrast and type sizing were chosen for dark-first readability.

## Deployment notes

This project is configured for a GitHub-to-Vercel workflow and uses a Vercel-friendly serverless API route for contact form delivery.

Typical deployment flow:

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Keep the default Next.js build settings.
4. Add the environment variables below in Vercel before production deployment.
5. Deploy.

### Contact form delivery

The contact form submits to [route.ts](C:\Users\Daniel\xemory-systems-website\src\app\api\contact\route.ts), which sends the inquiry through the Resend REST API.

Required environment variables:

```bash
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=contact@xemorysystems.com
```

Notes:

- `RESEND_API_KEY` should be created in your Resend account.
- `CONTACT_FROM_EMAIL` should be a verified sender/domain in Resend, for example `Xemory Systems <website@xemorysystems.com>`.
- `CONTACT_TO_EMAIL` is the destination inbox for inquiries. If omitted, the site falls back to `contact@xemorysystems.com`.
- For local development, place the same variables in a `.env.local` file.
- When the repository is connected to GitHub and deployed on Vercel, add the same variables in the Vercel project settings so the serverless route can send successfully.
