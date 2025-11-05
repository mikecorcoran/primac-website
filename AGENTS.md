# AGENTS.md

> **Purpose**
> Orchestrate Codex to generate a production-ready, extensible marketing site for **Primac Reliability Consultants** using **Next.js** + **Tailwind CSS**, auto-deploying to **Vercel**, with assets in `/public/images`, and SVG icons stored as files. Content, tone, structure, and UX must follow the attached **Website Content.pdf** (“Content Blueprint”). Treat that PDF as the content source-of-truth. 

---

## 1) Project Charter

* **Audience**: conservative heavy-industry stakeholders (maintenance, reliability, operations).
* **Outcome**: a fast, accessible, trustworthy website that “feels engineered”: calm visuals, disciplined layout, subtle motion, high legibility, clear CTAs.
* **Voice & Tone**: *calm, authoritative, factual, modest; Canadian English spelling.*
* **Design Ethos**: precision over spectacle; strong hierarchy; generous whitespace; small-radius corners (≤5px); subtle micro-interactions.
* **Guardrail**: **Do not overbuild.** Implement exactly what’s asked **unless the user explicitly requests additional scope**. It’s acceptable to propose options in comments/TODOs.

---

## 2) Tech Stack & Platform

* **Framework**: Next.js (latest stable, App Router).
* **Styling**: Tailwind CSS (latest stable).
* **Icons**: SVG **as files** in `/public/icons/*.svg` and imported as Next `<Image>` or inline via `next/dynamic` + SVGR if needed, **but keep source files on disk**.
* **Animation**: Prefer CSS transitions and `@tailwindcss/typography` utilities; for scroll/reveal/parallax, you may use lightweight libs (e.g., `framer-motion`, `lenis`, `gsap` + `ScrollTrigger`) *only if needed* for smooth, low-amplitude effects.
* **Images**: User will populate `/public/images/` with random images; use Next `<Image>` for optimization.
* **Lint/Format**: ESLint (Next preset), Prettier.
* **CI/CD**: GitHub repo → Vercel auto-deploy (Preview per PR, Production on main).
* **Accessibility**: WCAG 2.1 AA targets; keyboard focus styles; semantic landmarks; reduced-motion friendly.

> **Compatibility rule**: choose stable, broadly compatible versions. Avoid experimental flags unless explicitly requested.

---

## 3) Repository Layout

```
/public
  /images/                 # user-provided photos (random/industrial)
  /icons/                  # SVG icon files (e.g., gear.svg, hardhat.svg)
  /logos/                  # certification/affiliation logos (greyscale if possible)
/src
  /app
    /(site)                # route groups for clean structure
      /components          # shared UI (Button, Container, SectionHeader, Cards, etc.)
      /content             # structured content (JSON/MDX) mapped to pages
      /home                # home (page.tsx + sections/)
      /services
      /products
      /industries
      /case-studies
      /about
      /hse
      /careers
      /contact
    /styles
      globals.css
      tailwind.css
  /lib
    content.ts             # content loaders/mappers
    meta.ts                # SEO helpers
    motion.ts              # animation primitives/helpers (gate all effects)
/scripts
  generate-icons.mjs       # optional: validate/make icon imports
  check-contrast.mjs       # optional: contrast audit
```

* **Routing**: one route per top-level sitemap item; sub-sections as anchored sections on the same page unless depth warrants a child route.
* **Content**: store page copy and structural metadata as JSON/MDX under `src/app/(site)/content`. Prefer **structured JSON** for headings, blurbs, CTA labels, and lists to keep code dumb and content flexible.

---

## 4) Visual System

**Palette (from blueprint)**

* Primary: *Steel Blue* `#1E3D58`
* Secondary text/base: *Graphite Gray* `#2E2E2E` with near-black body copy on white
* Accent A (CTA): *Safety Orange* `#D58512` (use sparingly)
* Optional Accent B: choose **either** deep olive `#245C48` **or** teal `#277083` for hovers/secondary actions — **do not use both**
* Backgrounds: White `#FFFFFF` and Light Gray `#F4F4F4`

