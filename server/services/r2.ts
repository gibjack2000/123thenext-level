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

// File Key Mapping inside 'paid-products-vault/'
export const GUIDE_FILE_KEYS: Record<string, string> = {
  'beginner-home-workout': 'beginner-home-workout-guide.pdf',
  'master-meal-planning': 'master-meal-planning-guide.pdf',
  'cortisol-stress-management': 'cortisol-stress-management-protocol.pdf',
  'next-level-lifespan': 'the-next-level-lifespan.pdf',

  // Catalog Product ID aliases
  'g-fit-1': 'beginner-home-workout-guide.pdf',
  'g-fit-2': 'Hypertrophy-Strength-Protocol-2026.pdf',
  'g-fit-3': 'Daily_Mobility_and_Recovery-2026.pdf',
  'g-nut-1': 'master-meal-planning-guide.pdf',
  'g-nut-2': 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'g-nut-3': 'High_Protein_Recipe_Collection-2026.pdf',
  'g-wel-1': 'cortisol-stress-management-protocol.pdf',
  'g-wel-2': 'Deep_Sleep_Optimization-2026.pdf',
  'g-wel-3': 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf'
};

export async function generateGuidePresignedUrl(guideId: string, expiresIn: number = 900): Promise<string> {
  const fileKey = GUIDE_FILE_KEYS[guideId] || `${guideId}.pdf`;

  const command = new GetObjectCommand({
    Bucket: process.env.R2_PAID_BUCKET_NAME || 'paid-products-vault',
    Key: fileKey
  });

  // Generate a short-lived link (valid for 15 minutes / 900 seconds)
  const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn });
  return presignedUrl;
}
