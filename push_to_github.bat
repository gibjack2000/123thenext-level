@echo off
echo Pushing changes to GitHub...
git add .
git commit -m "Update from Antigravity agent"
git push origin main
echo.
echo Push completed.
pause
