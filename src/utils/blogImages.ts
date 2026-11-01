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

/**
 * Updates or injects YAML frontmatter (featured_image: and featured_image_alt:) into article markdown/HTML content
 */
export function updateArticleFrontmatter(content: string, imageUrl: string, altText?: string): string {
  const safeAlt = (altText || 'Featured Article Visual').replace(/['"]/g, '');
  const frontmatterBlock = [
    '---',
    `featured_image: '${imageUrl}'`,
    `featured_image_alt: '${safeAlt}'`,
    '---'
  ].join('\n');

  if (/^---\r?\n[\s\S]*?\r?\n---/.test(content)) {
    const existingFm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    let fmBody = existingFm ? existingFm[1] : '';

    if (/featured_image:/i.test(fmBody)) {
      fmBody = fmBody.replace(/featured_image:.*$/m, `featured_image: '${imageUrl}'`);
    } else {
      fmBody += `\nfeatured_image: '${imageUrl}'`;
    }

    if (/featured_image_alt:/i.test(fmBody)) {
      fmBody = fmBody.replace(/featured_image_alt:.*$/m, `featured_image_alt: '${safeAlt}'`);
    } else {
      fmBody += `\nfeatured_image_alt: '${safeAlt}'`;
    }

    return content.replace(/^---\r?\n[\s\S]*?\r?\n---/, `---\n${fmBody.trim()}\n---`);
  }

  return `${frontmatterBlock}\n\n${content.trim()}`;
}

/**
 * Extracts frontmatter key-values from article content
 */
export function extractFrontmatter(content: string): { featured_image?: string; featured_image_alt?: string } {
  if (!content) return {};
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const lines = match[1].split('\n');
  const result: { featured_image?: string; featured_image_alt?: string } = {};
  for (const line of lines) {
    const imgMatch = line.match(/^featured_image:\s*['"]?([^'"\r\n]+)['"]?/i);
    if (imgMatch) result.featured_image = imgMatch[1].trim();
    const altMatch = line.match(/^featured_image_alt:\s*['"]?([^'"\r\n]+)['"]?/i);
    if (altMatch) result.featured_image_alt = altMatch[1].trim();
  }
  return result;
}

