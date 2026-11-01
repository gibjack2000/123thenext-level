// =========================================================================
// BLOG FEATURED IMAGES & CATEGORY BANNER FALLBACK REGISTRY
// Dark-mode palette: #111827 (slate-900 / dark charcoal) & #10b981 (emerald accent)
// =========================================================================

export interface CategoryBannerMeta {
  url: string;
  alt: string;
  label: string;
  tag: string;
  accentHex: string;
}

export const CATEGORY_DEFAULT_BANNERS: Record<string, CategoryBannerMeta> = {
  health: {
    url: '/assets/images/blog/healthspan_longevity_cover.png',
    alt: 'Healthspan Intelligence & Preventive Biomarker Map',
    label: 'Healthspan Intelligence',
    tag: 'HEALTHSPAN',
    accentHex: '#10b981'
  },
  fitness: {
    url: '/assets/images/blog/performance_biodata_cover.png',
    alt: 'Performance Protocols & Autonomic Muscular Loading',
    label: 'Performance Protocols',
    tag: 'PERFORMANCE',
    accentHex: '#06b6d4'
  },
  nutrition: {
    url: '/assets/images/blog/metabolic_nutrition_cover.png',
    alt: 'Metabolic Intelligence & Glycemic Energy Architecture',
    label: 'Metabolic Intelligence',
    tag: 'METABOLIC',
    accentHex: '#f59e0b'
  },
  wellness: {
    url: '/assets/images/blog/autonomic_engineering_cover.png',
    alt: 'Neurowellness Research & Autonomic Stress Reset',
    label: 'Neurowellness Research',
    tag: 'NEUROWELLNESS',
    accentHex: '#8b5cf6'
  }
};

/**
 * Returns the canonical dark-mode fallback banner for a blog category
 */
export function getCategoryDefaultBanner(category?: string): string {
  const catKey = (category || 'health').toLowerCase();
  if (catKey.includes('fit') || catKey.includes('exercise')) return CATEGORY_DEFAULT_BANNERS.fitness.url;
  if (catKey.includes('nutri') || catKey.includes('diet') || catKey.includes('food')) return CATEGORY_DEFAULT_BANNERS.nutrition.url;
  if (catKey.includes('well') || catKey.includes('neuro') || catKey.includes('sleep') || catKey.includes('mind')) return CATEGORY_DEFAULT_BANNERS.wellness.url;
  return CATEGORY_DEFAULT_BANNERS.health.url;
}

/**
 * Returns the default alt text for an image
 */
export function getCategoryDefaultAlt(category?: string, title?: string): string {
  if (title) return `${title} | 123TheNextLevel Clinical Protocol`;
  const catKey = (category || 'health').toLowerCase();
  if (catKey.includes('fit')) return CATEGORY_DEFAULT_BANNERS.fitness.alt;
  if (catKey.includes('nutri')) return CATEGORY_DEFAULT_BANNERS.nutrition.alt;
  if (catKey.includes('well')) return CATEGORY_DEFAULT_BANNERS.wellness.alt;
  return CATEGORY_DEFAULT_BANNERS.health.alt;
}

export interface RegionalProductItem {
  name: string;
  asin_or_sku: string;
  rating: string;
  reviews: string;
  market_price: string;
  url: string;
}

export interface ArticleFrontmatter {
  title?: string;
  slug?: string;
  date?: string;
  category?: 'health' | 'fitness' | 'nutrition' | 'wellness' | string;
  status?: string;
  published?: boolean;
  author?: string;
  featured_image?: string;
  featured_image_alt?: string;
  parent_guide?: string;
  infographic_banner_url?: string;
  infographic_banner_alt?: string;
  products?: {
    us?: RegionalProductItem;
    uk?: RegionalProductItem;
    es?: RegionalProductItem;
  };
}

/**
 * Serializes a frontmatter object into strict, standard YAML frontmatter
 */
export function buildFrontmatterYaml(fm: ArticleFrontmatter): string {
  const lines: string[] = ['---'];

  if (fm.title) lines.push(`title: "${fm.title.replace(/"/g, '\\"')}"`);
  if (fm.slug) lines.push(`slug: "${fm.slug}"`);
  if (fm.date) lines.push(`date: "${fm.date}"`);
  if (fm.category) lines.push(`category: "${fm.category.toLowerCase()}"`);
  lines.push(`status: "${fm.status || 'pending_approval'}"`);
  lines.push(`published: ${fm.published === true ? 'true' : 'false'}`);
  lines.push(`author: "${fm.author || '123TheNextLevel Clinical Advisory'}"`);
  
  if (fm.featured_image) lines.push(`featured_image: "${fm.featured_image}"`);
  if (fm.featured_image_alt) lines.push(`featured_image_alt: "${fm.featured_image_alt.replace(/"/g, '\\"')}"`);
  if (fm.parent_guide) lines.push(`parent_guide: "${fm.parent_guide}"`);
  if (fm.infographic_banner_url) lines.push(`infographic_banner_url: "${fm.infographic_banner_url}"`);
  if (fm.infographic_banner_alt) lines.push(`infographic_banner_alt: "${fm.infographic_banner_alt.replace(/"/g, '\\"')}"`);

  if (fm.products && (fm.products.us || fm.products.uk || fm.products.es)) {
    lines.push('products:');
    if (fm.products.us) {
      lines.push('  us:');
      lines.push(`    name: "${fm.products.us.name.replace(/"/g, '\\"')}"`);
      lines.push(`    asin_or_sku: "${fm.products.us.asin_or_sku}"`);
      lines.push(`    rating: "${fm.products.us.rating || '4.8'}"`);
      lines.push(`    reviews: "${fm.products.us.reviews || '12k+'}"`);
      lines.push(`    market_price: "${fm.products.us.market_price || '$34.95'}"`);
      lines.push(`    url: "${fm.products.us.url}"`);
    }
    if (fm.products.uk) {
      lines.push('  uk:');
      lines.push(`    name: "${fm.products.uk.name.replace(/"/g, '\\"')}"`);
      lines.push(`    asin_or_sku: "${fm.products.uk.asin_or_sku}"`);
      lines.push(`    rating: "${fm.products.uk.rating || '4.9'}"`);
      lines.push(`    reviews: "${fm.products.uk.reviews || '3.5k+'}"`);
      lines.push(`    market_price: "${fm.products.uk.market_price || '£29.99'}"`);
      lines.push(`    url: "${fm.products.uk.url}"`);
    }
    if (fm.products.es) {
      lines.push('  es:');
      lines.push(`    name: "${fm.products.es.name.replace(/"/g, '\\"')}"`);
      lines.push(`    asin_or_sku: "${fm.products.es.asin_or_sku}"`);
      lines.push(`    rating: "${fm.products.es.rating || '4.8'}"`);
      lines.push(`    reviews: "${fm.products.es.reviews || '1.8k+'}"`);
      lines.push(`    market_price: "${fm.products.es.market_price || '€32.50'}"`);
      lines.push(`    url: "${fm.products.es.url}"`);
    }
  }

  lines.push('---');
  return lines.join('\n');
}

