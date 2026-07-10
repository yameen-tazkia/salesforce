# Tazkia Intelligence Platform (v1)

The interactive enterprise AI consulting platform for Tazkia Intelligence —
an application, not a marketing site. It demonstrates the consulting
methodology, AI expertise and service offerings through interactive tools:

| Section | Route | What it does |
|---|---|---|
| Home Dashboard | `/` | Executive landing: overview, insights, industry focus, animated KPIs |
| Transformation Framework | `/framework` | Eight-phase interactive journey (Discover → Managed AI Services) |
| AI Readiness Assessment | `/readiness` | 18-question assessment → radar profile, scorecards, summary, roadmap |
| Agentforce ROI Calculator | `/roi-calculator` | Live ROI model: savings, uplift, FTE, payback, charts |
| AI Opportunity Assessment | `/opportunities` | Industry-specific opportunity maps, prioritisation matrix, downloadable summary |
| Industry Solutions | `/industries/[slug]` | Ten industry blueprints: challenges, opportunities, roadmap, outcomes |
| Use Case Library | `/use-cases` | Searchable, filterable database of 24 AI use cases |
| Experience Centre | `/experience-centre` | Playable Agentforce demos with architecture diagrams |
| Slack Workflow Intelligence | `/slack-intelligence` | Step-through intelligent Slack workflows |
| Case Studies | `/case-studies/[slug]` | Challenge → approach → architecture → outcomes → lessons |
| Resource Centre | `/resources` | Articles, guides, frameworks, whitepapers, templates |
| Contact | `/contact` | Book workshop / assessment / pilot (Web3Forms submission) |

## Stack

- **Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS 3**
- All charts are dependency-free SVG components (`components/charts/`) with
  hover tooltips: radar, line (crosshair), horizontal bar, donut.
- Chart palette validated for colour-vision deficiency and contrast
  (`--series-1 … --series-6` in `app/globals.css`).
- Fully static output — every route prerenders (`next build`), so it can be
  hosted on any static/Node host.

## Design system

Defined in `tailwind.config.ts` + `app/globals.css`:

- **Primary** Deep Emerald (`emerald-600 #0c8259`)
- **Secondary** Dark Navy (`navy-950 #0a0f24`)
- **Accent** Teal (`teal-600 #0e94ae`)
- **Highlights** Soft Gold (`gold-600 #b8860b`)
- **Background** White · Typography: Inter

## Structure

```
platform/
  app/                 # routes (App Router)
  components/
    layout/            # header, footer
    ui/                # cards, KPI widgets, progress bars, scorecards, tables, expandables
    charts/            # radar, line, bar, donut (SVG, interactive)
    diagrams/          # data-driven architecture diagrams
  lib/
    nav.ts             # navigation model
    data/              # all content: framework, industries, use cases, readiness,
                       # opportunities, case studies, resources, demos, slack workflows
```

## Develop

```bash
cd platform
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (fully static)
```
