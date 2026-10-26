# Revert Guide: Dark Luxe Background Redesign

This document outlines the three fail-safe methods to instantly revert all changes made during the Dark & Luxurious Background Redesign back to the exact initial state.

---

### Method A: One-Line On/Off Switch (Instant & Non-Destructive)

To toggle the redesign off or on without touching git:

1. Open [index.html](file:///d:/0Antigravity/123zenextlevel/123thenextlevel/123thenext-level/index.html).
2. Locate the root `<html>` tag:
   ```html
   <!-- To Turn OFF (Original Site Look): -->
   <html lang="en">

   <!-- To Turn ON (Dark Luxe Redesign): -->
   <html lang="en" class="theme-luxe">
   ```
3. Alternatively, comment out or remove the single stylesheet link in `<head>`:
   ```html
   <!-- <link rel="stylesheet" href="/src/styles/backgrounds-luxe.css" /> -->
   ```
*Result*: The site immediately falls back to its exact pre-redesign appearance, because 100% of the luxury background styles are strictly scoped under `html.theme-luxe`.

---

### Method B: Git Revert / Reset to Tag

A git tag named `pre-background-redesign` was created on `main` before any changes were introduced. All work is kept on the branch `feature/dark-luxe-backgrounds`.

To completely discard all redesign work and return your working directory to the baseline:

```powershell
# 1. Discard any uncommitted edits:
git reset --hard

# 2. Return to the main branch at the baseline tag:
git checkout main
git reset --hard pre-background-redesign

# 3. (Optional) Delete the feature branch if no longer needed:
git branch -D feature/dark-luxe-backgrounds
```

---

### Method C: Physical Backup Folder Restore

Before modifying any file, pristine copies were mirrored in `_backup_pre-redesign/`.

To restore from the physical backup directory via PowerShell:

```powershell
# Copy backed up files back over the workspace:
Copy-Item -Path "_backup_pre-redesign/*" -Destination "." -Recurse -Force

# Remove the luxe stylesheet file:
Remove-Item -Path "src/styles/backgrounds-luxe.css" -Force -ErrorAction SilentlyContinue
```
