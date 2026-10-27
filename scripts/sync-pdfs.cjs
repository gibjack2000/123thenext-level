const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting sync of authentic PDFs...');

const rootDir = path.resolve(__dirname, '..');

const copies = [
  // 1. Beginner Home Workout Plan (2.22 MB)
  {
    src: path.join(rootDir, 'protected-files/pdfs/beginner_home_workout-2026.pdf'),
    dests: [
      path.join(rootDir, 'public/assets/docs/beginner_home_workout-2026.pdf'),
      path.join(rootDir, 'public/assets/docs/beginner_home_workout_v1.pdf'),
      path.join(rootDir, 'public/docs/beginner_home_workout-2026.pdf'),
      path.join(rootDir, 'public/docs/beginner_home_workout_v1.pdf'),
      path.join(rootDir, 'public/beginner_bodyweight_guide_revised-v3.pdf')
    ]
  },
  // 2. Hypertrophy & Strength Protocol (1.06 MB)
  {
    src: path.join(rootDir, 'protected-files/pdfs/Hypertrophy-Strength-Protocol-2026.pdf'),
    dests: [
      path.join(rootDir, 'public/assets/docs/Hypertrophy-Strength-Protocol-2026.pdf'),
      path.join(rootDir, 'public/assets/docs/hypertrophy_protocol_v1.pdf'),
      path.join(rootDir, 'public/docs/Hypertrophy-Strength-Protocol-2026.pdf'),
      path.join(rootDir, 'public/docs/hypertrophy_protocol_v1.pdf')
    ]
  },
  // 3. Daily Mobility & Recovery (2.36 MB)
  {
    src: path.join(rootDir, 'protected-files/pdfs/Daily_Mobility_and_Recovery-2026.pdf'),
    dests: [
      path.join(rootDir, 'public/assets/docs/Daily_Mobility_and_Recovery-2026.pdf'),
      path.join(rootDir, 'public/assets/docs/daily_mobility_v1.pdf'),
      path.join(rootDir, 'public/docs/Daily_Mobility_and_Recovery-2026.pdf'),
      path.join(rootDir, 'public/docs/daily_mobility_v1.pdf')
    ]
  },
  // 4. The Master Meal Planning Guide (4.77 MB)
  {
    src: path.join(rootDir, 'protected-files/pdfs/The Master_Meal_Planning_Guide-2026.pdf'),
    dests: [
      path.join(rootDir, 'public/assets/docs/The Master_Meal_Planning_Guide-2026.pdf'),
      path.join(rootDir, 'public/assets/docs/The_Master_Meal_Planning_Guide-2026.pdf'),
      path.join(rootDir, 'public/assets/docs/the_master_meal_planning_guide.pdf'),
      path.join(rootDir, 'public/docs/The Master_Meal_Planning_Guide-2026.pdf'),
      path.join(rootDir, 'public/docs/The_Master_Meal_Planning_Guide-2026.pdf'),
      path.join(rootDir, 'public/docs/the_master_meal_planning_guide.pdf')
    ]
  },
  // 5. Fat Loss Nutrition Blueprint (1.46 MB)
  {
    src: path.join(rootDir, 'protected-files/pdfs/Fat-Loss-Nutrition-Blueprint-2026.pdf'),
    dests: [
      path.join(rootDir, 'public/assets/docs/Fat-Loss-Nutrition-Blueprint-2026.pdf'),
      path.join(rootDir, 'public/assets/docs/fat-loss-nutrition-blueprint.pdf'),
      path.join(rootDir, 'public/assets/docs/fat_loss_blueprint.pdf'),
      path.join(rootDir, 'public/docs/Fat-Loss-Nutrition-Blueprint-2026.pdf'),
      path.join(rootDir, 'public/docs/fat-loss-nutrition-blueprint.pdf'),
      path.join(rootDir, 'public/docs/fat_loss_blueprint.pdf')
    ]
  },
  // 6. High-Protein Recipe Collection (2.18 MB)
  {
    src: path.join(rootDir, 'protected-files/pdfs/High_Protein_Recipe_Collection-2026.pdf'),
    dests: [
      path.join(rootDir, 'public/assets/docs/High_Protein_Recipe_Collection-2026.pdf'),
      path.join(rootDir, 'public/assets/docs/high_protein_recipes.pdf'),
      path.join(rootDir, 'public/docs/High_Protein_Recipe_Collection-2026.pdf'),
      path.join(rootDir, 'public/docs/high_protein_recipes.pdf')
    ]
  },
  // 7. Cortisol & Stress Management (210 KB)
  {
    src: path.join(rootDir, 'protected-files/pdfs/Cortisol_&_Stress_Management-2026.pdf'),
    dests: [
      path.join(rootDir, 'public/assets/docs/Cortisol_&_Stress_Management-2026.pdf'),
      path.join(rootDir, 'public/assets/docs/Cortisol_and_Stress_Management-2026.pdf'),
      path.join(rootDir, 'public/assets/docs/stress-management-toolkit.pdf'),
      path.join(rootDir, 'public/docs/Cortisol_&_Stress_Management-2026.pdf'),
      path.join(rootDir, 'public/docs/Cortisol_and_Stress_Management-2026.pdf'),
      path.join(rootDir, 'public/docs/stress-management-toolkit.pdf')
    ]
  },
  // 8. Deep Sleep Optimization (490 KB)
  {
    src: path.join(rootDir, 'protected-files/pdfs/Deep_Sleep_Optimization-2026.pdf'),
    dests: [
      path.join(rootDir, 'public/assets/docs/Deep_Sleep_Optimization-2026.pdf'),
      path.join(rootDir, 'public/assets/docs/sleep_optimization.pdf'),
      path.join(rootDir, 'public/docs/Deep_Sleep_Optimization-2026.pdf'),
      path.join(rootDir, 'public/docs/sleep_optimization.pdf')
    ]
  },
  // 9. Mindfulness & Habit Reset Workbook (1.35 MB)
  {
    src: path.join(rootDir, 'protected-files/pdfs/Mindfulness_and_Habit_Reset_Workbook-2026.pdf'),
    dests: [
      path.join(rootDir, 'public/assets/docs/Mindfulness_and_Habit_Reset_Workbook-2026.pdf'),
      path.join(rootDir, 'public/assets/docs/habit_reset_workbook.pdf'),
      path.join(rootDir, 'public/docs/Mindfulness_and_Habit_Reset_Workbook-2026.pdf'),
      path.join(rootDir, 'public/docs/habit_reset_workbook.pdf')
    ]
  },
  // 10. Metabolic Master Guide (1.37 MB)
  {
    src: path.join(rootDir, 'public/assets/docs/metabolic-master-guide.pdf'),
    dests: [
      path.join(rootDir, 'public/assets/docs/The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf'),
      path.join(rootDir, 'public/assets/docs/12-Week_Metabolic_Re-Engineering_Protocol.pdf'),
      path.join(rootDir, 'public/docs/metabolic-master-guide.pdf'),
      path.join(rootDir, 'public/docs/12-Week_Metabolic_Re-Engineering_Protocol.pdf'),
      path.join(rootDir, 'public/docs/The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf'),
      path.join(rootDir, 'protected-files/pdfs/The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf'),
      path.join(rootDir, 'protected-files/pdfs/metabolic-master-guide.pdf')
    ]
  },
  // 11. Lifespan Blueprint (796 KB)
  {
    src: path.join(rootDir, 'protected-files/pdfs/the-next-level-lifespan.pdf'),
    dests: [
      path.join(rootDir, 'public/assets/docs/the-next-level-lifespan.pdf'),
      path.join(rootDir, 'public/assets/docs/the-next-level-lifespan-v7.pdf'),
      path.join(rootDir, 'public/docs/the-next-level-lifespan.pdf'),
      path.join(rootDir, 'public/the-next-level-lifespan-v7.pdf')
    ]
  },
  // 12. Bundles
  {
    src: path.join(rootDir, 'protected-files/pdfs/Complete_6_Pillar_Master_Suite-2026.zip'),
    dests: [
      path.join(rootDir, 'public/assets/docs/Complete_6_Pillar_Master_Suite-2026.zip'),
      path.join(rootDir, 'public/assets/docs/all-six-master-guides.zip')
    ]
  },
  {
    src: path.join(rootDir, 'protected-files/pdfs/Complete_9_Book_Master_Vault-2026.zip'),
    dests: [
      path.join(rootDir, 'public/assets/docs/Complete_9_Book_Master_Vault-2026.zip'),
      path.join(rootDir, 'public/assets/docs/all-nine-master-guides.zip')
    ]
  }
];

