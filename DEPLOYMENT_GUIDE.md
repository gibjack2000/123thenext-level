# Hostinger Deployment Guide: Protecting Persistent Assets

This guide explains how to safely update your website from GitHub to Hostinger while ensuring that your **Product Images** (located in the `public_html/Products` folder) are never deleted or overwritten.

## 1. How Your Files Are Protected
We have configured the project's `.gitignore` file to ignore the `public/Products` folder. This means:
- No images from your server are ever uploaded to GitHub.
- GitHub does not "know" about these images, so it will not try to delete them during a standard update.

## 2. Recommended: Safe Deployment (GitHub Action)
We have added a **Safe Deploy** GitHub Action (`.github/workflows/deploy.yml`) that is the most secure way to update your site.

### Why this is safer:
- **Exclusion Rule**: The Action is specifically told to **ignore** the `Products` folder on your server.
- **No Wiping**: It is configured in "non-clean" mode, so it only updates changed files and never deletes untracked folders like your images.

### How to use it:
1. Add your FTP credentials to GitHub Secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`).
2. Every time you push to the `main` branch, it will automatically update the site safely.

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
