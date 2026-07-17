# TAIP — Tazkia Account Intelligence Platform

Internal account-intelligence platform for Tazkia Intelligence. TAIP helps
consultants identify, research and prioritise organisations across the GCC
(UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait — with Malaysia and
Indonesia tracked as future markets) that use Salesforce today or are strong
candidates for Salesforce + Agentforce adoption — and prepare insight-led,
personalised outreach.

**TAIP is not a CRM.** It is an intelligence layer: evidence in, scored
priorities and engagement strategy out.

> ⚠️ The bundled dataset is **fictional demonstration data**. Every company,
> person and evidence item is invented to exercise the data model and the
> scoring engine.

## Quick start

```bash
cd taip
npm install
npm run dev        # http://localhost:3100
```

Demo sign-ins (`email` / `password` / role):

| Email | Password | Role |
|---|---|---|
| `tariq@tazkia.internal` | `admin` | Administrator |
| `amira@tazkia.internal` | `consult` | Consultant |
| `omar@tazkia.internal` | `consult` | Consultant |
| `layla@tazkia.internal` | `analyst` | Analyst |
| `guest@tazkia.internal` | `viewer` | Viewer (read-only) |

`npm run build && npm run start` for a production server, `npm run typecheck`
for strict TS validation.

## What's inside

| Area | Route | Highlights |
|---|---|---|
| Executive dashboard | `/` | KPI tiles, top opportunities, Salesforce-confidence donut, pipeline / industry / country breakdowns, recently researched, overdue follow-ups |
| Account search | `/accounts` | Filter by country, industry, revenue, employees, Salesforce confidence, Agentforce opportunity, Slack evidence, AI readiness, priority, stage, tags + free text; sortable |
| Company profile | `/accounts/[id]` | Tabbed intelligence record: Overview · Salesforce Intelligence · Product Detection · AI Readiness · Stakeholders · Outreach Briefing · Workspace (notes, tags, pipeline workflow) |
| Executive report | `/accounts/[id]/report` | Print-optimised report (Export PDF = browser print): overview, Salesforce blueprint, technology assessment, stakeholder map, AI opportunity, engagement strategy |
| My workspace | `/workspace` | Saved accounts + per-user search history |
| Enrichment | `/enrichment` | Provider registry (Hunter.io live adapter, LinkedIn Sales Navigator import, ZoomInfo/Apollo/Clay stubs, CSV) + domain search |
| Admin | `/admin` | Users & roles, scoring weights and band thresholds (admin only) |
| Login | `/login` | Internal cookie-session auth (HMAC-signed) |

## Architecture

Next.js 14 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS 3.
No chart libraries — dependency-free SVG charts with hover layers, using the
CVD-validated Tazkia series palette.

```
taip/
├── app/                    # Routes only — thin over modules
│   ├── (app)/              # Authenticated shell (sidebar + topbar)
│   ├── login/
│   └── api/v1/             # REST API (the same services the pages use)
├── components/
│   ├── charts/             # BarChart, DonutChart, RadarChart (SVG)
│   ├── layout/             # Sidebar, Topbar
│   └── ui/                 # Cards, badges, meters, score rings, stat tiles
├── modules/                # Domain logic — framework-free, unit-testable
│   ├── core/               # Taxonomy: countries, industries, products, enums
│   ├── accounts/           # Types, repository, service (filters, dashboard)
│   ├── scoring/            # Weights (data) + engine (pure functions)
│   ├── outreach/           # Industry playbooks + briefing generator
│   ├── enrichment/         # Provider adapters (authorised APIs/imports only)
│   ├── workspace/          # Saved accounts, search history
│   └── auth/               # RBAC, HMAC sessions (Web Crypto: edge + node)
├── data/seed/              # Fictional demo dataset + demo users
├── lib/                    # Store, API helpers, utils
└── middleware.ts           # Session guard for every non-public route
```

**API-first.** Everything the UI shows is available at `/api/v1/*`:

```
POST   /api/v1/auth/login | logout        GET /api/v1/auth/me
GET    /api/v1/accounts?country=&industry=&confidence=&minAiOpportunity=…
GET|PATCH /api/v1/accounts/:id            GET /api/v1/accounts/:id/score
GET    /api/v1/accounts/:id/briefing      POST /api/v1/accounts/:id/notes
POST|DELETE /api/v1/accounts/:id/tags
GET    /api/v1/dashboard                  GET /api/v1/meta
GET    /api/v1/enrichment/providers       POST /api/v1/enrichment/domain-search
GET|POST|DELETE /api/v1/workspace/saved   GET /api/v1/workspace/history
```

Responses are `{ data }` / `{ error: { status, message } }`. Auth is an
HttpOnly session cookie; role permissions are enforced per endpoint.

## The scoring engine (`modules/scoring`)

Deterministic and explainable — every number can be traced to evidence:

- **Salesforce Confidence (0–100 → Confirmed / Highly likely / Possible /
  Unknown).** Each indicator type (careers listings, admin/dev/consultant
  roles, Trailblazer refs, case studies, partner announcements, AppExchange,
  implementation partners, product references, CRM-migration news, public
  documentation, tech profiling) has a weight; signal strength multiplies it
  and repeats decay, so ten job adverts never outweigh one case study.
  **Confirmed additionally requires a conclusive strong signal.**
- **Product detection** for Sales/Service/Experience/Marketing/Data Cloud,
  Slack, Agentforce, Einstein, CPQ, Field Service, Commerce Cloud, Tableau,
  MuleSoft — per-product evidence level from tagged signals.
- **AI Opportunity (0–100).** Weighted blend of readiness estimates (CRM,
  data, service, sales, AI, Slack, multilingual, digital transformation)
  plus demand drivers (AI initiatives, executive sponsorship, DX programme,
  service-operation scale, growth).
- **Overall Account Score** = 30% Salesforce confidence + 35% AI opportunity
  + 20% firmographic fit (12 named criteria) + 15% engagement/recency →
  **Priority (P1 Strategic → P4 Nurture)** and a rule-based **recommended
  next action**.

Weights live in `modules/scoring/weights.ts` as data and are surfaced on the
admin page.

## Outreach intelligence

`modules/outreach` combines the account record with per-industry consulting
playbooks (pain points, Agentforce use cases, Slack workflows, pilot ideas)
to generate a pre-outreach briefing: company summary, initiatives, likely
pain points, Agentforce/Slack opportunities, discovery-workshop agenda,
pilot programme with success measures, ranked decision makers, conversation
starters and personalisation ideas. The generator is deterministic today and
contract-shaped so an LLM-backed version can replace it behind the same API.

## Compliance stance

TAIP ingests **only** public evidence, authorised APIs (e.g. Hunter.io with
your key via `HUNTER_API_KEY`) and user-supplied exports (e.g. LinkedIn
Sales Navigator CSVs from a licensed seat). It never bypasses
authentication or scrapes restricted sources, and it records provenance on
every evidence item.

## Production hardening checklist

- Replace demo credential auth with corporate SSO/OIDC; set
  `TAIP_SESSION_SECRET`.
- Swap the in-memory store for Postgres by re-implementing
  `modules/*/repository.ts` (the only files that touch `lib/store.ts`).
- Wire real research pipelines/enrichment keys; the seed dataset is fiction.
- Add rate limiting and audit logging at the API layer.
