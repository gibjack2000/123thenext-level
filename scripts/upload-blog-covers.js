import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const imageMappings = [
  {
    name: 'performance_biodata_cover.png',
    source: path.resolve('public', 'covers', 'performance_biodata_cover.png'),
    category: 'Performance & Biodata'
  },
  {
    name: 'healthspan_longevity_cover.png',
    source: path.resolve('public', 'covers', 'healthspan_longevity_cover.png'),
    category: 'Healthspan & Longevity'
  },
  {
    name: 'metabolic_nutrition_cover.png',
    source: path.resolve('public', 'covers', 'metabolic_nutrition_cover.png'),
    category: 'Metabolic Nutrition'
  },
  {
    name: 'autonomic_engineering_cover.png',
    source: path.resolve('public', 'covers', 'autonomic_engineering_cover.png'),
    category: 'Autonomic Engineering'
  },
  {
    name: 'womens_health_cover.png',
    source: path.resolve('public', 'covers', 'womens_health_cover.png'),
    category: "Women's Health & Hormonal Vitality"
  },
  {
    name: 'socio_architecture_cover.png',
    source: path.resolve('public', 'covers', 'socio_architecture_cover.png'),
    category: 'Socio-Architecture & Bio-Networks'
  }
];


async function main() {
  console.log('--- 1. Ensuring public storage bucket "blog-covers" exists ---');
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    console.error('Error listing buckets:', listError);
    process.exit(1);
  }

  const bucketExists = buckets.some(b => b.name === 'blog-covers');
  if (!bucketExists) {
    console.log('Creating bucket "blog-covers" with public: true...');
    const { data: createData, error: createError } = await supabase.storage.createBucket('blog-covers', {
      public: true,
      fileSizeLimit: 20971520, // 20MB
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
    });
    if (createError) {
      console.error('Failed to create bucket:', createError);
      process.exit(1);
    }
    console.log('Bucket "blog-covers" created successfully!');
  } else {
    console.log('Bucket "blog-covers" already exists.');
    // Ensure it is public
    await supabase.storage.updateBucket('blog-covers', { public: true });
  }

  // Create local folder public/covers if it does not exist
  const localCoversDir = path.resolve('public', 'covers');
  if (!fs.existsSync(localCoversDir)) {
    fs.mkdirSync(localCoversDir, { recursive: true });
  }

  console.log('\n--- 2. Uploading 6 Category Headline Images ---');
  const results = [];

  for (const item of imageMappings) {
    if (!fs.existsSync(item.source)) {
      console.error(`Source file not found: ${item.source}`);
      continue;
    }

    const localDest = path.join(localCoversDir, item.name);
    fs.copyFileSync(item.source, localDest);
    console.log(`Saved local copy to ${localDest}`);

    const fileBuffer = fs.readFileSync(item.source);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('blog-covers')
      .upload(item.name, fileBuffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error(`Upload error for ${item.name}:`, uploadError);
      continue;
    }

    const { data: urlData } = supabase.storage
      .from('blog-covers')
      .getPublicUrl(item.name);

    console.log(`Uploaded ${item.name} -> ${urlData.publicUrl}`);

    results.push({
      category: item.category,
      filename: item.name,
      publicUrl: urlData.publicUrl
    });
  }

  console.log('\n--- 3. Upload Summary & Public CDN URLs ---');
  console.table(results);
}

main().catch(console.error);