**Type**

* Sans-serif family (system-UI or Inter/Source Sans Pro).
* Headings: clear hierarchy, allow small-caps for H1/H2 if desired; body 16–18px with ~1.5 line height.
* Capitalization: Title Case for nav and page titles; Sentence case for long headings.

**Components (base inventory)**

* `Container` (max-width + responsive paddings)
* `SectionHeader` (eyebrow/overline optional, title, subtext)
* `Button` (primary/secondary/tertiary; ≤5px radius; 200ms ease-in-out)
* `Card` (service, case study, team; tiny shadow or 1px border; ≤5px radius)
* `Icon` (file-based SVG)
* `Stat`/`KPI` counter (progressively enhanced)
* `LogoStrip` (certifications/affiliations row, greyscale)
* `Testimonial` (quote + attribution/role/industry)
* `Form` primitives (label/input/select/textarea with clear focus states)

---

## 5) Motion & Interaction

* **Philosophy**: “smooth, low amplitude, engineer-minded.”
* **Allowed**: fade/slide-up on reveal (once), subtle parallax in hero, 1–5px hover lift on cards, gentle color/outline transitions on buttons/links (~200–300ms, ease-in-out).
* **Avoid**: overshoot/bounce, spin, large drifts, autoplay video noise, scroll-jacking.
* **Respect**: `prefers-reduced-motion`.
* **Implementation**: provide a tiny wrapper (`/src/lib/motion.ts`) so all effects are centralized and easy to disable/tune.

---

## 6) Information Architecture (Pages & Sections)

Map the Content Blueprint into pages with headings, copy, and CTAs as provided.

### Home `/`

* **Hero**: H1 “Operational Resilience, Delivered Reliably.”; H2 subtitle; primary CTA “Request a Reliability Assessment”.
* **Narrative arc**: 5 steps (uncertainty → degradation → trusted guide → **you** as hero → operational resilience).
* **Why Primac**: differentiators grid (Experienced Team, Presence & Steadiness, Right Tech Applied Wisely, PdM pioneers, Proven Financial Impact, Safety Culture).
* **Services teaser** → deep links.
* **Industries teaser** with icon list.
* **Testimonials/Case proof**.
* **Certifications strip**.
* **Final CTA** (24/7 availability, Western Canada note).

### Services `/services`

* Intro + “Here’s how Primac can help” bullet list.
* Detailed sections: Vibration Analysis; Condition Monitoring; Advanced Diagnostics (sub-items: Motion Amplification, Modal & ODS, Ultrasound, Multi-Channel/Transient, Field Balancing & Alignment, Torsional Analysis); Troubleshooting; Testing & Specialized (Natural Frequency Testing; FAT/SAT).
* “Why Rely on Primac?” fact list with quantitative credibility.

### Products `/products`

* Outline supported hardware/software, distributor/rep roles, and philosophy “right technology, applied wisely.” Link out where appropriate.

### Industries `/industries`

* Tiles for Oil & Gas, Mining, Power & Utilities, Forestry & Pulp/Paper, Marine Terminals, Manufacturing, etc., each with a short paragraph speaking to sector realities.

### Case Studies `/case-studies`

* Card grid of summaries; support future single-case routes (`/case-studies/[slug]`).
* Include at least 2 placeholders wired for future MDX content.

### About `/about`

* Company overview, Vision/Mission/Tenets, team ethos (“We are Primac”), years in business, Western Canada presence, combined experience, “guide not hero” stance.

### HSE `/hse`

* Safety culture (e.g., zero lost-time injuries), procedures, certifications/affiliations (COR, ISNetworld, Avetta, CMVA, SMRP, ISO placeholder), and trust signals.

### Careers `/careers`

* Culture, training/mentorship, benefits highlights; placeholder job list pulled from JSON; mailto or form CTA.

### Contact `/contact`

* Regions/offices; contact form (name, company, email, phone, message, topic).
* Microcopy: “We’ll get back to you within one business day.”
* Show phone and general inbox; map optional.

