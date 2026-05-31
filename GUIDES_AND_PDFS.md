# Guides and PDF Fulfillment Documentation

This document maps the website's digital guides to their paid PDF downloads and provides instructions for managing them.

## Protected Storage Folder Path
All digital PDF products are stored in a protected folder outside the public root directory to prevent direct downloading:
`d:/0Antigravity/123zenextlevel/123thenextlevel/123thenext-level/protected-files/pdfs/`

---

## 9 Guides Mapping Directory

| Product ID (SKU) | Guide Title | Page URL/Slug | PDF Filename in Protected Folder |
| :--- | :--- | :--- | :--- |
| `g-fit-1` | Beginner Home Workout Plan | `/premium-guides/beginner-home-workout-plan` | `beginner-home-workout-plan.pdf` |
| `g-fit-2` | Hypertrophy & Strength Protocol | `/premium-guides/strength-training-hypertrophy` | `strength-training-hypertrophy.pdf` |
| `g-fit-3` | Daily Mobility & Recovery | `/premium-guides/mobility-recovery-routine` | `mobility-recovery-routine.pdf` |
| `g-nut-1` | The Master Meal Planning Guide | `/premium-guides/healthy-meal-planning-guide` | `healthy-meal-planning-guide.pdf` |
| `g-nut-2` | Fat Loss Nutrition Blueprint | `/premium-guides/fat-loss-nutrition-blueprint` | `fat-loss-nutrition-blueprint.pdf` |
| `g-nut-3` | High-Protein Recipe Collection | `/premium-guides/high-protein-recipe-collection` | `high-protein-recipe-collection.pdf` |
| `g-wel-1` | Cortisol & Stress Management | `/premium-guides/stress-management-toolkit` | `stress-management-toolkit.pdf` |
| `g-wel-2` | Deep Sleep Optimization | `/premium-guides/sleep-optimization-protocol` | `sleep-optimization-protocol.pdf` |
| `g-wel-3` | Mindfulness & Habit Reset | `/premium-guides/mindfulness-habit-reset` | `mindfulness-habit-reset.pdf` |

---

## Step-by-Step Instructions

### 1. Replacing Placeholder PDFs with Real PDFs
1. Export or save your real guide files as PDF files.
2. Ensure each file is named **exactly** as shown in the table above (e.g. `beginner-home-workout-plan.pdf` for the Beginner Home Workout Plan).
3. Copy these PDF files.
4. Open the protected folder: `d:/0Antigravity/123zenextlevel/123thenextlevel/123thenext-level/protected-files/pdfs/`
5. Paste your real PDFs there, overwriting the empty placeholder files.

---

### 2. Adding a 10th Guide in the Future
To add a new guide, follow these steps:

#### Step A: Add Product to Stripe & Catalog
1. Go to your **Stripe Dashboard (Test Mode)** and create a new digital product with a one-time price. Copy the **Price ID** (e.g., `price_12345...`).
2. Add the Stripe Price ID as an environment variable in `.env` (e.g., `STRIPE_PRICE_NEW1`).
3. Add the product entry to `server/data/products.js`:
   ```javascript
   {
     id: 'g-new-1',
     slug: 'your-new-guide-slug',
     title: 'Your New Guide Title',
     price: 19.00,
     currency: 'gbp',
     stripePriceId: process.env.STRIPE_PRICE_NEW1 || 'price_placeholder_new1',
     filePath: 'your-new-guide-filename.pdf',
     active: true
   }
   ```

#### Step B: Add Guide to Frontend Catalog & Mapping
1. Add the new guide details to `src/data/guides.ts` so it renders in the UI:
   ```typescript
   {
     id: 'g-new-1',
     slug: 'your-new-guide-slug',
     title: 'Your New Guide Title',
     category: 'Fitness', // 'Fitness' | 'Nutrition' | 'Wellness'
     shortDescription: 'Short description for card display...',
     longDescription: 'Long comprehensive guide description...',
     priceDisplay: '£19.00',
     stripePriceId: 'price_placeholder_new1',
     image: 'https://images.unsplash.com/...',
     fileName: 'your-new-guide-filename.pdf',
     featured: false,
     tags: ['Tag1', 'Tag2'],
     included: ['What is included item 1', 'Item 2'],
     audience: 'Target demographic details...',
     disclaimer: 'Disclaimers and warnings...'
   }
   ```
2. Update the `content/guide-downloads.json` mapping file:
   ```json
   {
     "guide_id": "your-new-guide-slug",
     "title": "Your New Guide Title",
     "pdf_filename": "your-new-guide-filename.pdf"
   }
   ```

#### Step C: Drop the New PDF in Storage
1. Place the file `your-new-guide-filename.pdf` into `protected-files/pdfs/`.
