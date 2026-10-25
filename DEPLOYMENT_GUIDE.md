# Coolify Deployment Guide

This guide explains how **123 The Next Level** is deployed and hosted using **Coolify**.

---

## 1. How Coolify Builds & Runs the App

The repository includes a `nixpacks.toml` file that Coolify uses automatically:

```toml
providers = ["node"]

[phases.setup]
nixPkgs = ["nodejs_22"]

[phases.install]
cmds = ["npm install"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm start"
```

1. **Setup**: Installs Node.js 22.
2. **Install**: Runs `npm install`.
3. **Build**: Runs `npm run build` (`vite build && node scripts/copy-products.js`), compiling all React frontend pages and assets into `dist/`.
4. **Start**: Runs `npm start` (`node index.js`), starting the Express server which serves the API (`/api/*`), webhooks, health checks (`/health`, `/ping`), and the production React frontend.

---

## 2. Port Configuration in Coolify

In your Coolify application dashboard:
- **Port**: Set **"Ports Exposes"** to `3001` (or if you define `PORT=3000` in Environment Variables, set it to `3000`).
- By default, `index.js` listens on `process.env.PORT || 3001`.

---

## 3. Environment Variables in Coolify

Add the following environment variables in your Coolify Application settings (**Environment Variables** tab):

### Frontend / Client (Vite)
*Note: Vite requires these at build time:*
- `VITE_SUPABASE_URL` = Your Supabase Project URL
- `VITE_SUPABASE_ANON_KEY` = Your Supabase Anon/Public Key
- `VITE_GEMINI_API_KEY` = Your Google Gemini API Key

### Backend / Server (Express & Services)
- `PORT` = `3001`
- `SUPABASE_SERVICE_ROLE_KEY` = Your Supabase Service Role Key
- `STRIPE_SECRET_KEY` = Your Stripe Secret Key
- `STRIPE_WEBHOOK_SECRET` = Your Stripe Webhook Signing Secret

### Email Notifications (SMTP)
- `SMTP_HOST` = e.g., `smtp.hostinger.com` or your SMTP provider
- `SMTP_PORT` = `465` (SSL) or `587` (TLS)
- `SMTP_SECURE` = `true` (for 465) or `false` (for 587)
- `SMTP_USER` = `jack@123thenextlevel.com`
- `SMTP_PASS` = Your SMTP password
- `SMTP_FROM` = `"The Team at 123Next Level" <jack@123thenextlevel.com>`

### Cloudflare R2 / Storage (if applicable)
- `CLOUDFLARE_R2_ACCOUNT_ID`
- `CLOUDFLARE_R2_ACCESS_KEY_ID`
- `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
- `CLOUDFLARE_R2_BUCKET_NAME`

---

## 4. Triggering a Deployment

### Automatic Deployments (GitHub Webhook)
If your GitHub repository is connected via Coolify's GitHub App or Webhook:
- Any `git push origin main` triggers an automatic build and deployment in Coolify.

### Manual Deployment
If you need to trigger a deploy manually:
1. Open your **Coolify Dashboard**.
2. Navigate to your **123 The Next Level** application.
3. Click the **"Deploy"** button at the top right.
4. Coolify will pull the latest commit from `main`, run the Nixpacks build, and start the updated container.

---

## 5. Health Check

Coolify can monitor application health:
- **Health Check Path**: `/health` or `/ping`
- **Response**: `200 OK`