> **Copy Source**: Use wording and structure from the Content Blueprint. If an item is unspecified, write concise, factual placeholder copy in the established tone and mark it with `TODO(content)` for later authoring. 

---

## 7) Content System

* **Location**: `src/app/(site)/content/**/*`
* **Format**:

  * Page JSON (headings, subheads, lists, CTAs, badge lists).
  * MDX allowed for long-form sections (case studies) with a slim component whitelist.
* **Images**: reference with relative paths from `/public/images`; add `alt` text reflecting industrial safety context (PPE, equipment).
* **Certifications**: place logo files in `/public/logos/` (greyscale if possible). Use alt/title attributes with the full organization names.

**Example** `home.json` (excerpt):

```json
{
  "hero": {
    "title": "Operational Resilience, Delivered Reliably.",
    "subtitle": "Field-Proven Maintenance & Condition Monitoring for Heavy Industry.",
    "primaryCta": {"label": "Request a Reliability Assessment", "href": "/contact"}
  },
  "narrative": [
    {"title": "Operations Face Uncertainty", "body": "…"},
    {"title": "Assets Degrade Under Pressure", "body": "…"}
  ],
  "differentiators": [
    {"icon": "experienced-team.svg", "title": "Experienced, Field-Proven Team", "body": "…"},
    {"icon": "steadiness.svg", "title": "Presence & Steadiness Under Pressure", "body": "…"}
  ]
}
```

---

## 8) Navigation & Layout

* **Top Nav** (desktop sticky; mobile hamburger): Home, Services, Products, Industries, Case Studies, About Us, HSE, Careers, Contact.
* **Footer**: repeat key links; address/phone; certifications strip; privacy/terms; optional LinkedIn.
* **Breadcrumbs**: add if deeper than 1 level (e.g., individual case study).

---

## 9) Accessibility & Performance

* Minimum contrast 4.5:1 for text; visible focus rings (use accent olive/teal or orange).
* Labels on all form fields, descriptive button text; landmark regions (`header`, `main`, `footer`, `nav`).
* Respect `prefers-reduced-motion`.
* Optimize images via Next `<Image>`; consider `blurDataURL` placeholders.
* Lazy-load below-the-fold media; avoid heavy JS on first paint.

---

## 10) SEO & Metadata

* Semantic headings and descriptive titles (`<title>Section — Primac Reliability</title>`).
* Meta description per page (from content files).
* Open Graph/Twitter cards; default social image in `/public/images/social-default.jpg`.
* JSON-LD where applicable (Organization, BreadcrumbList, JobPosting when live).

---

## 11) Forms & Handling

* Use Next.js route handlers for `/contact` POST.
* Include server-side validation (zod/yup); honeypot or time-based filter; no CAPTCHA unless requested.
* Success message: “Thank you — we’ll be in touch within one business day.”
* Wire a server action that can be swapped later for email/API.

---

## 12) Icons & Media

* Keep **all** SVGs as files in `/public/icons/` (e.g., `vibration.svg`, `hardhat.svg`, `gear.svg`, `waveform.svg`).
* Import pattern: either file path into `<Image>` or `next/dynamic` + SVGR (still referencing the file).
* Keep icon style consistent (outline or solid) across the site.

---

## 13) Extensibility Rules

* Favor **data-driven** components: pages render from JSON/MDX without code edits.
* Add new service/industry/case by creating content entries and the page should pick them up automatically.
* Keep component APIs minimal and stable; prefer composition over props explosion.
* Place **all** motion constants in `lib/motion.ts` for global tuning.
* Gate optional libraries behind lazy imports.

---

## 14) Vercel & GitHub

* Include `vercel.json` only if defaults need changes.
* Environment: none required for static pages; add secrets only when forms/email integrations are introduced.
* Git branching: PRs → Vercel preview; merge to `main` → Production.
* Protect `main`; run lint/typecheck on PR.

---

## 15) Scripts & Quality Gates

* `npm run dev` — Next dev
* `npm run build` — Next build
* `npm run start` — serve
* `npm run lint` — eslint
* `npm run typecheck` — tsc
* Optional: `npm run check:contrast` to spot low-contrast tokens in compiled CSS.

