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

## 3. Alternative: Hostinger Panel Update
If you prefer using the Hostinger Git dashboard, follow these rules:

### ✅ USE: "Update" or "Sync"
A standard **Pull** or **Sync** operation is safe. It will **NOT** touch your `Products` folder because that folder is not part of the GitHub repository.

### ❌ AVOID: "Reset and Pull"
> [!CAUTION]
> **NEVER** use the "Reset and Pull" (or "Hard Reset") option unless you have a full backup of your images.
> This command tells Git to make your website an *exact* match of the GitHub repository. Since the images are not on GitHub, this operation may delete them to make the folders match perfectly.

## 3. Best Practices for Image Management

- **Uploading New Images:** Use Hostinger's File Manager or FTP to upload new images directly to the `public_html/Products` folder.
- **Reference in Dashboard:** When adding a product in the Admin Dashboard, use the path `https://123thenextlevel.com/Products/your-image-name.jpg`.
- **Backups:** Even with these protections, we recommend periodically downloading a backup of your `public_html/Products` folder to your local computer using FTP (like FileZilla).

## 4. Local Development Warning
If you are working on the code locally, your local `public/Products` folder will be empty (except for a `.gitkeep` file). This is normal. Your local environment will use the live images from the website URL if you have configured them that way, or you can copy your images locally for testing—they just won't be sent to GitHub when you push.
