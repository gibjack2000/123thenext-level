# Guides and PDF Fulfillment Documentation (Cloudflare R2 Vault)

This document maps the website's digital guides to their paid PDF downloads in the private Cloudflare R2 bucket (`paid-products-vault`), outlines the environment configuration, and explains the secure presigned fulfillment system.

---

## 1. Storage Architecture

All premium digital PDF products are hosted securely in a **private Cloudflare R2 Bucket**:
- **Bucket Name**: `paid-products-vault`
- **Cloudflare Account ID**: `926138deb9acb5a8f59280cc710d0859`
- **Delivery Protocol**: Temporary S3-compatible Presigned URLs (AWS SDK v3)
- **Local Fallback**: `protected-files/pdfs/` (used if R2 is temporarily unreachable)

> [!NOTE]
> Downloads are never publicly exposed. When a customer completes checkout, the server generates a token-gated link (`/api/download/:token`). When accessed, the server verifies the purchase, increments the download count, and issues a secure, short-lived presigned URL (valid for 1 hour by default) directly from Cloudflare's edge network.

---

## 2. 9 Guides Mapping Directory

| Product ID | Guide Title | R2 Object Key (`paid-products-vault`) | Customer Download Filename | Local Fallback Path |
| :--- | :--- | :--- | :--- | :--- |
| `g-fit-1` | Beginner Home Workout Plan | `beginner_home_workout-2026.pdf` | `Beginner-Home-Workout-Plan-123TheNextLevel.pdf` | `protected-files/pdfs/beginner_home_workout_v1.pdf` |
| `g-fit-2` | Hypertrophy & Strength Protocol | `Hypertrophy-Strength-Protocol-2026.pdf` | `Hypertrophy-Strength-Protocol-123TheNextLevel.pdf` | `protected-files/pdfs/hypertrophy_protocol_v1.pdf` |
| `g-fit-3` | Daily Mobility & Recovery | `Daily_Mobility_and_Recovery-2026.pdf` | `Daily-Mobility-and-Recovery-123TheNextLevel.pdf` | `protected-files/pdfs/daily_mobility_v1.pdf` |
| `g-nut-1` | The Master Meal Planning Guide | `The Master_Meal_Planning_Guide-2026.pdf` | `The-Master-Meal-Planning-Guide-123TheNextLevel.pdf` | `protected-files/pdfs/fat_loss_blueprint.pdf` |
| `g-nut-2` | Fat Loss Nutrition Blueprint | `Fat-Loss-Nutrition-Blueprint-2026.pdf` | `Fat-Loss-Nutrition-Blueprint-123TheNextLevel.pdf` | `protected-files/pdfs/fat-loss-nutrition-blueprint.pdf` |
| `g-nut-3` | High-Protein Recipe Collection | `High_Protein_Recipe_Collection-2026.pdf` | `High-Protein-Recipe-Collection-123TheNextLevel.pdf` | `protected-files/pdfs/high_protein_recipes.pdf` |
| `g-wel-1` | Cortisol & Stress Management | `Cortisol_and_Stress_Management-2026.pdf` | `Cortisol-and-Stress-Management-123TheNextLevel.pdf` | `protected-files/pdfs/stress-management-toolkit.pdf` |
| `g-wel-2` | Deep Sleep Optimization | `Deep_Sleep_Optimization-2026.pdf` | `Deep-Sleep-Optimization-123TheNextLevel.pdf` | `protected-files/pdfs/sleep_optimization.pdf` |
| `g-wel-3` | Mindfulness & Habit Reset | `Mindfulness_and_Habit_Reset_Workbook-2026.pdf` | `Mindfulness-and-Habit-Reset-Workbook-123TheNextLevel.pdf` | `protected-files/pdfs/habit_reset_workbook.pdf` |

---

## 3. Environment Variables (`.env`)

```env
# Cloudflare R2 Storage (Paid Products Vault)
CLOUDFLARE_ACCOUNT_ID="926138deb9acb5a8f59280cc710d0859"
R2_ACCESS_KEY_ID="8d1bb4ee66d4dd2eb7c806dc608ba94c"
R2_SECRET_ACCESS_KEY="122f0127550a144bb82b1a3a708842412b6b09f44da90e794c78fc5118214ebf"
R2_PAID_BUCKET_NAME="paid-products-vault"

# Presigned URL Expiration (Optional, default: 3600 seconds / 1 hour)
R2_PRESIGNED_EXPIRY_SECONDS=3600

# Token Gating Controls
DOWNLOAD_TOKEN_EXPIRY_HOURS=72
DOWNLOAD_MAX_USES=3
FILE_STORAGE_DIR="./protected-files/pdfs"
```

---

## 4. Endpoints Reference

### 1. Download Redirect (Standard Browser)
- **Route**: `GET /api/download/:token`
- **Behavior**: Verifies token validity, decrements remaining download count, generates a fresh Cloudflare R2 presigned URL, and responds with `302 Found` directing the browser to R2.

### 2. Direct JSON Presigned URL (Programmatic API)
- **Route**: `GET /api/presigned-url/:token` (or `/api/download/:token?format=json`)
- **Behavior**: Returns a JSON object:
  ```json
  {
    "success": true,
    "download_url": "https://paid-products-vault.926138deb9acb5a8f59280cc710d0859.r2.cloudflarestorage.com/...",
    "filename": "Beginner-Home-Workout-Plan-123TheNextLevel.pdf",
    "expires_in_seconds": 3600,
    "remaining_downloads": 2
  }
  ```

### 3. R2 Vault Health & Diagnostic Check
- **Route**: `GET /api/r2/status`
- **Behavior**: Verifies R2 connectivity and outputs real-time bucket contents and object sizes.

---

## 5. Verification Script

To verify all 9 guide downloads in R2 anytime, run:
```bash
node scripts/verify-r2-vault.js
```
