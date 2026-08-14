# Landscape Site

Static marketing site for a landscape design/build/maintenance company, per the
"Landscape Company Website — Full Build Spec". Astro + Tailwind CSS v4, with
Framer Motion + GSAP ScrollTrigger for animation, a Decap CMS admin panel for
non-technical content edits, and Web3Forms for the quote form — no backend
server.

## Local development

```
pnpm --filter @workspace/landscape-site run dev
```

The `/admin` CMS panel only works against a deployed site with Netlify
Identity configured (see below) — locally it will show a login screen that
can't complete.

## Content model (admin-editable)

| What | File(s) | Notes |
|---|---|---|
| Theme (colors, fonts, hero image, contact info) | `src/data/theme.json` | Single "Theme Settings" file collection in Decap. |
| Projects (gallery) | `src/content/projects/*.json` | One JSON file per project; Astro content collection `projects`. |
| Client testimonials | `src/content/testimonials/*.json` | One JSON file per testimonial; Astro content collection `testimonials`. |

Service descriptions, the process steps, certifications and other page copy
are hardcoded in the relevant `.astro` page (`src/pages/services.astro`,
`src/data/services.ts`, `src/data/site-content.ts`) — per the spec, those
aren't part of the admin's editable surface. Change them by editing those
files directly.

## Deploying (Netlify)

This package lives inside a pnpm monorepo, so when creating the Netlify site:

1. **Base directory**: `artifacts/landscape-site`
2. **Build command**: `pnpm install --frozen-lockfile=false && astro build`
   (already set in `netlify.toml`)
3. **Publish directory**: `dist`
4. Set the environment variable `PUBLIC_WEB3FORMS_ACCESS_KEY` (see below).

## Enabling the /admin panel (Decap CMS + Netlify Identity)

The CMS auth is real GitHub-repo-backed auth via Netlify's Git Gateway — no
password lives in the code.

1. In the Netlify site dashboard: **Identity → Enable Identity**.
2. **Identity → Registration**: set to "Invite only" (don't allow open
   signups to your CMS).
3. **Identity → Services → Git Gateway**: click **Enable Git Gateway**. This
   lets Netlify Identity users commit to the repo on your behalf without
   needing their own GitHub OAuth app or personal access token.
4. **Identity → Invite users**: invite yourself (and anyone else who should
   have admin access) by email.
5. Visit `https://<your-site>/admin/`, accept the invite, log in, and you're
   in the CMS. "Publish" on the app = a Git commit to `main`, which triggers
   a Netlify rebuild.

Access to `/admin` is controlled by who you invite via Netlify Identity —
that's the actual security boundary.

## Get Quote form (Web3Forms)

1. Create a free account at web3forms.com and grab an access key for this
   domain.
2. Set it as the `PUBLIC_WEB3FORMS_ACCESS_KEY` environment variable in
   Netlify (Site configuration → Environment variables), then redeploy.

Locally, copy `.env.example` to `.env` and fill in the same key to test
submissions from `pnpm run dev`.

## Replacing placeholder content

All project/hero images currently ship as generated SVG placeholders in
`public/images/`. Replace them via the `/admin` panel (Projects collection,
Theme Settings) once real photography is available — no code changes needed.
