import { useState, useEffect } from 'react';

export const ADMIN_AUTH_STORAGE_KEY = 'admin_session_authenticated';
export const PAYWALL_BYPASS_STORAGE_KEY = 'admin_paywall_bypass_active';
export const PAYWALL_BYPASS_EVENT_KEY = 'paywall_bypass_updated';

// Map of canonical guide IDs, product codes, and slugs to direct Cloudflare R2 presigned download streams
export const GUIDE_PDF_MAP: Record<string, string> = {
  // 1. Metabolic Protocol (Cloudflare R2 Vault: the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf)
  'metabolic-master-guide': '/api/download/guide/the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
  'metabolic-visceral-fat-protocol': '/api/download/guide/the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
  'visceral-fat-protocol': '/api/download/guide/the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
  'g-met-1': '/api/download/guide/the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
  '12-Week_Metabolic_Re-Engineering_Protocol.pdf': '/api/download/guide/the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
  'The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf': '/api/download/guide/the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',
  'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf': '/api/download/guide/the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf',

  // 2. Beginner Home Workout
  'beginner-home-workout': '/api/download/guide/beginner-home-workout',
  'beginner-home-workout-plan': '/api/download/guide/beginner-home-workout',
  'workout-plan': '/api/download/guide/beginner-home-workout',
  'g-fit-1': '/api/download/guide/beginner-home-workout',
  'beginner_home_workout-2026.pdf': '/api/download/guide/beginner-home-workout',
  'beginner_home_workout_v1.pdf': '/api/download/guide/beginner-home-workout',

  // 3. Hypertrophy & Strength
  'hypertrophy-strength': '/api/download/guide/hypertrophy-strength',
  'strength-training-hypertrophy': '/api/download/guide/hypertrophy-strength',
  'g-fit-2': '/api/download/guide/hypertrophy-strength',
  'Hypertrophy-Strength-Protocol-2026.pdf': '/api/download/guide/hypertrophy-strength',
  'hypertrophy_protocol_v1.pdf': '/api/download/guide/hypertrophy-strength',

  // 4. Mobility & Recovery
  'mobility-recovery': '/api/download/guide/mobility-recovery',
  'mobility-recovery-routine': '/api/download/guide/mobility-recovery',
  'g-fit-3': '/api/download/guide/mobility-recovery',
  'Daily_Mobility_and_Recovery-2026.pdf': '/api/download/guide/mobility-recovery',
  'daily_mobility_v1.pdf': '/api/download/guide/mobility-recovery',

  // 5. Master Meal Planning
  'master-meal-planning': '/api/download/guide/master-meal-planning',
  'healthy-meal-planning-guide': '/api/download/guide/master-meal-planning',
  'meal-planner': '/api/download/guide/master-meal-planning',
  'g-nut-1': '/api/download/guide/master-meal-planning',
  'The Master_Meal_Planning_Guide-2026.pdf': '/api/download/guide/master-meal-planning',
  'the_master_meal_planning_guide.pdf': '/api/download/guide/master-meal-planning',

  // 6. Fat Loss Nutrition
  'fat-loss-nutrition': '/api/download/guide/fat-loss-nutrition-blueprint',
  'fat-loss-nutrition-blueprint': '/api/download/guide/fat-loss-nutrition-blueprint',
  'fat-loss-blueprint': '/api/download/guide/fat-loss-nutrition-blueprint',
  'g-nut-2': '/api/download/guide/fat-loss-nutrition-blueprint',
  'Fat-Loss-Nutrition-Blueprint-2026.pdf': '/api/download/guide/fat-loss-nutrition-blueprint',
  'fat-loss-nutrition-blueprint.pdf': '/api/download/guide/fat-loss-nutrition-blueprint',
  'fat_loss_blueprint.pdf': '/api/download/guide/fat-loss-nutrition-blueprint',

  // 7. High-Protein Recipes
  'high-protein-recipes': '/api/download/guide/high-protein-recipes',
  'high-protein-recipe-collection': '/api/download/guide/high-protein-recipes',
  'g-nut-3': '/api/download/guide/high-protein-recipes',
  'High_Protein_Recipe_Collection-2026.pdf': '/api/download/guide/high-protein-recipes',
  'high_protein_recipes.pdf': '/api/download/guide/high-protein-recipes',

  // 8. Cortisol & Stress Management
  'cortisol-stress-management': '/api/download/guide/cortisol-stress-management',
  'stress-management-toolkit': '/api/download/guide/cortisol-stress-management',
  'stress-management': '/api/download/guide/cortisol-stress-management',
  'g-wel-1': '/api/download/guide/cortisol-stress-management',
  'Cortisol_&_Stress_Management-2026.pdf': '/api/download/guide/cortisol-stress-management',
  'stress-management-toolkit.pdf': '/api/download/guide/cortisol-stress-management',

  // 9. Deep Sleep Optimization
  'sleep-optimization': '/api/download/guide/sleep-optimization',
  'sleep-optimization-protocol': '/api/download/guide/sleep-optimization',
  'g-wel-2': '/api/download/guide/sleep-optimization',
  'Deep_Sleep_Optimization-2026.pdf': '/api/download/guide/sleep-optimization',
  'sleep_optimization.pdf': '/api/download/guide/sleep-optimization',

  // 10. Mindfulness & Habit Reset
  'mindfulness-habit-reset': '/api/download/guide/mindfulness-habit-reset',
  'habit-reset': '/api/download/guide/mindfulness-habit-reset',
  'g-wel-3': '/api/download/guide/mindfulness-habit-reset',
  'Mindfulness_and_Habit_Reset_Workbook-2026.pdf': '/api/download/guide/mindfulness-habit-reset',
  'habit_reset_workbook.pdf': '/api/download/guide/mindfulness-habit-reset',

  // Lifespan Blueprint
  'the-next-level-lifespan': '/api/download/guide/the-next-level-lifespan',
  'g-epi-1': '/api/download/guide/the-next-level-lifespan',
  'the-next-level-lifespan.pdf': '/api/download/guide/the-next-level-lifespan',

  // Diagnostic guide
  'phase1-diagnostic-guide': '/assets/docs/phase1-diagnostic-guide.pdf',

  // Bundles & ZIP Archives
  'bundle-pick-3': '/api/download/guide/Complete_6_Pillar_Master_Suite-2026.zip',
  'bundle-complete-vault-10': '/api/download/guide/Complete_9_Book_Master_Vault-2026.zip',
  'g-bundle-6': '/api/download/guide/Complete_6_Pillar_Master_Suite-2026.zip',
  'g-bundle-9': '/api/download/guide/Complete_9_Book_Master_Vault-2026.zip',
  'g-bundle-10': '/api/download/guide/Complete_9_Book_Master_Vault-2026.zip',
  'all-six-master-guides': '/api/download/guide/Complete_6_Pillar_Master_Suite-2026.zip',
  'all-nine-master-guides': '/api/download/guide/Complete_9_Book_Master_Vault-2026.zip',
  'all-ten-master-guides': '/api/download/guide/Complete_9_Book_Master_Vault-2026.zip'
};