/**
 * Updates or injects YAML frontmatter into article markdown/HTML content
 * Preserves all existing fields including title, slug, parent_guide, and regional products.
 */
export function updateArticleFrontmatter(
  content: string,
  imageUrl: string,
  altText?: string,
  infographicUrl?: string,
  infographicAlt?: string,
  additionalFm?: Partial<ArticleFrontmatter>
): string {
  const existingFm = extractFrontmatter(content);
  
  const updatedFm: ArticleFrontmatter = {
    ...existingFm,
    ...additionalFm,
    featured_image: imageUrl || existingFm.featured_image || '',
    featured_image_alt: altText || existingFm.featured_image_alt || 'Featured Article Visual',
    infographic_banner_url: infographicUrl !== undefined ? infographicUrl : (existingFm.infographic_banner_url || ''),
    infographic_banner_alt: (infographicAlt || existingFm.infographic_banner_alt || 'Visual Infographic Guide').replace(/['"]/g, '')
  };

  const frontmatterBlock = buildFrontmatterYaml(updatedFm);

  if (/^---\r?\n[\s\S]*?\r?\n---/.test(content)) {
    return content.replace(/^---\r?\n[\s\S]*?\r?\n---/, frontmatterBlock);
  }

  return `${frontmatterBlock}\n\n${content.trim()}`;
}

/**
 * Extracts frontmatter key-values including nested regional products from article content
 */
export function extractFrontmatter(content: string): ArticleFrontmatter {
  if (!content) return {};
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  
  const rawYaml = match[1];
  const lines = rawYaml.split(/\r?\n/);
  const result: ArticleFrontmatter = {};
  
  let currentProductRegion: 'us' | 'uk' | 'es' | null = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Check nested products structure
    if (/^products:\s*$/i.test(trimmed)) {
      result.products = result.products || {};
      continue;
    }

    if (/^  (us|uk|es):\s*$/i.test(rawLine) || /^ {2,4}(us|uk|es):\s*$/i.test(rawLine)) {
      const regMatch = rawLine.match(/(us|uk|es)/i);
      if (regMatch) {
        currentProductRegion = regMatch[1].toLowerCase() as 'us' | 'uk' | 'es';
        result.products = result.products || {};
        result.products[currentProductRegion] = result.products[currentProductRegion] || {
          name: '',
          asin_or_sku: '',
          rating: '4.8',
          reviews: '1.2k+',
          market_price: '$29.99',
          url: ''
        };
      }
      continue;
    }

    if (currentProductRegion && (rawLine.startsWith('    ') || rawLine.startsWith('\t\t') || rawLine.startsWith('  '))) {
      const pMatch = trimmed.match(/^([a-z_]+):\s*['"]?([\s\S]*?)['"]?$/i);
      if (pMatch && result.products && result.products[currentProductRegion]) {
        const key = pMatch[1].toLowerCase();
        const val = pMatch[2].replace(/^['"]|['"]$/g, '').trim();
        (result.products[currentProductRegion] as any)[key] = val;
      }
      continue;
    } else if (!rawLine.startsWith(' ') && !rawLine.startsWith('\t')) {
      currentProductRegion = null;
    }

    // Top level keys
    const topMatch = trimmed.match(/^([a-z_]+):\s*['"]?([\s\S]*?)['"]?$/i);
    if (topMatch) {
      const key = topMatch[1].toLowerCase();
      let val = topMatch[2].replace(/^['"]|['"]$/g, '').trim();

      if (key === 'title') result.title = val;
      else if (key === 'slug') result.slug = val;
      else if (key === 'date') result.date = val;
      else if (key === 'category') result.category = val.toLowerCase();
      else if (key === 'status') result.status = val;
      else if (key === 'published') result.published = val === 'true';
      else if (key === 'author') result.author = val;
      else if (key === 'featured_image') result.featured_image = val;
      else if (key === 'featured_image_alt') result.featured_image_alt = val;
      else if (key === 'parent_guide') result.parent_guide = val;
      else if (key === 'infographic_banner_url') result.infographic_banner_url = val;
      else if (key === 'infographic_banner_alt') result.infographic_banner_alt = val;
    }
  }

  return result;
}

