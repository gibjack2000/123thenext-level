import { useState, useEffect } from 'react';

export const ADMIN_AUTH_STORAGE_KEY = 'admin_session_authenticated';
export const PAYWALL_BYPASS_STORAGE_KEY = 'admin_paywall_bypass_active';
export const PAYWALL_BYPASS_EVENT_KEY = 'paywall_bypass_updated';

// Map of canonical guide IDs, product codes, and slugs to direct public PDF documents
export const GUIDE_PDF_MAP: Record<string, string> = {
  // 1. Metabolic Protocol
  'metabolic-master-guide': '/assets/docs/metabolic-master-guide.pdf',
  'g-met-1': '/assets/docs/metabolic-master-guide.pdf',
  'visceral-fat-protocol': '/assets/docs/metabolic-master-guide.pdf',
  '12-Week_Metabolic_Re-Engineering_Protocol.pdf': '/assets/docs/12-Week_Metabolic_Re-Engineering_Protocol.pdf',
  'The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf': '/assets/docs/The_12_Week_Metabolic_ReEngineering_Protocol-2026.pdf',

  // 2. Beginner Home Workout
  'beginner-home-workout': '/assets/docs/beginner_home_workout-2026.pdf',
  'beginner-home-workout-plan': '/assets/docs/beginner_home_workout-2026.pdf',
  'workout-plan': '/assets/docs/beginner_home_workout-2026.pdf',
  'g-fit-1': '/assets/docs/beginner_home_workout-2026.pdf',
  'beginner_home_workout-2026.pdf': '/assets/docs/beginner_home_workout-2026.pdf',
  'beginner_home_workout_v1.pdf': '/assets/docs/beginner_home_workout_v1.pdf',

  // 3. Hypertrophy & Strength
  'hypertrophy-strength': '/assets/docs/Hypertrophy-Strength-Protocol-2026.pdf',
  'strength-training-hypertrophy': '/assets/docs/Hypertrophy-Strength-Protocol-2026.pdf',
  'g-fit-2': '/assets/docs/Hypertrophy-Strength-Protocol-2026.pdf',
  'Hypertrophy-Strength-Protocol-2026.pdf': '/assets/docs/Hypertrophy-Strength-Protocol-2026.pdf',
  'hypertrophy_protocol_v1.pdf': '/assets/docs/hypertrophy_protocol_v1.pdf',

  // 4. Mobility & Recovery
  'mobility-recovery': '/assets/docs/Daily_Mobility_and_Recovery-2026.pdf',
  'mobility-recovery-routine': '/assets/docs/Daily_Mobility_and_Recovery-2026.pdf',
  'g-fit-3': '/assets/docs/Daily_Mobility_and_Recovery-2026.pdf',
  'Daily_Mobility_and_Recovery-2026.pdf': '/assets/docs/Daily_Mobility_and_Recovery-2026.pdf',
  'daily_mobility_v1.pdf': '/assets/docs/daily_mobility_v1.pdf',

  // 5. Master Meal Planning
  'master-meal-planning': '/assets/docs/The_Master_Meal_Planning_Guide-2026.pdf',
  'healthy-meal-planning-guide': '/assets/docs/The_Master_Meal_Planning_Guide-2026.pdf',
  'meal-planner': '/assets/docs/The_Master_Meal_Planning_Guide-2026.pdf',
  'g-nut-1': '/assets/docs/The_Master_Meal_Planning_Guide-2026.pdf',
  'The Master_Meal_Planning_Guide-2026.pdf': '/assets/docs/The_Master_Meal_Planning_Guide-2026.pdf',
  'the_master_meal_planning_guide.pdf': '/assets/docs/the_master_meal_planning_guide.pdf',

  // 6. Fat Loss Nutrition
  'fat-loss-nutrition': '/assets/docs/Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'fat-loss-nutrition-blueprint': '/assets/docs/Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'fat-loss-blueprint': '/assets/docs/Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'g-nut-2': '/assets/docs/Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'Fat-Loss-Nutrition-Blueprint-2026.pdf': '/assets/docs/Fat-Loss-Nutrition-Blueprint-2026.pdf',
  'fat-loss-nutrition-blueprint.pdf': '/assets/docs/fat-loss-nutrition-blueprint.pdf',
  'fat_loss_blueprint.pdf': '/assets/docs/fat_loss_blueprint.pdf',

  // 7. High-Protein Recipes
  'high-protein-recipes': '/assets/docs/High_Protein_Recipe_Collection-2026.pdf',
  'high-protein-recipe-collection': '/assets/docs/High_Protein_Recipe_Collection-2026.pdf',
  'g-nut-3': '/assets/docs/High_Protein_Recipe_Collection-2026.pdf',
  'High_Protein_Recipe_Collection-2026.pdf': '/assets/docs/High_Protein_Recipe_Collection-2026.pdf',
  'high_protein_recipes.pdf': '/assets/docs/high_protein_recipes.pdf',

  // 8. Cortisol & Stress Management
  'cortisol-stress-management': '/assets/docs/Cortisol_&_Stress_Management-2026.pdf',
  'stress-management-toolkit': '/assets/docs/Cortisol_&_Stress_Management-2026.pdf',
  'stress-management': '/assets/docs/Cortisol_&_Stress_Management-2026.pdf',
  'g-wel-1': '/assets/docs/Cortisol_&_Stress_Management-2026.pdf',
  'Cortisol_&_Stress_Management-2026.pdf': '/assets/docs/Cortisol_&_Stress_Management-2026.pdf',
  'stress-management-toolkit.pdf': '/assets/docs/stress-management-toolkit.pdf',

  // 9. Deep Sleep Optimization
  'sleep-optimization': '/assets/docs/Deep_Sleep_Optimization-2026.pdf',
  'sleep-optimization-protocol': '/assets/docs/Deep_Sleep_Optimization-2026.pdf',
  'g-wel-2': '/assets/docs/Deep_Sleep_Optimization-2026.pdf',
  'Deep_Sleep_Optimization-2026.pdf': '/assets/docs/Deep_Sleep_Optimization-2026.pdf',
  'sleep_optimization.pdf': '/assets/docs/sleep_optimization.pdf',

  // 10. Mindfulness & Habit Reset
  'mindfulness-habit-reset': '/assets/docs/Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
  'habit-reset': '/assets/docs/Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
  'g-wel-3': '/assets/docs/Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
  'Mindfulness_and_Habit_Reset_Workbook-2026.pdf': '/assets/docs/Mindfulness_and_Habit_Reset_Workbook-2026.pdf',
  'habit_reset_workbook.pdf': '/assets/docs/habit_reset_workbook.pdf',

  // Lifespan Blueprint
  'the-next-level-lifespan': '/assets/docs/the-next-level-lifespan.pdf',
  'g-epi-1': '/assets/docs/the-next-level-lifespan.pdf',
  'the-next-level-lifespan.pdf': '/assets/docs/the-next-level-lifespan.pdf',

  // Diagnostic guide
  'phase1-diagnostic-guide': '/assets/docs/phase1-diagnostic-guide.pdf',

  // Bundles & ZIP Archives
  'bundle-pick-3': '/assets/docs/Complete_6_Pillar_Master_Suite-2026.zip',
  'bundle-complete-vault-10': '/assets/docs/all-ten-master-guides.zip',
  'g-bundle-6': '/assets/docs/all-six-master-guides.zip',
  'g-bundle-9': '/assets/docs/all-nine-master-guides.zip',
  'g-bundle-10': '/assets/docs/all-ten-master-guides.zip',
  'all-six-master-guides': '/assets/docs/all-six-master-guides.zip',
  'all-nine-master-guides': '/assets/docs/all-nine-master-guides.zip',
  'all-ten-master-guides': '/assets/docs/all-ten-master-guides.zip'
};

/**
 * Resolves the direct downloadable URL for any guide ID or slug
 */
export function getGuidePdfDownloadUrl(guideIdOrSlug: string): string {
  if (!guideIdOrSlug) return '/assets/docs/metabolic-master-guide.pdf';
  const cleanKey = guideIdOrSlug.trim().toLowerCase();
  
  if (GUIDE_PDF_MAP[cleanKey]) {
    return GUIDE_PDF_MAP[cleanKey];
  }

  // Fallback search in map keys
  for (const [key, path] of Object.entries(GUIDE_PDF_MAP)) {
    if (cleanKey.includes(key) || key.includes(cleanKey)) {
      return path;
    }
  }

  return '/assets/docs/metabolic-master-guide.pdf';
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
