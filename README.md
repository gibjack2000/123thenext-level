<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🚀 123TheNext Level

**123TheNext Level** is an advanced AI-powered Amazon affiliate platform designed for multi-region scale and automated content management. It features a robust SuperAdmin dashboard, real-time Supabase integration, and automated marketing copy generation.

## ✨ Key Features

- **🤖 Automated Daily Blog**: Integrated GitHub Actions (`daily_blog.yml`) that triggers Gemini-powered blog generation every day.
- **🛡️ SuperAdmin Dashboard**: Advanced tools for managing blog posts, products, and categories with AI-assisted drafting.
- **📝 Intelligent Marketing**: Automated marketing copy generation for efficient product promotion.
- **☁️ Supabase Integration**: Real-time database and storage management for seamless content delivery.
- **🌐 Multi-Region Support**: Designed to handle affiliate links across different geographical regions.

## 🛠️ Technology Stack

- **Frontend**: Vite + TypeScript + Vanilla CSS
- **Backend/Database**: Supabase (PostgreSQL + Auth + Storage)
- **AI**: Google Gemini API
- **Deployment**: automated via FTP-Deploy-Action to Hostinger
- **Automation**: GitHub Actions

## 🚦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20 or newer)
- npm or yarn

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gibjack2000/123thenext-level.git
   cd 123thenext-level
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   - Copy `.env.example` to `.env`
   - Fill in your `VITE_GEMINI_API_KEY`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_ANON_KEY`.

4. **Launch Dev Server:**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

This project uses GitHub Actions for automated deployment. Pushing to the `main` branch triggers the `deploy.yml` workflow, which builds the project and syncs it to the Hostinger server using FTP.

For more details, see the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## 📅 Automation Workflows

- **Daily Blog Generation**: Runs at 01:00 UTC daily (`.github/workflows/daily_blog.yml`).
- **Safe Web Deploy**: Triggers on every push to `main` (`.github/workflows/deploy.yml`).

---
Developed by gibjack2000