let copyCount = 0;
copies.forEach(({ src, dests }) => {
  if (!fs.existsSync(src)) {
    console.error('Missing source file:', src);
    return;
  }
  const size = fs.statSync(src).size;
  dests.forEach(dest => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(src, dest);
    copyCount++;
    console.log(`[OK] Copied ${path.basename(src)} (${(size / 1024 / 1024).toFixed(2)} MB) -> ${path.relative(rootDir, dest)}`);
  });
});

// Build all-ten-master-guides.zip including metabolic master guide
const zipTarget1 = path.join(rootDir, 'public/assets/docs/all-ten-master-guides.zip');
const zipTarget2 = path.join(rootDir, 'public/assets/docs/Complete_10_Book_Master_Vault-2026.zip');
const zipTarget3 = path.join(rootDir, 'protected-files/pdfs/all-ten-master-guides.zip');

try {
  const tempDir = path.join(rootDir, 'scratch/ten_books_temp');
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
  fs.mkdirSync(tempDir, { recursive: true });

  const tenFiles = [
    'beginner_home_workout-2026.pdf',
    'Hypertrophy-Strength-Protocol-2026.pdf',
    'Daily_Mobility_and_Recovery-2026.pdf',
    'The Master_Meal_Planning_Guide-2026.pdf',
    'Fat-Loss-Nutrition-Blueprint-2026.pdf',
    'High_Protein_Recipe_Collection-2026.pdf',
    'Cortisol_&_Stress_Management-2026.pdf',
    'Deep_Sleep_Optimization-2026.pdf',
    'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
    'The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf'
  ];

  tenFiles.forEach(file => {
    const src = path.join(rootDir, 'public/assets/docs', file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(tempDir, file));
    } else {
      console.warn('Warning: file missing for 10-book zip:', file);
    }
  });

  const zipTempOut = path.join(rootDir, 'scratch/all-ten.zip');
  execSync(`tar -a -c -f "${zipTempOut}" -C "${tempDir}" *`);
  fs.copyFileSync(zipTempOut, zipTarget1);
  fs.copyFileSync(zipTempOut, zipTarget2);
  fs.copyFileSync(zipTempOut, zipTarget3);
  console.log('[OK] Created complete 10-book ZIP bundles at:', path.relative(rootDir, zipTarget1));
  fs.rmSync(tempDir, { recursive: true, force: true });
  fs.unlinkSync(zipTempOut);
} catch (zipErr) {
  console.error('Failed to create 10-book zip:', zipErr.message);
}

console.log(`\nPDF sync completed! Successfully processed ${copyCount} file destinations.`);