/**
 * Resolves the direct downloadable URL for any guide ID or slug
 * Returns direct Cloudflare R2 vault stream redirect
 */
export function getGuidePdfDownloadUrl(guideIdOrSlug: string): string {
  if (!guideIdOrSlug) return '/api/download/guide/the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf';
  const cleanKey = guideIdOrSlug.trim();
  const lowerKey = cleanKey.toLowerCase();
  
  if (
    lowerKey.includes('metabolic') || 
    lowerKey.includes('visceral') || 
    lowerKey === 'g-met-1'
  ) {
    return '/api/download/guide/the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf';
  }

  if (GUIDE_PDF_MAP[lowerKey]) {
    return GUIDE_PDF_MAP[lowerKey];
  }

  // Fallback search in map keys
  for (const [key, path] of Object.entries(GUIDE_PDF_MAP)) {
    if (lowerKey.includes(key) || key.includes(lowerKey)) {
      return path;
    }
  }

  return `/api/download/guide/${encodeURIComponent(cleanKey)}`;
}

/**
 * Checks whether an administrator session is currently authenticated
 */
export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Strictly returns TRUE only if the current user is an authenticated Admin
 * AND the Paywall Bypass toggle is enabled in localStorage.
 */
export function isPaywallBypassActive(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const isAuth = sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true';
    if (!isAuth) return false;
    return localStorage.getItem(PAYWALL_BYPASS_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Enables or disables Paywall Bypass mode and broadcasts the change across the window.
 */
export function setPaywallBypassActive(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PAYWALL_BYPASS_STORAGE_KEY, enabled ? 'true' : 'false');
    window.dispatchEvent(new Event(PAYWALL_BYPASS_EVENT_KEY));
  } catch (err) {
    console.error('[AdminTestMode] Error setting bypass active state:', err);
  }
}

/**
 * Triggers an instant download of a file in the browser
 */
export function triggerDirectDownload(url: string, filename?: string): void {
  if (typeof window === 'undefined') return;
  const a = document.createElement('a');
  a.href = url;
  if (filename) {
    a.download = filename;
  }
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Downloads multiple guides sequentially with a small stagger to bypass browser multi-download blocks
 */
export function downloadMultipleGuides(guideIds: string[]): void {
  if (!guideIds || guideIds.length === 0) return;
  guideIds.forEach((id, index) => {
    setTimeout(() => {
      const url = getGuidePdfDownloadUrl(id);
      const filename = url.split('/').pop() || `${id}.pdf`;
      triggerDirectDownload(url, filename);
    }, index * 350);
  });
}

/**
 * Reactive React hook to observe and control paywall bypass status.
 */
export function usePaywallBypass() {
  const [isBypassActive, setIsBypassActiveState] = useState<boolean>(() => isPaywallBypassActive());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminAuthenticated());

  useEffect(() => {
    const syncState = () => {
      setIsAdmin(isAdminAuthenticated());
      setIsBypassActiveState(isPaywallBypassActive());
    };

    syncState();
    window.addEventListener('storage', syncState);
    window.addEventListener(PAYWALL_BYPASS_EVENT_KEY, syncState);

    return () => {
      window.removeEventListener('storage', syncState);
      window.removeEventListener(PAYWALL_BYPASS_EVENT_KEY, syncState);
    };
  }, []);

  const setBypassActive = (enabled: boolean) => {
    setPaywallBypassActive(enabled);
    setIsBypassActiveState(isPaywallBypassActive());
  };

  return {
    isBypassActive,
    setBypassActive,
    isAdmin
  };
}
