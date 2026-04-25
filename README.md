# Tazkia Intelligence — Website

Marketing site for **Tazkia Intelligence**, a UAE-based Salesforce and AI
consulting firm. Built with vanilla HTML, CSS, and JavaScript — no build step,
no framework, no JS dependencies.

## Project structure

```
.
├── index.html            # Home
├── services.html         # Services
├── about.html            # About Us
├── case-studies.html     # Case Studies
├── contact.html          # Contact
├── assets/
│   ├── css/styles.css    # Global styles + responsive layout
│   ├── js/main.js        # Nav, reveal-on-scroll, contact form
│   └── img/              # Reserved for future image assets
└── README.md
```

All pages share the same navigation and footer markup and are fully responsive
(desktop, tablet, mobile). Visuals use inline SVG so the site stays
lightweight and crisp at any resolution.

## Run locally

The site is static — open `index.html` in a browser, or serve the folder with
any static server. The latter is recommended so relative asset paths and the
contact form work consistently.

### Option 1 — Python (no install required on most systems)

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

### Option 2 — Node (if you have Node installed)

```bash
npx --yes serve -l 8080 .
```

### Option 3 — VS Code

Install the **Live Server** extension and click *Go Live* from the status bar.

## Customization

- **Colors / typography**: tweak the CSS custom properties at the top of
  `assets/css/styles.css` (`--accent`, `--accent-2`, `--bg-0`, …).
- **Brand mark**: the “T” mark is defined inline in the nav (`.brand-mark`)
  and in the favicon (`<link rel="icon">`). Replace with an SVG logo when
  available.
- **Contact form**: client-side validation only. Wire `assets/js/main.js`
  (`#contact-form` submit handler) to your preferred backend or form provider
  (e.g. Formspree, HubSpot, Salesforce Web-to-Lead).

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses
`backdrop-filter`, `IntersectionObserver`, and CSS custom properties.
A `prefers-reduced-motion` rule disables animations for users who request it.
