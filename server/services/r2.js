import { S3Client, GetObjectCommand, HeadObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * Cloudflare R2 Storage Service for Paid Products Vault
 * Securely generates temporary presigned URLs for digital PDF fulfillment.
 */

let s3ClientInstance = null;

export function getR2Client() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "926138deb9acb5a8f59280cc710d0859";
  const accessKeyId = process.env.R2_ACCESS_KEY_ID || "8d1bb4ee66d4dd2eb7c806dc608ba94c";
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || "122f0127550a144bb82b1a3a708842412b6b09f44da90e794c78fc5118214ebf";

  if (!s3ClientInstance) {
    const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;
    s3ClientInstance = new S3Client({
      region: 'auto',
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  return s3ClientInstance;
}

export function isR2Configured() {
  return true;
}

export function getBucketName() {
  return process.env.R2_PAID_BUCKET_NAME || 'paid-products-vault';
}

// Updated Cloudflare R2 Object Key Mapping
export const R2_GUIDE_FILE_KEYS = {
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
  'hypertrophy-strength': 'Hypertrophy-Strength-Protocol-2026.pdf',
  'mobility-recovery': 'Daily_Mobility_and_Recovery-2026.pdf',
  'fat-loss-blueprint': 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'high-protein-recipes': 'High_Protein_Recipe_Collection-2026.pdf',
  'sleep-optimization': 'Deep_Sleep_Optimization-2026.pdf',
  'habit-reset': 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
  'lifespan-blueprint': 'the-next-level-lifespan.pdf',

  // Product ID aliases
  'g-fit-1': 'beginner_home_workout-2026.pdf',
  'g-fit-2': 'Hypertrophy-Strength-Protocol-2026.pdf',
  'g-fit-3': 'Daily_Mobility_and_Recovery-2026.pdf',
  'g-nut-1': 'The Master_Meal_Planning_Guide-2026.pdf',
  'g-nut-2': 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'g-nut-3': 'High_Protein_Recipe_Collection-2026.pdf',
  'g-wel-1': 'Cortisol_&_Stress_Management-2026.pdf',
  'g-wel-2': 'Deep_Sleep_Optimization-2026.pdf',
  'g-wel-3': 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
  'g-epi-1': 'the-next-level-lifespan.pdf',
  'g-fem-1': 'Daily_Mobility_and_Recovery-2026.pdf',
  'g-soc-1': 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
  'g-bundle-1': 'beginner_home_workout-2026.pdf',
  'g-bundle-6': 'beginner_home_workout-2026.pdf',

  // Bundle aliases
  'all-three-master-guides': 'beginner_home_workout-2026.pdf',
  'all-six-master-guides': 'beginner_home_workout-2026.pdf',
  '3-part-bundle': 'beginner_home_workout-2026.pdf',

  // Pillar & topic aliases
  'epigenetics-guide': 'the-next-level-lifespan.pdf',
  'womens-health-guide': 'Daily_Mobility_and_Recovery-2026.pdf',
  'socio-architecture-guide': 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',

  // Slug aliases
  'strength-training-hypertrophy': 'Hypertrophy-Strength-Protocol-2026.pdf',
  'mobility-recovery-routine': 'Daily_Mobility_and_Recovery-2026.pdf',
  'healthy-meal-planning-guide': 'The Master_Meal_Planning_Guide-2026.pdf',
  'fat-loss-nutrition-blueprint': 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'high-protein-recipe-collection': 'High_Protein_Recipe_Collection-2026.pdf',
  'stress-management-toolkit': 'Cortisol_&_Stress_Management-2026.pdf',
  'sleep-optimization-protocol': 'Deep_Sleep_Optimization-2026.pdf',
  'mindfulness-habit-reset': 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',

  // Direct filename self-mappings
  'beginner_home_workout-2026.pdf': 'beginner_home_workout-2026.pdf',
  'The Master_Meal_Planning_Guide-2026.pdf': 'The Master_Meal_Planning_Guide-2026.pdf',
  'Cortisol_&_Stress_Management-2026.pdf': 'Cortisol_&_Stress_Management-2026.pdf',
  'Cortisol_and_Stress_Management-2026.pdf': 'Cortisol_&_Stress_Management-2026.pdf',
  'the-next-level-lifespan.pdf': 'the-next-level-lifespan.pdf',
  'Hypertrophy-Strength-Protocol-2026.pdf': 'Hypertrophy-Strength-Protocol-2026.pdf',
  'Daily_Mobility_and_Recovery-2026.pdf': 'Daily_Mobility_and_Recovery-2026.pdf',
  'Fat-Loss-Nutrition-Blueprint-2026.pdf': 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'High_Protein_Recipe_Collection-2026.pdf': 'High_Protein_Recipe_Collection-2026.pdf',
  'Deep_Sleep_Optimization-2026.pdf': 'Deep_Sleep_Optimization-2026.pdf',
  'Mindfulness_and_Habit_Reset_Workbook-2026.pdf': 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',

  // 1-Click ZIP Bundle for 6-Pillar Master Suite
  'Complete_6_Pillar_Master_Suite-2026.zip': 'Complete_6_Pillar_Master_Suite-2026.zip',
  'all-six-master-guides-zip': 'Complete_6_Pillar_Master_Suite-2026.zip',
  'g-bundle-6-zip': 'Complete_6_Pillar_Master_Suite-2026.zip',

  // 1-Click ZIP Bundle for 9-Book Master Longevity Vault
  'Complete_9_Book_Master_Vault-2026.zip': 'Complete_9_Book_Master_Vault-2026.zip',
  'all-nine-master-guides': 'Complete_9_Book_Master_Vault-2026.zip',
  'all-9-master-guides': 'Complete_9_Book_Master_Vault-2026.zip',
  'g-bundle-9': 'Complete_9_Book_Master_Vault-2026.zip',
  'g-bundle-9-zip': 'Complete_9_Book_Master_Vault-2026.zip'
};

export const GUIDE_FILE_KEYS = R2_GUIDE_FILE_KEYS;

/**
 * Generate a short-lived link (valid for 15 minutes / 900 seconds)
 * Match guideId to R2 key, defaulting to the exact guideId if not found
 *
 * @param {string} guideId
 * @param {number} [expiresIn=900] - Expiration in seconds (default: 15 minutes)
 * @returns {Promise<string>}
 */
export async function getPresignedDownloadUrl(guideId, expiresIn = 900) {
  let objectKey = R2_GUIDE_FILE_KEYS[guideId];
  if (!objectKey) {
    if (guideId.endsWith('.zip') || guideId.endsWith('.pdf')) {
      objectKey = guideId;
    } else {
      objectKey = `${guideId}.pdf`;
    }
  }
  const client = getR2Client();

  if (!client) {
    throw new Error('Cloudflare R2 client is not configured.');
  }

  const downloadFilename = objectKey;
  const isZip = objectKey.endsWith('.zip');
  const contentType = isZip ? 'application/zip' : 'application/pdf';

  const command = new GetObjectCommand({
    Bucket: process.env.R2_PAID_BUCKET_NAME || 'paid-products-vault',
    Key: objectKey,
    ResponseContentType: contentType,
    ResponseContentDisposition: `attachment; filename="${downloadFilename}"`,
  });

  // Generates 15-minute temporary presigned download link
  return await getSignedUrl(client, command, { expiresIn });
}

export const generateGuidePresignedUrl = getPresignedDownloadUrl;

/**
 * Generate a secure, temporary presigned GET download URL for an R2 object with attachment headers.
 *
 * @param {Object} options
 * @param {string} options.key - The object key inside the R2 bucket.
 * @param {string} [options.filename] - Custom download filename presented to the user.
 * @param {number} [options.expiresInSeconds=900] - Lifespan of the presigned URL in seconds (default: 15 minutes).
 * @returns {Promise<string>} The presigned URL.
 */
export async function generatePresignedDownloadUrl({
  key,
  filename,
  expiresInSeconds = 900,
}) {
  const client = getR2Client();
  if (!client) {
    throw new Error('Cloudflare R2 client is not configured or missing credentials in environment.');
  }

  const bucket = getBucketName();
  const safeFilename = (filename || key).replace(/["\r\n]/g, '');

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ResponseContentType: 'application/pdf',
    ResponseContentDisposition: `attachment; filename="${safeFilename}"`,
  });

  const signedUrl = await getSignedUrl(client, command, {
    expiresIn: expiresInSeconds,
  });

  return signedUrl;
}

/**
 * Check if a specific file key exists in the private R2 bucket.
 *
 * @param {string} key
 * @returns {Promise<boolean>}
 */
export async function checkR2ObjectExists(key) {
  const client = getR2Client();
  if (!client) return false;

  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: getBucketName(),
        Key: key,
      })
    );
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * List all objects currently in the paid products vault.
 *
 * @returns {Promise<Array<{ key: string, size: number, lastModified: Date }>>}
 */
export async function listVaultObjects() {
  const client = getR2Client();
  if (!client) {
    throw new Error('Cloudflare R2 client is not configured.');
  }

  const response = await client.send(
    new ListObjectsV2Command({
      Bucket: getBucketName(),
    })
  );

  return (response.Contents || []).map((item) => ({
    key: item.Key,
    size: item.Size,
    lastModified: item.LastModified,
  }));
}
