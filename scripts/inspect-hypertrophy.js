import 'dotenv/config';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
});

async function run() {
  const res = await s3.send(new GetObjectCommand({
    Bucket: 'paid-products-vault',
    Key: 'Hypertrophy-Strength-Protocol-2026.pdf'
  }));

  const chunks = [];
  for await (const chunk of res.Body) chunks.push(chunk);
  const buf = Buffer.concat(chunks);
  const str = buf.toString('latin1');
  const idx = str.indexOf('134 0 obj');
  console.log(str.slice(idx, idx + 400));
}

run();