---

## 16) Implementation Plan (MVP → Polish)

**MVP (Day 1)**

1. Scaffold Next.js + Tailwind; global layout, header/nav, footer.
2. Implement Home with narrative and differentiators; wire content JSON.
3. Create pages for Services, Products, Industries, Case Studies, About, HSE, Careers, Contact with placeholder content mapped from the Blueprint.
4. Basic animations (fade/slide-up on reveal) via CSS or a tiny utility.
5. Certifications strip with file-based logos.
6. Deploy to Vercel from GitHub.

**Polish (Day 2+)**
7. Add hero parallax (low amplitude), card hover lifts, KPI counters (respect reduced-motion).
8. Swap placeholders with user images in `/public/images/`.
9. Add two sample MDX case studies; enable breadcrumb for single case pages.
10. Accessibility pass; performance audit; SEO meta fine-tuning.

---

## 17) Guardrails & Working Agreements

* **Clarity beats cleverness**. Avoid marketing fluff.
* **No mega-menus** unless explicitly requested.
* **No gratuitous motion**; never degrade readability.
* **Keep copy Canadian English**; keep claims modest and, where possible, backed by data/placeholders indicated in content for later substitution.
* **Unless requested otherwise by the user**, do not:

  * introduce additional pages, sections, or complex CMS;
  * change the palette/typography;
  * add heavyweight animation libraries;
  * inline SVGs (store as files).
* **When ambiguity exists**, prefer TODO comments and content placeholders over assumptions.

---

## 18) Acceptance Checklist

* [ ] Uses Next.js App Router + Tailwind.
* [ ] All top-level pages present, navigable, responsive.
* [ ] Content matches the Blueprint’s headings/sections/CTAs and tone. 
* [ ] SVG icons stored as files in `/public/icons`.
* [ ] Animations are subtle, performant, and globally tunable.
* [ ] Accessible focus states, labels, alt text, and contrast checks pass.
* [ ] GitHub → Vercel pipeline working (Preview + Production).
* [ ] No scope creep beyond spec unless user asked for it (document any proposals as TODOs).

⸻

19) Freshness & Version Gate (Nov 2025)

Intent: Ensure the stack is current, compatible, and reproducible. Codex must verify versions at run-time and adapt the scaffold accordingly.

19.1 What’s “current” right now
	•	Next.js 16 (App Router) — stable; ships stable Turbopack, React Compiler support, caching and routing improvements. Use it unless an older project constraint exists.  ￼
	•	Tailwind CSS v4.x — config-light model (no tailwind.config.* required), @import "tailwindcss" in CSS, @theme tokens; major perf + DX shifts from v3. Use 4.1.x or newer.  ￼
	•	React 19 — stable since Dec 2024; many libs are now compatible, but double-check motion libs.  ￼
	•	Node.js 24 “Krypton” (Active LTS) — preferred engine for CI/Prod. Avoid EoL Node lines.  ￼
	•	npm 11.x — latest stable client; note recent auth/security tightening.  ￼

19.2 Quick compatibility matrix (recommended)

Layer	Version (min)	Notes
Node	24.x (LTS)	Pin in .nvmrc/engines; CI uses Node 24.
npm	11.x	Fine on Node 24; quiet logs for CI.  ￼
React	19.x	Next 16 template uses React 19.  ￼
Next.js	16.x	App Router; Turbopack default.  ￼
Tailwind CSS	4.1.x+	New @theme tokens; no config required.  ￼

If a hosted runner can’t fetch Node 24, fall back to the most recent LTS available, then re-run “Version Audit” (below) and record the deviation in README.

19.3 Version Audit (must run before scaffold)

Codex, execute:

# Node & npm
node -v && npm -v

# Latest stable tags (do not install yet):
npm view next version
npm view tailwindcss dist-tags --json
npm view react version

# Record results in README under "Framework & Styling Versions (verified DATE_UTC)"

Rules:
	•	Use Next 16.x, Tailwind 4.1.x+, React 19.x, Node 24.x LTS if available.
	•	If any constraint blocks these, pin the highest compatible set and explain in a README “Compat Notes” section.

