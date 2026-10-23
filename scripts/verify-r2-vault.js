import 'dotenv/config';
import { isR2Configured, getBucketName, listVaultObjects, generatePresignedDownloadUrl } from '../server/services/r2.js';
import { products } from '../server/data/products.js';

async function main() {
  console.log('====================================================');
  console.log('🔒 Cloudflare R2 Vault Verification & Health Check');
  console.log('====================================================');

  if (!isR2Configured()) {
    console.error('❌ Cloudflare R2 is NOT fully configured in environment.');
    console.error('Please verify CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_PAID_BUCKET_NAME.');
    process.exit(1);
  }

  const bucket = getBucketName();
  console.log(`Bucket Name: ${bucket}`);
  console.log(`Account ID:  ${process.env.CLOUDFLARE_ACCOUNT_ID}`);

  try {
    const vaultObjects = await listVaultObjects();
    console.log(`\nFound ${vaultObjects.length} objects in vault:`);
    vaultObjects.forEach(obj => {
      console.log(` • ${obj.key} (${(obj.size / 1024 / 1024).toFixed(2)} MB)`);
    });

    console.log('\n--- Verifying Product Catalog Mappings ---');
    let verifiedCount = 0;
    const paidProducts = products.filter(p => p.r2Key);

    for (const product of paidProducts) {
      const match = vaultObjects.find(obj => obj.key === product.r2Key);
      if (!match) {
        console.error(`❌ Missing in R2: [${product.id}] ${product.title} -> ${product.r2Key}`);
        continue;
      }

      // Test generating presigned download URL
      const downloadFilename = product.downloadFilename || product.r2Key;
      const presignedUrl = await generatePresignedDownloadUrl({
        key: product.r2Key,
        filename: downloadFilename,
        expiresInSeconds: 300,
      });

      // Test HTTP response
      const res = await fetch(presignedUrl);
      if (res.ok) {
        console.log(`✅ [${product.id}] ${product.title}`);
        console.log(`   Key: ${product.r2Key}`);
        console.log(`   Filename: "${downloadFilename}"`);
        console.log(`   Size: ${(match.size / 1024 / 1024).toFixed(2)} MB | HTTP ${res.status} OK`);
        verifiedCount++;
      } else {
        console.error(`❌ [${product.id}] ${product.title} -> HTTP ${res.status} ${res.statusText}`);
      }
    }

    console.log('\n====================================================');
    console.log(`Summary: ${verifiedCount} / ${paidProducts.length} paid guides verified and downloadable!`);
    console.log('====================================================\n');
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

main();
