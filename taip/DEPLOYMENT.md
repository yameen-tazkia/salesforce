# Running & deploying TAIP

TAIP is an **internal** application with login, API routes and middleware,
so it needs a Node server. It **cannot** be published to GitHub Pages the
way the public `platform/` site is.

Pick the path that matches what you actually need right now:

| # | Path | Best when | Effort | Cost |
|---|---|---|---|---|
| 1 | **Run locally** | You want to see it working today | 3 min | Free |
| 2 | **GitHub Codespaces** | You don't want to install anything | 5 min | Free tier |
| 3 | **Render** | The team needs a shared URL | 10 min | Free tier |
| 4 | **Docker** | Data must stay on your own infrastructure | 30 min | Your host |

Paths 1 and 2 need no accounts or configuration beyond what you already
have. Start there if you're unsure.

---

## Path 1 — Run locally

The most reliable option: no hosting account, no build service, nothing to
configure. Needs Node 18.17 or newer (`node -v` to check; install from
<https://nodejs.org> if missing).

```bash
git clone https://github.com/yameen-tazkia/salesforce.git
cd salesforce/taip
npm install
npm run dev
```

Open <http://localhost:3100> and sign in with `amira@tazkia.internal` /
`consult`.

That's it — no session secret needed for local development.

---

## Path 2 — GitHub Codespaces (nothing installed on your machine)

Runs the whole thing in your browser, on GitHub's infrastructure. Useful
if Node won't install locally or you're on a locked-down laptop.

1. Go to <https://github.com/yameen-tazkia/salesforce>.
2. Click **Code** → **Codespaces** tab → **Create codespace on main**.
3. Wait ~2 minutes. Dependencies install automatically (`.devcontainer/`
   handles it).
4. In the terminal at the bottom, run:
   ```bash
   cd taip && npm run dev
   ```
5. A popup offers to open the forwarded port — click it. TAIP opens in a
   browser tab.

To share with a colleague: open the **Ports** panel, right-click port
3100 → *Port Visibility* → *Organization*. Codespaces sleep when idle, so
this suits demos rather than permanent hosting.

---

## Path 3 — Render (shared URL for the team)

Render reads `render.yaml` from the repository root, so most settings are
already filled in — including **auto-generating the session secret**, so
there's no secret for you to create or paste.

1. Sign up at <https://render.com> with your GitHub account.
2. Click **New** → **Blueprint**.
3. Select the **`yameen-tazkia/salesforce`** repository.
4. Render shows a service called **taip** read from `render.yaml`.
   Click **Apply**.
5. Wait ~5 minutes for the first build. You'll get a URL like
   `taip.onrender.com`.

Optional: add `HUNTER_API_KEY` under the service's *Environment* tab to
enable live contact enrichment.

**Two things to know about the free tier:** the service sleeps after 15
minutes idle (first request afterwards takes ~30 seconds to wake), and
free services are publicly reachable by URL. For sustained internal use,
upgrade to a paid instance and put it behind your IdP — or use Path 4.

---

## Path 4 — Docker, on your own infrastructure

Keeps all account intelligence inside your network. The image is a
multi-stage Next.js standalone build running as a non-root user.

### Build and run anywhere

```bash
cd taip
docker build -t taip:latest .

docker run -d --name taip -p 3100:3100 \
  -e TAIP_SESSION_SECRET="$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")" \
  --restart unless-stopped \
  taip:latest
```

### Google Cloud Run

Scales to zero, so you pay only for use, and it injects `PORT`
automatically (the app honours it).

```bash
cd taip
gcloud run deploy taip \
  --source . \
  --region europe-west1 \
  --no-allow-unauthenticated \
  --set-env-vars TAIP_SESSION_SECRET="<your secret>"
```

`--no-allow-unauthenticated` restricts access to your Google Workspace
identities — the right default for an internal tool.

### Azure App Service

```bash
cd taip
az acr build --registry <your-registry> --image taip:latest .
az webapp create --resource-group <rg> --plan <plan> --name taip \
  --deployment-container-image-name <your-registry>.azurecr.io/taip:latest
az webapp config appsettings set --resource-group <rg> --name taip \
  --settings TAIP_SESSION_SECRET="<your secret>"
```

### Behind your own reverse proxy

Two things matter wherever you host it:

- **TLS.** Session cookies are marked `Secure` in production, so the app
  must be served over HTTPS or logins silently fail to persist.
- **Access control.** Restrict to your VPN or IdP. TAIP's own login is a
  second layer, not a perimeter.

---

## Environment variables

| Name | Required | Purpose |
|---|---|---|
| `TAIP_SESSION_SECRET` | Production only | Signs session cookies. Without it, the app falls back to a known development value and sessions could be forged. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `HUNTER_API_KEY` | No | Enables live Hunter.io contact enrichment |
| `PORT` | No | Injected by most hosts; defaults to 3100 |

---

## Before this holds real data

Both are deliberate placeholders, also flagged in `README.md`:

1. **Replace the demo dataset.** The 22 accounts in
   `data/seed/accounts.ts` are fictional. Anyone reading the dashboard
   without that context will assume Al Marjan Properties and Bank
   AlNukhba are real prospects.
2. **Replace demo credentials with SSO.** `data/seed/users.ts` ships
   hardcoded demo passwords. Swap `modules/auth/service.ts` for your
   identity provider (OIDC); the session transport in
   `modules/auth/session.ts` can stay as-is.

Until both are done, treat any deployment as a demo environment.

---

## Troubleshooting

**Vercel: "No Next.js version detected"**
Root Directory isn't set to `taip`. Edit it in project settings. (Vercel
also needs `vercel.json`, which is in `taip/`.)

**Host reports the app failed to start, or health checks time out**
The platform is injecting a `PORT` the app must bind to. `npm run start`
honours `PORT` and falls back to 3100 — make sure your start command is
`npm run start` rather than a hardcoded `next start -p 3100`.

**Logins don't persist; you're bounced back to `/login`**
The app isn't served over HTTPS in production, so the `Secure` session
cookie is dropped. Terminate TLS in front of it.

**Enrichment shows Hunter.io as "available" not "connected"**
`HUNTER_API_KEY` isn't set in that environment. Expected until you add it.

**Did this break the GitHub Pages site?**
No. `deploy-platform.yml` triggers only on `platform/**` and is untouched.
