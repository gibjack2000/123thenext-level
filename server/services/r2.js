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

// File Key Mapping inside 'paid-products-vault/'
export const GUIDE_FILE_KEYS = {
  // Direct requested keys
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
  'g-wel-3': 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',

  // Slug aliases
  'beginner-home-workout-plan': 'beginner-home-workout-guide.pdf',
  'strength-training-hypertrophy': 'Hypertrophy-Strength-Protocol-2026.pdf',
  'mobility-recovery-routine': 'Daily_Mobility_and_Recovery-2026.pdf',
  'healthy-meal-planning-guide': 'master-meal-planning-guide.pdf',
  'fat-loss-nutrition-blueprint': 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'high-protein-recipe-collection': 'High_Protein_Recipe_Collection-2026.pdf',
  'stress-management-toolkit': 'cortisol-stress-management-protocol.pdf',
  'sleep-optimization-protocol': 'Deep_Sleep_Optimization-2026.pdf',
  'mindfulness-habit-reset': 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
};

/**
 * Generate a short-lived link (valid for 15 minutes / 900 seconds by default)
 * for a guide by ID or slug.
 *
 * @param {string} guideId
 * @param {number} [expiresIn=900] - Expiration in seconds (default: 15 minutes)
 * @returns {Promise<string>}
 */
export async function generateGuidePresignedUrl(guideId, expiresIn = 900) {
  const fileKey = GUIDE_FILE_KEYS[guideId] || `${guideId}.pdf`;
  const client = getR2Client();

  if (!client) {
    throw new Error('Cloudflare R2 client is not configured. Check environment variables.');
  }

  const command = new GetObjectCommand({
    Bucket: process.env.R2_PAID_BUCKET_NAME || 'paid-products-vault',
    Key: fileKey,
  });

  // Generate a short-lived link (valid for 15 minutes / 900 seconds)
  const presignedUrl = await getSignedUrl(client, command, { expiresIn });
  return presignedUrl;
}

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
