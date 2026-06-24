This guide explains how your website is updated from GitHub to Hostinger. The **Product Images** are now included in the GitHub repository at the root `/Products` folder and are automatically deployed to the server.

## 1. How Your Files Are Managed
The project is configured to include the `Products` folder in distribution. This means:
- Product images are stored in the GitHub repository.
- Changes to images are automatically synced to the server during deployment.

## 2. Standard Deployment (GitHub Action)
We use a **Safe Deploy** GitHub Action (`.github/workflows/deploy.yml`) to update your site.

### Features:
- **Automatic Inclusion**: The root `/Products` folder is copied to the build directory and uploaded to Hostinger.
- **Syncing**: It updates changed files to keep the server in sync with GitHub.

### How to use it:
1. Add your FTP credentials to GitHub Secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`).
2. **Add Environment Variables to GitHub Secrets**: For the site and automation to work, you must also add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `VITE_GEMINI_API_KEY`
3. Every time you push to the `main` branch, it will automatically update the site safely.

## 4. Alternative: Hostinger Panel Update
If you prefer using the Hostinger Git dashboard, follow these rules:

### ✅ USE: "Update" or "Sync"
A standard **Pull** or **Sync** operation is safe. It will **NOT** touch your `Products` folder because that folder is not part of the GitHub repository.

### ❌ AVOID: "Reset and Pull"
> [!CAUTION]
> **NEVER** use the "Reset and Pull" (or "Hard Reset") option unless you have a full backup of your images.
> This command tells Git to make your website an *exact* match of the GitHub repository. Since the images are not on GitHub, this operation may delete them to make the folders match perfectly.

## 5. Server Environment Variables (Hostinger Panel)
For the Node.js Express server backend on Hostinger to run successfully (such as sending quiz result emails, interacting with Supabase admin functions, etc.), you must define the server-side environment variables.

### Method A: Hostinger Node.js Dashboard (Recommended)
1. Log in to your Hostinger hPanel.
2. Go to **Websites** -> **Manage** -> **Node.js**.
3. Under the **Environment Variables** section, add the following key-value pairs:
   - `SUPABASE_SERVICE_ROLE_KEY` = `your-supabase-service-role-key`
   - `SMTP_HOST` = `smtp.hostinger.com`
   - `SMTP_PORT` = `465`
   - `SMTP_SECURE` = `true`
   - `SMTP_USER` = `jack@123thenextlevel.com`
   - `SMTP_PASS` = `P455w0rd2026!`
   - `SMTP_FROM` = `"The Team at 123Next Level" <jack@123thenextlevel.com>`
4. Click **Save** and **Restart** the application.

### Method B: Creating a `.env` file on Hostinger
If the Hostinger Node.js dashboard doesn't have an Environment Variables section:
1. Open the Hostinger **File Manager**.
2. Navigate to your Node.js application directory (usually `public_html`).
3. Create a new file named `.env`.
4. Paste the server environment variables:
   ```env
   SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
   SMTP_HOST="smtp.hostinger.com"
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER="jack@123thenextlevel.com"
   SMTP_PASS="P455w0rd2026!"
   SMTP_FROM='"The Team at 123Next Level" <jack@123thenextlevel.com>'
   ```
5. Save the file and restart the Node.js app via the Hostinger panel.

## 6. Best Practices for Image Management

- **Uploading New Images:** Use Hostinger's File Manager or FTP to upload new images directly to the `public_html/Products` folder.
- **Reference in Dashboard:** When adding a product in the Admin Dashboard, use the path `https://123thenextlevel.com/Products/your-image-name.jpg`.
- **Backups:** Even with these protections, we recommend periodically downloading a backup of your `public_html/Products` folder to your local computer using FTP (like FileZilla).

## 7. Local Development Warning
If you are working on the code locally, your local `public/Products` folder will be empty (except for a `.gitkeep` file). This is normal. Your local environment will use the live images from the website URL if you have configured them that way, or you can copy your images locally for testing—they just won't be sent to GitHub when you push.
