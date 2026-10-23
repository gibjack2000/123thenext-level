import { S3Client, GetObjectCommand, HeadObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * Cloudflare R2 Storage Service for Paid Products Vault
 * Securely generates temporary presigned URLs for digital PDF fulfillment.
 */

let s3ClientInstance = null;

export function getR2Client() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    return null;
  }

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
  return Boolean(
    process.env.CLOUDFLARE_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    (process.env.R2_PAID_BUCKET_NAME || 'paid-products-vault')
  );
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

  // Slug aliases
  'strength-training-hypertrophy': 'Hypertrophy-Strength-Protocol-2026.pdf',
  'mobility-recovery-routine': 'Daily_Mobility_and_Recovery-2026.pdf',
  'healthy-meal-planning-guide': 'The Master_Meal_Planning_Guide-2026.pdf',
  'fat-loss-nutrition-blueprint': 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'high-protein-recipe-collection': 'High_Protein_Recipe_Collection-2026.pdf',
  'stress-management-toolkit': 'Cortisol_&_Stress_Management-2026.pdf',
  'sleep-optimization-protocol': 'Deep_Sleep_Optimization-2026.pdf',
  'mindfulness-habit-reset': 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
};

export const GUIDE_FILE_KEYS = R2_GUIDE_FILE_KEYS;

export const R2_FRIENDLY_FILENAMES = {
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

/**
 * Generate a short-lived link (valid for 15 minutes / 900 seconds)
 * Match guideId to R2 key, defaulting to the exact guideId if not found
 *
 * @param {string} guideId
 * @param {number} [expiresIn=900] - Expiration in seconds (default: 15 minutes)
 * @returns {Promise<string>}
 */
export async function getPresignedDownloadUrl(guideId, expiresIn = 900) {
  const objectKey = R2_GUIDE_FILE_KEYS[guideId] || `${guideId}.pdf`;
  const client = getR2Client();

  if (!client) {
    throw new Error('Cloudflare R2 client is not configured. Check environment variables.');
  }

  const downloadFilename = R2_FRIENDLY_FILENAMES[objectKey] || objectKey;

  const command = new GetObjectCommand({
    Bucket: process.env.R2_PAID_BUCKET_NAME || 'paid-products-vault',
    Key: objectKey,
    ResponseContentType: 'application/pdf',
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
