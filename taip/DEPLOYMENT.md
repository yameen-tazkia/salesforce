# Deploying TAIP

TAIP is an **internal** application. It has login, API routes and
middleware, so it needs a Node server — it **cannot** be published to
GitHub Pages the way the public `platform/` site is.

Two supported paths:

| Path | Best when | Effort |
|---|---|---|
| **A · Vercel** | You want it live for the team today | ~10 min, no ops |
| **B · Docker** | Account intelligence must stay on your own infrastructure | ~30 min, needs a host |

Whichever you choose, do **Step 0** first.

---

## Step 0 — Generate the session secret (required for both)

TAIP signs login sessions with `TAIP_SESSION_SECRET`. Without it, the app
falls back to a well-known development value and sessions could be forged.

Generate one:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output somewhere safe (a password manager). **Never commit it** —
you'll paste it into a hosting dashboard or a secret store below.

---

## Path A — Vercel

### A1. Import the repository

1. Go to <https://vercel.com/new> and sign in with GitHub.
2. Find **`yameen-tazkia/salesforce`** and click **Import**.
   (If it isn't listed, click *Adjust GitHub App Permissions* and grant
   access to the repo.)

### A2. Point Vercel at the `taip` folder — this is the important one

On the configuration screen:

- **Root Directory** → click *Edit* → select **`taip`**.
  Vercel deploys the whole repo root by default, which would build the
  wrong thing. This one setting is the difference between it working and
  a confusing failure.
- **Framework Preset** → should auto-detect as *Next.js*. Leave it.
- Build and output settings → leave as-is (`vercel.json` handles them).

### A3. Add environment variables

Still on the configuration screen, expand **Environment Variables**:

| Name | Value | Required |
|---|---|---|
| `TAIP_SESSION_SECRET` | the string from Step 0 | **Yes** |
| `HUNTER_API_KEY` | your Hunter.io API key | No — enables live contact enrichment |

Apply them to **Production**, **Preview** and **Development**.

### A4. Deploy

Click **Deploy** and wait ~2 minutes. You'll get a URL like
`salesforce-taip.vercel.app`.

### A5. Lock it down — do not skip this

The URL is public by default. TAIP is internal, so restrict it:

- **Vercel Pro/Enterprise:** Project → *Settings* → *Deployment Protection*
  → enable **Vercel Authentication** (only your Vercel team members can
  load it), or set a **Password**.
- **Hobby plan:** deployment protection is limited. Either upgrade, or use
  Path B, or treat the deployment as a short-lived demo and delete it after.

The app already sends `X-Robots-Tag: noindex, nofollow` so search engines
won't index it, but that is not access control.

### A6. Future deploys

Vercel now rebuilds automatically on every push to `main` that touches
`taip/`. Pull requests get their own preview URL.

---

## Path B — Docker on your own infrastructure

Keeps all account intelligence inside your network.

### B1. Build the image

```bash
cd taip
docker build -t taip:latest .
```

### B2. Run it

```bash
docker run -d \
  --name taip \
  -p 3100:3100 \
  -e TAIP_SESSION_SECRET="<the string from Step 0>" \
  -e HUNTER_API_KEY="<optional>" \
  --restart unless-stopped \
  taip:latest
```

Open <http://localhost:3100> (or the host's address) to confirm it's up.

### B3. Put it behind HTTPS and your SSO

Run it behind your reverse proxy (nginx, Traefik, Cloudflare Access,
an internal load balancer). Two things matter:

- **TLS.** Session cookies are marked `Secure` in production, so the app
  must be served over HTTPS or logins will not persist.
- **Access control.** Restrict to your VPN/IdP. TAIP's own login is a
  second layer, not a perimeter.

---

## After deploying — two things to fix before real use

Both are deliberate placeholders, flagged in `README.md`:

1. **Replace the demo dataset.** The 22 accounts shipped in
   `data/seed/accounts.ts` are fictional. Anyone reading the dashboard
   without that context will think Al Marjan Properties and Bank AlNukhba
   are real prospects.
2. **Replace demo credentials with SSO.** The five accounts in
   `data/seed/users.ts` use hardcoded demo passwords. Swap
   `modules/auth/service.ts` for your identity provider (OIDC) before the
   platform holds anything sensitive. The session transport in
   `modules/auth/session.ts` can stay as-is.

Until both are done, treat any deployment as a demo environment.

---

## Troubleshooting

**Build fails on Vercel with "No Next.js version detected"**
Root Directory isn't set to `taip` (Step A2).

**Logins don't persist / immediate redirect back to `/login`**
The app isn't being served over HTTPS in production, so the `Secure`
session cookie is dropped. Terminate TLS in front of it.

**Enrichment page shows Hunter.io as "available" rather than "connected"**
`HUNTER_API_KEY` isn't set in that environment. Expected until you add it.

**GitHub Pages deployment broke**
It didn't — `deploy-platform.yml` only triggers on `platform/**` and is
untouched by TAIP.
