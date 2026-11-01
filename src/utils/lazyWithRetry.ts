import { ComponentType, lazy, LazyExoticComponent } from 'react';

/**
 * Wraps React.lazy() with automatic retry and hard reload on deployment chunk mismatches.
 * If a chunk fails to load (e.g. after a new release has invalidated hashes),
 * it performs a one-time window.location.reload() to fetch the latest index.html and assets.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return lazy(async () => {
    const reloadKey = 'app_chunk_reload_attempted';
    const hasAlreadyReloaded = JSON.parse(
      window.sessionStorage.getItem(reloadKey) || 'false'
    );

    try {
      const component = await componentImport();
      // Reset reload flag once any chunk loads successfully
      window.sessionStorage.setItem(reloadKey, 'false');
      return component;
    } catch (error: any) {
      const errorMsg = error?.message || error?.toString() || '';
      const isChunkLoadFailed = /Failed to fetch dynamically imported module|Importing a module script failed|Loading chunk|error loading dynamically imported module/i.test(errorMsg);

      if (isChunkLoadFailed && !hasAlreadyReloaded) {
        // Mark that we are reloading to prevent infinite reload loops
        window.sessionStorage.setItem(reloadKey, 'true');
        // Force reload from server to fetch latest index.html with up-to-date chunk hashes
        window.location.reload();
        // Return a pending promise so React Suspense remains suspended during reload
        return new Promise<{ default: T }>(() => {});
      }

      // If already reloaded once and still failed, throw so ErrorBoundary can present a fallback
      throw error;
    }
  });
}

export default lazyWithRetry;
