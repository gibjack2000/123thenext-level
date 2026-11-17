import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { S3Client, GetObjectCommand, PutObjectCommand, CopyObjectCommand } from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "926138deb9acb5a8f59280cc710d0859";
const accessKeyId = process.env.R2_ACCESS_KEY_ID || "8d1bb4ee66d4dd2eb7c806dc608ba94c";
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || "122f0127550a144bb82b1a3a708842412b6b09f44da90e794c78fc5118214ebf";
const bucket = process.env.R2_PAID_BUCKET_NAME || 'paid-products-vault';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * The EXACT 10 Guides requested by the user:
 * 1. Mindfulness & Habit Reset Workbook
 * 2. Deep Sleep Optimization Protocol
 * 3. Cortisol & Stress Management
 * 4. High-Protein Recipe Collection
 * 5. The Fat Loss Nutrition Blueprint
 * 6. The Master Meal Planning Guide
 * 7. Daily Mobility & Recovery Routine
 * 8. Hypertrophy & Strength Protocol
 * 9. Beginner Home Workout Plan
 * 10. The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol
 */
const TARGET_GUIDES = [
  {
    r2Key: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
    zipFilename: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
    title: 'Mindfulness & Habit Reset Workbook'
  },
  {
    r2Key: 'Deep_Sleep_Optimization-2026.pdf',
    zipFilename: 'Deep_Sleep_Optimization-2026.pdf',
    title: 'Deep Sleep Optimization Protocol'
  },
  {
    r2Key: 'Cortisol_and_Stress_Management-2026.pdf',
    zipFilename: 'Cortisol_&_Stress_Management-2026.pdf',
    title: 'Cortisol & Stress Management'
  },
  {
    r2Key: 'High_Protein_Recipe_Collection-2026.pdf',
    zipFilename: 'High_Protein_Recipe_Collection-2026.pdf',
    title: 'High-Protein Recipe Collection'
  },
  {
    r2Key: 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
    zipFilename: 'Fat-Loss-Nutrition-Blueprint-2026.pdf',
    title: 'The Fat Loss Nutrition Blueprint'
  },
  {
    r2Key: 'The Master_Meal_Planning_Guide-2026.pdf',
    zipFilename: 'The Master_Meal_Planning_Guide-2026.pdf',
    title: 'The Master Meal Planning Guide'
  },
  {
    r2Key: 'Daily_Mobility_and_Recovery-2026.pdf',
    zipFilename: 'Daily_Mobility_and_Recovery-2026.pdf',
    title: 'Daily Mobility & Recovery Routine'
  },
  {
    r2Key: 'Hypertrophy-Strength-Protocol-2026.pdf',
    zipFilename: 'Hypertrophy-Strength-Protocol-2026.pdf',
    title: 'Hypertrophy & Strength Protocol'
  },
  {
    r2Key: 'beginner_home_workout-2026.pdf',
    zipFilename: 'beginner_home_workout-2026.pdf',
    title: 'Beginner Home Workout Plan'
  },
  {
    r2Key: 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
    zipFilename: 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
    title: 'The 12-Week Metabolic Re-Engineering & Visceral Fat Protocol'
  }
];

async function downloadR2File(key) {
  const res = await s3.send(new GetObjectCommand({
    Bucket: bucket,
    Key: key
  }));
  const chunks = [];
  for await (const chunk of res.Body) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function uploadR2File(key, buffer, contentType = 'application/zip') {
  console.log(`Uploading ${key} (${(buffer.length / 1024 / 1024).toFixed(2)} MB) to R2 bucket: ${bucket}...`);
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }));
  console.log(`✅ Uploaded ${key} successfully!`);
}

