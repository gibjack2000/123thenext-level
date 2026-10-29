import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Stripe from 'stripe';
import { GUIDE_PRODUCTS, resolveGuideProduct } from '../data/guide-registry';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID || '926138deb9acb5a8f59280cc710d0859'}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '8d1bb4ee66d4dd2eb7c806dc608ba94c',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '122f0127550a144bb82b1a3a708842412b6b09f44da90e794c78fc5118214ebf'
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
  'hypertrophy-strength': 'Hypertrophy-Strength-Protocol-2026.pdf',
  'mobility-recovery': 'Daily_Mobility_and_Recovery-2026.pdf',
  'fat-loss-blueprint': 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'high-protein-recipes': 'High_Protein_Recipe_Collection-2026.pdf',
  'sleep-optimization': 'Deep_Sleep_Optimization-2026.pdf',
  'habit-reset': 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
  'lifespan-blueprint': 'the-next-level-lifespan.pdf',
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
  'g-bundle-9-zip': 'Complete_9_Book_Master_Vault-2026.zip',

  // 1-Click ZIP Bundle for Complete 10-Guide Master Vault
  'Complete_10_Book_Master_Vault-2026.zip': 'all-ten-master-guides.zip',
  'all-ten-master-guides': 'all-ten-master-guides.zip',
  'all-10-master-guides': 'all-ten-master-guides.zip',
  'bundle-complete-vault-10': 'all-ten-master-guides.zip',
  'g-bundle-10': 'all-ten-master-guides.zip',
  'bundle-pick-3': 'Complete_6_Pillar_Master_Suite-2026.zip',

  // Metabolic Master Guide
  'metabolic-master-guide': 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
  'metabolic-visceral-fat-protocol': 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
  'visceral-fat-protocol': 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
  'g-met-1': 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
  'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf': 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
  'The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf': 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
  'The_12_Week_Metabolic_ReEngineering_Protocol.pdf': 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf'
};

export async function getPresignedDownloadUrl(guideId: string): Promise<string> {
  // Match guideId to R2 key, defaulting to the exact guideId if not found
  let objectKey = R2_GUIDE_FILE_KEYS[guideId];
  if (!objectKey) {
    if (guideId.endsWith('.zip') || guideId.endsWith('.pdf')) {
      objectKey = guideId;
    } else {
      objectKey = `${guideId}.pdf`;
    }
  }
  const downloadFilename = objectKey;
  const isZip = objectKey.endsWith('.zip');
  const contentType = isZip ? 'application/zip' : 'application/pdf';

  const command = new GetObjectCommand({
    Bucket: process.env.R2_PAID_BUCKET_NAME || 'paid-products-vault',
    Key: objectKey,
    ResponseContentType: contentType,
    ResponseContentDisposition: `attachment; filename="${downloadFilename}"`
  });

  // Generates 15-minute temporary presigned download link
  return await getSignedUrl(s3Client, command, { expiresIn: 900 });
}

export async function handleGetPresignedGuide(req: Request): Promise<Response> {
  try {
    const { sessionId, guideId } = await req.json();

    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Session ID required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1. Verify payment status directly with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return new Response(JSON.stringify({ error: 'Payment not completed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Identify the target file key inside 'paid-products-vault'
    const guide = resolveGuideProduct(guideId) || resolveGuideProduct(session.metadata?.guideId || '');
    const r2FileKey = guide ? guide.r2FileKey : session.metadata?.r2FileKey;

    if (!r2FileKey) {
      return new Response(JSON.stringify({ error: 'Guide file mapping missing' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. Generate short-lived presigned URL (valid for 15 minutes / 900 seconds)
    const command = new GetObjectCommand({
      Bucket: process.env.R2_PAID_BUCKET_NAME || 'paid-products-vault',
      Key: r2FileKey,
    });

    const downloadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

    return new Response(JSON.stringify({ downloadUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('[API get-presigned-guide] Error:', error.message);
    return new Response(JSON.stringify({ error: 'Verification failed: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
