import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
  }
});

// Updated Cloudflare R2 Object Key Mapping
export const R2_GUIDE_FILE_KEYS: Record<string, string> = {
  // 1. Beginner Home Workout Plan
  'beginner-home-workout': 'beginner_home_workout-2026.pdf',
  'beginner-home-workout-plan': 'beginner_home_workout-2026.pdf',
  'beginner_home_workout': 'beginner_home_workout-2026.pdf',
  
  // 2. The Master Meal Planning Guide
  'master-meal-planning': 'The Master_Meal_Planning_Guide-2026.pdf',
  'master-meal-planning-guide': 'The Master_Meal_Planning_Guide-2026.pdf',
  'The Master_Meal_Planning_Guide': 'The Master_Meal_Planning_Guide-2026.pdf',
  
  // 3. Cortisol & Stress Management Protocol
  'cortisol-stress-management': 'Cortisol_&_Stress_Management-2026.pdf',
  'cortisol-and-stress-management': 'Cortisol_&_Stress_Management-2026.pdf',
  'Cortisol_&_Stress_Management': 'Cortisol_&_Stress_Management-2026.pdf',

  // 4. Lifespan Blueprint (Primary Lead Magnet)
  'next-level-lifespan': 'the-next-level-lifespan.pdf',

  // Checkout URL param aliases (e.g., /checkout?product=workout-plan)
  'workout-plan': 'beginner_home_workout-2026.pdf',
  'performance-guide': 'beginner_home_workout-2026.pdf',
  'meal-planner': 'The Master_Meal_Planning_Guide-2026.pdf',
  'nutrition-guide': 'The Master_Meal_Planning_Guide-2026.pdf',
  'stress-management': 'Cortisol_&_Stress_Management-2026.pdf',
  'autonomic-guide': 'Cortisol_&_Stress_Management-2026.pdf',

  // Catalog Product ID aliases
  'g-fit-1': 'beginner_home_workout-2026.pdf',
  'g-fit-2': 'Hypertrophy-Strength-Protocol-2026.pdf',
  'g-fit-3': 'Daily_Mobility_and_Recovery-2026.pdf',
  'g-nut-1': 'The Master_Meal_Planning_Guide-2026.pdf',
  'g-nut-2': 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'g-nut-3': 'High_Protein_Recipe_Collection-2026.pdf',
  'g-wel-1': 'Cortisol_&_Stress_Management-2026.pdf',
  'g-wel-2': 'Deep_Sleep_Optimization-2026.pdf',
  'g-wel-3': 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf'
};

export const GUIDE_FILE_KEYS = R2_GUIDE_FILE_KEYS;

export const R2_FRIENDLY_FILENAMES: Record<string, string> = {
  'beginner_home_workout-2026.pdf': 'Beginner-Home-Workout-Plan-123TheNextLevel.pdf',
  'The Master_Meal_Planning_Guide-2026.pdf': 'The-Master-Meal-Planning-Guide-123TheNextLevel.pdf',
  'Cortisol_&_Stress_Management-2026.pdf': 'Cortisol-and-Stress-Management-123TheNextLevel.pdf',
  'the-next-level-lifespan.pdf': 'The-Next-Level-Lifespan-Blueprint.pdf',
  'Hypertrophy-Strength-Protocol-2026.pdf': 'Hypertrophy-Strength-Protocol-123TheNextLevel.pdf',
  'Daily_Mobility_and_Recovery-2026.pdf': 'Daily-Mobility-and-Recovery-123TheNextLevel.pdf',
  'Fat-Loss-Nutrition-Blueprint-2026.pdf': 'Fat-Loss-Nutrition-Blueprint-123TheNextLevel.pdf',
  'High_Protein_Recipe_Collection-2026.pdf': 'High-Protein-Recipe-Collection-123TheNextLevel.pdf',
  'Deep_Sleep_Optimization-2026.pdf': 'Deep-Sleep-Optimization-123TheNextLevel.pdf',
  'Mindfulness_and_Habit_Reset_Workbook-2026.pdf': 'Mindfulness-and-Habit-Reset-Workbook-123TheNextLevel.pdf',
};

export async function getPresignedDownloadUrl(guideId: string): Promise<string> {
  // Match guideId to R2 key, defaulting to the exact guideId if not found
  const objectKey = R2_GUIDE_FILE_KEYS[guideId] || `${guideId}.pdf`;
  const downloadFilename = R2_FRIENDLY_FILENAMES[objectKey] || objectKey;

  const command = new GetObjectCommand({
    Bucket: process.env.R2_PAID_BUCKET_NAME || 'paid-products-vault',
    Key: objectKey,
    ResponseContentType: 'application/pdf',
    ResponseContentDisposition: `attachment; filename="${downloadFilename}"`
  });

  // Generates 15-minute temporary presigned download link
  return await getSignedUrl(s3Client, command, { expiresIn: 900 });
}

export const generateGuidePresignedUrl = getPresignedDownloadUrl;