async function main() {
  console.log('========================================================');
  console.log('📦 Rebuilding Complete 10-Guide Master Vault ZIP Archive');
  console.log('========================================================\n');

  const stagingDir = path.join(rootDir, 'scratch/vault_10_staging');
  if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
  fs.mkdirSync(stagingDir, { recursive: true });

  console.log(`Downloading all 10 authoritative PDFs directly from R2 bucket [${bucket}]...`);
  
  for (let i = 0; i < TARGET_GUIDES.length; i++) {
    const item = TARGET_GUIDES[i];
    console.log(`\n[${i + 1}/10] Fetching ${item.title}...`);
    console.log(`      Source R2 Key: ${item.r2Key}`);

    let buffer;
    try {
      buffer = await downloadR2File(item.r2Key);
      console.log(`      Downloaded: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
    } catch (err) {
      console.error(`      ❌ Error downloading from R2 (${item.r2Key}):`, err.message);
      // Fallback check protected-files
      const localFallback = path.join(rootDir, 'protected-files/pdfs', item.zipFilename);
      if (fs.existsSync(localFallback)) {
        console.log(`      Using local fallback: ${localFallback}`);
        buffer = fs.readFileSync(localFallback);
      } else {
        throw new Error(`Cannot locate PDF for ${item.title}`);
      }
    }

    // Verify it is a valid PDF
    const header = buffer.subarray(0, 5).toString('ascii');
    if (!header.startsWith('%PDF')) {
      throw new Error(`File ${item.r2Key} does not appear to be a valid PDF (header: ${header})`);
    }

    const destPath = path.join(stagingDir, item.zipFilename);
    fs.writeFileSync(destPath, buffer);
    console.log(`      Staged as: ${item.zipFilename}`);
  }

  // Also ensure Cortisol_&_Stress_Management-2026.pdf exists in R2 if needed
  try {
    console.log('\nEnsuring Cortisol_&_Stress_Management-2026.pdf alias exists in R2...');
    const cortisolBuf = fs.readFileSync(path.join(stagingDir, 'Cortisol_&_Stress_Management-2026.pdf'));
    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: 'Cortisol_&_Stress_Management-2026.pdf',
      Body: cortisolBuf,
      ContentType: 'application/pdf',
    }));
    console.log('✅ Cortisol_&_Stress_Management-2026.pdf confirmed in R2');
  } catch (err) {
    console.warn('Note on Cortisol alias:', err.message);
  }

  // Also ensure The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf alias exists in R2
  try {
    console.log('Ensuring The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf alias exists in R2...');
    const metabolicBuf = fs.readFileSync(path.join(stagingDir, 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf'));
    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: 'The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf',
      Body: metabolicBuf,
      ContentType: 'application/pdf',
    }));
    console.log('✅ The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf confirmed in R2');
  } catch (err) {
    console.warn('Note on Metabolic alias:', err.message);
  }

  // Create ZIP archive using Windows tar / zip command
  const zipTempOut = path.join(rootDir, 'scratch/all-ten-master-guides.zip');
  if (fs.existsSync(zipTempOut)) fs.unlinkSync(zipTempOut);

  console.log('\nCompressing 10 guides into master ZIP archive...');
  execSync(`tar -a -c -f "${zipTempOut}" -C "${stagingDir}" *`);

  const zipStat = fs.statSync(zipTempOut);
  console.log(`✅ Master ZIP created! Size: ${(zipStat.size / 1024 / 1024).toFixed(2)} MB`);

  const zipBuffer = fs.readFileSync(zipTempOut);

  // Upload to R2 under all canonical bundle keys
  console.log('\n--- Uploading ZIP to Cloudflare R2 [paid-products-vault] ---');
  await uploadR2File('all-ten-master-guides.zip', zipBuffer);
  await uploadR2File('Complete_10_Book_Master_Vault-2026.zip', zipBuffer);
  await uploadR2File('Complete_9_Book_Master_Vault-2026.zip', zipBuffer); // Overwrite old 9-book vault so all links get all 10 books!

  // Save to local directories for fallback
  console.log('\n--- Syncing local fallback copies ---');
  const localDestinations = [
    'protected-files/pdfs/all-ten-master-guides.zip',
    'protected-files/pdfs/Complete_10_Book_Master_Vault-2026.zip',
    'protected-files/pdfs/Complete_9_Book_Master_Vault-2026.zip',
    'public/assets/docs/all-ten-master-guides.zip',
    'public/assets/docs/Complete_10_Book_Master_Vault-2026.zip',
    'public/assets/docs/Complete_9_Book_Master_Vault-2026.zip',
    'public/docs/all-ten-master-guides.zip',
    'public/docs/Complete_10_Book_Master_Vault-2026.zip',
    'public/docs/Complete_9_Book_Master_Vault-2026.zip'
  ];

  for (const relDest of localDestinations) {
    const fullDest = path.join(rootDir, relDest);
    const dir = path.dirname(fullDest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(zipTempOut, fullDest);
    console.log(` • Copied to ${relDest}`);
  }

  // Clean staging
  fs.rmSync(stagingDir, { recursive: true, force: true });
  fs.unlinkSync(zipTempOut);

  console.log('\n========================================================');
  console.log('🎉 10-Guide Vault ZIP creation & R2 upload completed!');
  console.log('========================================================\n');
}

main().catch(err => {
  console.error('❌ Fatal error in build-and-upload-10-vault:', err);
  process.exit(1);
});
