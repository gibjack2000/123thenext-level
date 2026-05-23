# Stripe Checkout & Secure PDF Fulfillment System

This guide outlines how to configure, test, and deploy the secure digital products checkout and fulfillment system built for your website.

---

## 1. Directory Structure & File Placement

### Place Your PDFs:
Put your 9 digital PDF products in the protected storage directory:
`d:/0Antigravity/123zenextlevel/123thenextlevel/123thenext-level/protected-files/pdfs/`

Ensure the file names exactly match the values in your server-side catalog:
1. `beginner_home_workout_v1.pdf` (Beginner Home Workout Plan)
2. `hypertrophy_protocol_v1.pdf` (Hypertrophy & Strength Protocol)
3. `daily_mobility_v1.pdf` (Daily Mobility & Recovery)
4. `meal_planning_mastery.pdf` (The Master Meal Planning Guide)
5. `fat_loss_blueprint.pdf` (Fat Loss Nutrition Blueprint)
6. `high_protein_recipes.pdf` (High-Protein Recipe Collection)
7. `stress_management_toolkit.pdf` (Cortisol & Stress Management)
8. `sleep_optimization.pdf` (Deep Sleep Optimization)
9. `habit_reset_workbook.pdf` (Mindfulness & Habit Reset)

> [!NOTE]
> Storing files in `/protected-files` prevents users from directly browsing or downloading the files without first completing a verified purchase.

---

## 2. Stripe Configuration

### Step A: Create Products in Stripe Dashboard
1. Go to your [Stripe Dashboard (Test Mode)](https://dashboard.stripe.com/test/products).
2. Create 9 different products corresponding to the guides.
3. For each product, create a **one-time price** in GBP (£) matching the prices:
   - Fit 1: £19.00
   - Fit 2: £29.00
   - Fit 3: £15.00
   - Nut 1: £24.00
   - Nut 2: £29.00
   - Nut 3: £19.00
   - Wel 1: £22.00
   - Wel 2: £25.05 (or £25.00)
   - Wel 3: £18.00
4. Copy the generated **Price IDs** (starting with `price_...`).

### Step B: Paste Price IDs on the Server
Open the server-side product config [server/data/products.js](file:///d:/0Antigravity/123zenextlevel/123thenextlevel/123thenext-level/server/data/products.js) or configure them via your environment variables:
- `STRIPE_PRICE_FIT1` = `price_...`
- `STRIPE_PRICE_FIT2` = `price_...`
- ...etc.

---

## 3. Environment Variables (`.env`)

Add the following variables to your local `.env` file (copied from `.env.example`):

```bash
# --- Stripe Keys ---
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# --- App URL Configuration ---
VITE_APP_URL="http://localhost:3000"
PORT=3001

# --- Delivery Settings ---
DOWNLOAD_TOKEN_EXPIRY_HOURS=72
DOWNLOAD_MAX_USES=3
FILE_STORAGE_DIR="./protected-files/pdfs"
```

---

## 4. Run & Test Locally

### Step A: Install Dependencies
Ensure all backend dependencies are installed:
```bash
npm install
```

### Step B: Run Webhook Tunnel (Stripe CLI)
To test webhooks locally, install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and run:
```bash
# Log in to your Stripe account
stripe login

# Forward webhook events to your local server
stripe listen --forward-to localhost:3001/api/stripe-webhook
```
Stripe CLI will output a webhook signing secret starting with `whsec_...`. **Copy this secret and paste it as `STRIPE_WEBHOOK_SECRET` in your `.env` file.**

### Step C: Start the App
Start the frontend and backend simultaneously in development mode:
```bash
npm run dev
```

1. Navigate to `http://localhost:3000/premium-guides`.
2. Add guides to the cart.
3. Click "Checkout" -> complete the payment on the Stripe Checkout page using test credit cards (e.g. `4242 4242 4242 4242`).
4. Upon success, you will be redirected back to the success page, the cart will be cleared, and secure download tokens will be available to stream your PDFs!

---

## 5. Hostinger Production Deployment

When deploying to Hostinger:
1. Ensure the Node.js environment variables (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `VITE_APP_URL`, etc.) are configured in the Hostinger Node.js dashboard.
2. Place the PDFs in the `/protected-files/pdfs/` folder on your server (above public root).
3. Set your Stripe Webhook endpoint in the Live Stripe Dashboard to:
   `https://yourdomain.com/api/stripe-webhook`
   Ensure you listen for `checkout.session.completed` and `checkout.session.expired` events.
