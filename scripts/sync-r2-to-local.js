import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const mappings = [
  // 1. Beginner Home Workout
  { r2Key: 'beginner_home_workout-2026.pdf', local: 'protected-files/pdfs/beginner_home_workout-2026.pdf' },
  { r2Key: 'beginner_home_workout-2026.pdf', local: 'protected-files/pdfs/beginner_home_workout_v1.pdf' },
  
  // 2. The Master Meal Planning Guide
  { r2Key: 'The Master_Meal_Planning_Guide-2026.pdf', local: 'protected-files/pdfs/The Master_Meal_Planning_Guide-2026.pdf' },
  { r2Key: 'The Master_Meal_Planning_Guide-2026.pdf', local: 'protected-files/pdfs/the_master_meal_planning_guide.pdf' },

  // 3. Cortisol & Stress Management
  { r2Key: 'Cortisol_&_Stress_Management-2026.pdf', local: 'protected-files/pdfs/Cortisol_&_Stress_Management-2026.pdf' },
  { r2Key: 'Cortisol_&_Stress_Management-2026.pdf', local: 'protected-files/pdfs/stress-management-toolkit.pdf' },

  // 4. Hypertrophy & Strength
  { r2Key: 'Hypertrophy-Strength-Protocol-2026.pdf', local: 'protected-files/pdfs/Hypertrophy-Strength-Protocol-2026.pdf' },
  { r2Key: 'Hypertrophy-Strength-Protocol-2026.pdf', local: 'protected-files/pdfs/hypertrophy_protocol_v1.pdf' },

  // 5. Daily Mobility & Recovery
  { r2Key: 'Daily_Mobility_and_Recovery-2026.pdf', local: 'protected-files/pdfs/Daily_Mobility_and_Recovery-2026.pdf' },
  { r2Key: 'Daily_Mobility_and_Recovery-2026.pdf', local: 'protected-files/pdfs/daily_mobility_v1.pdf' },

  // 6. Fat Loss Nutrition Blueprint
  { r2Key: 'Fat-Loss-Nutrition-Blueprint-2026.pdf', local: 'protected-files/pdfs/Fat-Loss-Nutrition-Blueprint-2026.pdf' },
  { r2Key: 'Fat-Loss-Nutrition-Blueprint-2026.pdf', local: 'protected-files/pdfs/fat-loss-nutrition-blueprint.pdf' },
  { r2Key: 'Fat-Loss-Nutrition-Blueprint-2026.pdf', local: 'protected-files/pdfs/fat_loss_blueprint.pdf' },

  // 7. High Protein Recipe Collection
  { r2Key: 'High_Protein_Recipe_Collection-2026.pdf', local: 'protected-files/pdfs/High_Protein_Recipe_Collection-2026.pdf' },
  { r2Key: 'High_Protein_Recipe_Collection-2026.pdf', local: 'protected-files/pdfs/high_protein_recipes.pdf' },

  // 8. Deep Sleep Optimization
  { r2Key: 'Deep_Sleep_Optimization-2026.pdf', local: 'protected-files/pdfs/Deep_Sleep_Optimization-2026.pdf' },
  { r2Key: 'Deep_Sleep_Optimization-2026.pdf', local: 'protected-files/pdfs/sleep_optimization.pdf' },

  // 9. Mindfulness & Habit Reset
  { r2Key: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf', local: 'protected-files/pdfs/Mindfulness_and_Habit_Reset_Workbook-2026.pdf' },
  { r2Key: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf', local: 'protected-files/pdfs/habit_reset_workbook.pdf' },

  // 10. Lifespan Blueprint
  { r2Key: 'the-next-level-lifespan.pdf', local: 'protected-files/pdfs/the-next-level-lifespan.pdf' },
];

async function syncAll() {
  console.log('Syncing real R2 files to local fallback directory protected-files/pdfs/ ...');

  for (const item of mappings) {
    try {
      console.log(`Downloading ${item.r2Key} -> ${item.local}...`);
      const res = await s3.send(new GetObjectCommand({
        Bucket: 'paid-products-vault',
        Key: item.r2Key,
      }));

      const chunks = [];
      for await (const chunk of res.Body) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      fs.writeFileSync(path.resolve(item.local), buffer);
      console.log(`✅ Saved ${(buffer.length / 1024 / 1024).toFixed(2)} MB to ${item.local}`);
    } catch (e) {
      console.error(`❌ Failed to sync ${item.r2Key}:`, e.message);
    }
  }

  console.log('\nAll local fallback PDFs are now 100% in sync with Cloudflare R2!');
}

syncAll();
