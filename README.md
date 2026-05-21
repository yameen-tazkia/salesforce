# Tazkia Intelligence - Website

Marketing site for **Tazkia Intelligence**, a Salesforce and AI consultancy
designing Agentforce-powered systems where intelligent agents and people work
side by side. Built with vanilla HTML, CSS, and JavaScript - no build step,
no framework, no JS dependencies.

## Project structure

```
.
├── index.html            # Home
├── services.html         # Services
├── about.html            # About Us
├── contact.html          # Contact
├── assets/
│   ├── css/styles.css    # Global styles + responsive layout
│   ├── js/main.js        # Nav, reveal-on-scroll, contact form
│   └── img/logo.png      # Brand logo (used in nav + footer)
└── README.md
```

All pages share the same navigation and footer markup and are fully responsive
(desktop, tablet, mobile). Visuals use inline SVG and CSS so the site stays
lightweight and crisp at any resolution.

## Run locally

The site is static. Open `index.html` in a browser, or serve the folder with
any static server. The latter is recommended so relative asset paths and the
contact form work consistently.

### Option 1 - Python (no install required on most systems)

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

### Option 2 - Node (if you have Node installed)

```bash
npx --yes serve -l 8080 .
```

### Option 3 - VS Code

Install the **Live Server** extension and click *Go Live* from the status bar.

## Customisation

- **Colours / typography**: tweak the CSS custom properties at the top of
  `assets/css/styles.css` (`--accent`, `--accent-2`, `--accent-3`, `--bg-0`).
  The current palette is dark navy with electric blue, teal, and subtle gold
  accents that pick up the brand logo.
- **Logo**: drop your logo into `assets/img/logo.png` (PNG with transparent
  background works best on the dark navy theme; ~600px wide is plenty). The
  nav and footer reference it as `assets/img/logo.png`. If the file is
  missing, a fallback gradient "T" mark and wordmark is shown automatically.
- **Contact form**: client-side validation only. Wire `assets/js/main.js`
  (`#contact-form` submit handler) to your preferred backend or form provider
  (e.g. Formspree, HubSpot, Salesforce Web-to-Lead).

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses
`backdrop-filter`, `IntersectionObserver`, CSS custom properties, and
`offset-path` for the orchestration animation. A `prefers-reduced-motion` rule
disables animations for users who request it.
