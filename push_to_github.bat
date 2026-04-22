@echo off
echo Pushing changes to GitHub...
git add .
git commit -m "Create Epigenetic Age, Mitochondrial Cap, HRV Resilience, and Bone Density diagnostic pages"
git push origin main
echo.
echo Push completed.
pause
