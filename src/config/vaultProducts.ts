/**
 * Complete 10-Product + Bundle R2 Cloudflare Vault Mapping
 * Direct high-speed asset CDN links hosted on vault.123thenextlevel.com
 */

export const VAULT_BASE = "https://vault.123thenextlevel.com";

export interface VaultProductEntry {
  title: string;
  url: string;
  key?: string;
}

export const PRODUCT_DOWNLOAD_MAP: Record<string, VaultProductEntry> = {
  // Bundles
  "suite-6-pillar": {
    title: "Complete 6-Pillar Master Suite (ZIP)",
    url: `${VAULT_BASE}/Complete_6_Pillar_Master_Suite-2026.zip`
  },
  "vault-9-book": {
    title: "Complete 9-Book Master Vault (ZIP)",
    url: `${VAULT_BASE}/Complete_9_Book_Master_Vault-2026.zip`
  },

  // Individual Master Guides
  "beginner-workout": {
    title: "Beginner Home Workout Guide",
    url: `${VAULT_BASE}/beginner-home-workout-guide.pdf`
  },
  "cortisol-stress": {
    title: "Cortisol & Stress Management Protocol",
    url: `${VAULT_BASE}/cortisol-stress-management-protocol.pdf`
  },
  "meal-planning": {
    title: "Master Meal Planning Guide",
    url: `${VAULT_BASE}/master-meal-planning-guide.pdf`
  },
  "daily-mobility": {
    title: "Daily Mobility and Recovery Guide",
    url: `${VAULT_BASE}/Daily_Mobility_and_Recovery-2026.pdf`
  },
  "deep-sleep": {
    title: "Deep Sleep Optimization Protocol",
    url: `${VAULT_BASE}/Deep_Sleep_Optimization-2026.pdf`
  },
  "fat-loss": {
    title: "Fat-Loss Nutrition Blueprint",
    url: `${VAULT_BASE}/Fat-Loss-Nutrition-Blueprint-2026.pdf`
  },
  "high-protein": {
    title: "High Protein Recipe Collection",
    url: `${VAULT_BASE}/High_Protein_Recipe_Collection-2026.pdf`
  },
  "hypertrophy-strength": {
    title: "Hypertrophy & Strength Protocol",
    url: `${VAULT_BASE}/Hypertrophy-Strength-Protocol-2026.pdf`
  },
  "mindfulness-workbook": {
    title: "Mindfulness and Habit Reset Workbook",
    url: `${VAULT_BASE}/Mindfulness_and_Habit_Reset_Workbook-2026.pdf`
  },
  "visceral-fat-protocol": {
    title: "12-Week Metabolic Re-Engineering Visceral Fat Protocol",
    url: `${VAULT_BASE}/the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf`
  },
  "next-level-lifespan": {
    title: "The Next Level Lifespan Blueprint",
    url: `${VAULT_BASE}/the-next-level-lifespan.pdf`
  }
};

export const PRODUCT_ALIASES: Record<string, string> = {
  // 6 Pillar Suite
  "suite-6-pillar": "suite-6-pillar",
  "all-six-master-guides": "suite-6-pillar",
  "all-6-master-guides": "suite-6-pillar",
  "g-bundle-6": "suite-6-pillar",

  // 9 / 10 Book Vault
  "vault-9-book": "vault-9-book",
  "all-nine-master-guides": "vault-9-book",
  "all-9-master-guides": "vault-9-book",
  "g-bundle-9": "vault-9-book",
  "bundle-complete-vault-10": "vault-9-book",
  "all-ten-master-guides": "vault-9-book",
  "all-10-master-guides": "vault-9-book",
  "g-bundle-10": "vault-9-book",

  // Beginner workout
  "beginner-workout": "beginner-workout",
  "beginner-home-workout": "beginner-workout",
  "beginner_home_workout": "beginner-workout",
  "workout-plan": "beginner-workout",
  "g-fit-1": "beginner-workout",

  // Cortisol & Stress
  "cortisol-stress": "cortisol-stress",
  "cortisol-stress-management": "cortisol-stress",
  "stress-management": "cortisol-stress",
  "g-wel-1": "cortisol-stress",

  // Meal planning
  "meal-planning": "meal-planning",
  "master-meal-planning": "meal-planning",
  "meal-planner": "meal-planning",
  "g-nut-1": "meal-planning",

  // Daily Mobility
  "daily-mobility": "daily-mobility",
  "mobility-recovery": "daily-mobility",
  "g-fit-3": "daily-mobility",

  // Deep sleep
  "deep-sleep": "deep-sleep",
  "sleep-optimization": "deep-sleep",
  "g-wel-2": "deep-sleep",

  // Fat loss
  "fat-loss": "fat-loss",
  "fat-loss-nutrition": "fat-loss",
  "fat-loss-blueprint": "fat-loss",
  "g-nut-2": "fat-loss",

  // High protein
  "high-protein": "high-protein",
  "high-protein-recipes": "high-protein",
  "g-nut-3": "high-protein",

  // Hypertrophy
  "hypertrophy-strength": "hypertrophy-strength",
  "strength-training-hypertrophy": "hypertrophy-strength",
  "g-fit-2": "hypertrophy-strength",

  // Mindfulness
  "mindfulness-workbook": "mindfulness-workbook",
  "mindfulness-habit-reset": "mindfulness-workbook",
  "habit-reset": "mindfulness-workbook",
  "g-wel-3": "mindfulness-workbook",

  // Visceral fat
  "visceral-fat-protocol": "visceral-fat-protocol",
  "metabolic-master-guide": "visceral-fat-protocol",
  "metabolic-visceral-fat-protocol": "visceral-fat-protocol",
  "g-met-1": "visceral-fat-protocol",

  // Next level lifespan
  "next-level-lifespan": "next-level-lifespan",
  "the-next-level-lifespan": "next-level-lifespan",
  "lifespan-blueprint": "next-level-lifespan",
  "g-epi-1": "next-level-lifespan"
};