19.4 Tailwind 4 changes Codex must respect
	•	Prefer CSS-first setup: @import "tailwindcss" in a global CSS (already present), and define design tokens with @theme. No default tailwind.config.* is required.  ￼
	•	Many plugin/config patterns from v3 have changed; only add plugins when necessary. Tailwind 4.1 adds more utilities and DX polish.  ￼

19.5 Next 16 changes that affect our repo
	•	Turbopack is stable & default; keep it. Faster dev/builds.
	•	React Compiler support is built-in; no extra steps required to benefit from memoization improvements.
	•	Caching & routing enhancements reduce boilerplate for prefetch and layouts. Summarize the chosen defaults in README.  ￼

19.6 Motion libraries guidance (React 19 era)
	•	Prefer native IntersectionObserver + CSS for reveal/hover; we already ship a tiny useReveal() utility.
	•	If a third-party is truly needed:
	•	Motion (motion.dev) is actively maintained and SSR-friendly; verify its React 19 notes before adding.  ￼
	•	Framer Motion: older reports flagged React 19 incompatibilities, since resolved in newer releases — but pin latest and verify locally (smoke test transitions) before committing. If install scripts fail, fall back to our CSS/IO approach.  ￼
	•	For smooth scrolling/parallax, Lenis is popular; test with our reduced-motion gate. GSAP ScrollTrigger remains battle-tested for scroll timelines; keep it optional.  ￼

19.7 npm supply-chain hygiene (2025 updates)
	•	npm tightened publishing/auth this year; expect more 2FA/trusted-publishing flows in the ecosystem.  ￼
	•	Supply-chain incidents continue (malicious/typosquat packages, compromised maintainers). Keep dependencies minimal; audit installs.  ￼

Install policy:
	•	Install with --no-fund --no-audit --progress=false in CI to reduce noise (audit is noisy, not a security control).
	•	Prefer exact versions for new libs (no ^), then upgrade intentionally.

19.8 Pin & document (automated)

After scaffold, Codex must:
	1.	Write versions into README:

- Node: <v24.x detected> (LTS)
- npm:  <v11.x detected>
- Next: <npm view next version>
- React: <npm view react version>
- Tailwind: <npm view tailwindcss version or dist-tag latest>
- Bundler: Turbopack (Next 16 default)

	2.	Create .nvmrc with the detected Node LTS (e.g., v24.11.0).  ￼
	3.	Add engines to package.json:

"engines": { "node": ">=24 <25", "npm": ">=11" }

	4.	Record deviations (if any) in README “Compat Notes”.

19.9 Minimal commands Codex should prefer

# scaffold (new dir) using Next 16 template with Tailwind 4:
npx create-next-app@latest . --ts --app --tailwind --eslint --src-dir --import-alias "@/*"

# dev
npm run dev

# build
npm run build && npm run start

If the directory isn’t empty, scaffold in a temp folder and rsync in (excluding existing README/AGENTS.md), then remove the temp folder.

⸻

Outcome: Codex won’t rely on its older training. It will detect current versions, choose the compatible set (Next 16 / React 19 / Tailwind 4.1 / Node 24 LTS / npm 11), pin them, and document what changed and why—while keeping optional motion libs behind a gate and defaulting to our CSS/IntersectionObserver approach for reliability.

---

**Notes to Codex**

* Where copy is still missing, create concise, factual placeholders that match tone and mark them `TODO(content)` so writers can replace them quickly.
* Keep components small, pure, and documented with JSDoc. Favor readability and maintainability; this site will grow into deeper content (case studies/team pages) later.
* **Mobile nav quick fix**: iOS Safari ignores some arbitrary background values. Use the solid colour class `bg-[#081522]` (with optional blur-enabled alpha override) for the mobile navigation overlay in `src/app/(site)/components/SiteHeader.tsx` to guarantee an opaque backdrop.
* When iterating on the header/mobile nav, you can skip lint/test runs unless the user explicitly requests them; prioritise the visual fix first.