/**
 * Resolves any product ID, key, alias or description to its canonical PRODUCT_DOWNLOAD_MAP entry
 */
export function matchProductDownload(keyOrText?: string | null): (VaultProductEntry & { key: string }) | null {
  if (!keyOrText) return null;
  const str = String(keyOrText).trim().toLowerCase();

  // 1. Direct key match
  if (PRODUCT_DOWNLOAD_MAP[str]) {
    return { key: str, ...PRODUCT_DOWNLOAD_MAP[str] };
  }

  // 2. Exact alias match
  const aliasMatch = PRODUCT_ALIASES[str];
  if (aliasMatch && PRODUCT_DOWNLOAD_MAP[aliasMatch]) {
    return { key: aliasMatch, ...PRODUCT_DOWNLOAD_MAP[aliasMatch] };
  }

  // 3. Match against title or URL filename
  for (const [key, product] of Object.entries(PRODUCT_DOWNLOAD_MAP)) {
    if (str === key.toLowerCase() || str.includes(key.toLowerCase()) || str.includes(product.title.toLowerCase()) || product.title.toLowerCase().includes(str)) {
      return { key, ...product };
    }
  }

  // 4. Semantic keyword fallbacks
  if (str.includes('visceral') || str.includes('metabolic')) return { key: 'visceral-fat-protocol', ...PRODUCT_DOWNLOAD_MAP['visceral-fat-protocol'] };
  if (str.includes('hypertrophy') || str.includes('strength')) return { key: 'hypertrophy-strength', ...PRODUCT_DOWNLOAD_MAP['hypertrophy-strength'] };
  if (str.includes('sleep')) return { key: 'deep-sleep', ...PRODUCT_DOWNLOAD_MAP['deep-sleep'] };
  if (str.includes('cortisol') || str.includes('stress')) return { key: 'cortisol-stress', ...PRODUCT_DOWNLOAD_MAP['cortisol-stress'] };
  if (str.includes('meal')) return { key: 'meal-planning', ...PRODUCT_DOWNLOAD_MAP['meal-planning'] };
  if (str.includes('fat')) return { key: 'fat-loss', ...PRODUCT_DOWNLOAD_MAP['fat-loss'] };
  if (str.includes('protein')) return { key: 'high-protein', ...PRODUCT_DOWNLOAD_MAP['high-protein'] };
  if (str.includes('mobility')) return { key: 'daily-mobility', ...PRODUCT_DOWNLOAD_MAP['daily-mobility'] };
  if (str.includes('mindfulness') || str.includes('habit')) return { key: 'mindfulness-workbook', ...PRODUCT_DOWNLOAD_MAP['mindfulness-workbook'] };
  if (str.includes('lifespan')) return { key: 'next-level-lifespan', ...PRODUCT_DOWNLOAD_MAP['next-level-lifespan'] };
  if (str.includes('6-pillar') || str.includes('six')) return { key: 'suite-6-pillar', ...PRODUCT_DOWNLOAD_MAP['suite-6-pillar'] };
  if (str.includes('9-book') || str.includes('nine') || str.includes('vault') || str.includes('10-guide')) return { key: 'vault-9-book', ...PRODUCT_DOWNLOAD_MAP['vault-9-book'] };
  if (str.includes('beginner') || str.includes('workout')) return { key: 'beginner-workout', ...PRODUCT_DOWNLOAD_MAP['beginner-workout'] };

  return null;
}
