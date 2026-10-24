import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export type Market = 'US' | 'UK' | 'ES';

interface MarketContextType {
  market: Market;
  setMarket: (market: Market) => void;
}

const MarketContext = createContext<MarketContextType>({
  market: 'US',
  setMarket: () => {},
});

/**
 * Resolves the initial market synchronously for SSR and initial client hydration.
 * Checks user's explicit preference ('user_market') first, preventing unexpected resets.
 */
export function getInitialMarket(): Market {
  try {
    if (typeof window === 'undefined') {
      return 'US';
    }

    // 1. Highest priority: User's explicitly saved market preference
    const savedUserMarket = localStorage.getItem('user_market') || sessionStorage.getItem('user_market');
    if (savedUserMarket && ['US', 'UK', 'ES'].includes(savedUserMarket.toUpperCase())) {
      return savedUserMarket.toUpperCase() as Market;
    }

    // 2. Secondary priority: Legacy storage flags
    const sessionChoice = sessionStorage.getItem('user_explicit_market_selection');
    if (sessionChoice && ['US', 'UK', 'ES'].includes(sessionChoice.toUpperCase())) {
      return sessionChoice.toUpperCase() as Market;
    }
    const localChoice = localStorage.getItem('selected-market') || localStorage.getItem('selected_region');
    if (localChoice && ['US', 'UK', 'ES'].includes(localChoice.toUpperCase())) {
      return localChoice.toUpperCase() as Market;
    }

    // 3. URL Search Param (?country=US, ?country=UK, ?country=ES)
    const searchParams = new URLSearchParams(window.location.search);
    const urlCountry = searchParams.get('country')?.toUpperCase();
    if (urlCountry && ['US', 'UK', 'ES'].includes(urlCountry)) {
      return urlCountry as Market;
    }

    // 4. Route path prefix (/us/..., /uk/..., /es/... or /store-us, /store-uk, /store-es)
    const parts = window.location.pathname.split('/').filter(Boolean);
    const knownRegions = ['us', 'uk', 'es'];
    if (parts.length > 0) {
      const first = parts[0].toLowerCase();
      if (knownRegions.includes(first)) {
        return first.toUpperCase() as Market;
      }
      if (first.startsWith('store-') && knownRegions.includes(first.replace('store-', ''))) {
        return first.replace('store-', '').toUpperCase() as Market;
      }
    }
  } catch {
    return 'US';
  }

  // 5. Default Base State: Strictly 'US'
  return 'US';
}

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [market, setMarketState] = useState<Market>(getInitialMarket);

  // Set market and broadcast to all listeners across the app
  const setMarket = useCallback((newMarket: Market) => {
    const normalized = (newMarket || 'US').toUpperCase() as Market;
    const finalMarket: Market = ['US', 'UK', 'ES'].includes(normalized) ? normalized : 'US';
    
    setMarketState(finalMarket);

    try {
      // 1. Primary persistence requested: 'user_market'
      localStorage.setItem('user_market', finalMarket);
      sessionStorage.setItem('user_market', finalMarket);
      
      // 2. Compatibility persistence keys
      sessionStorage.setItem('user_explicit_market_selection', 'true');
      localStorage.setItem('user_explicit_market_selection', 'true');
      localStorage.setItem('selected-market', finalMarket);
      localStorage.setItem('selected_region', finalMarket);
      localStorage.setItem('country_flag', finalMarket);
    } catch (e) {
      console.warn('Failed to persist market selection to storage:', e);
    }

    // Dispatch global events for instant sync across tabs and isolated components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('market-changed', { detail: { market: finalMarket } }));
      window.dispatchEvent(new CustomEvent('region-changed', { detail: { region: finalMarket } }));
    }
  }, []);

  // Background Geolocation Detection:
  // ONLY runs once on fresh sessions where the user has NEVER chosen or saved a preference.
  // Never overrides explicit user choices or resets back to 'ES' or any other region on reload.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasUserMarket = localStorage.getItem('user_market') || sessionStorage.getItem('user_market');
    const hasSessionChoice = sessionStorage.getItem('user_explicit_market_selection');
    const hasLocalChoice = localStorage.getItem('selected-market') || localStorage.getItem('selected_region');
    const searchParams = new URLSearchParams(window.location.search);
    const hasUrlCountry = searchParams.get('country');

    const parts = window.location.pathname.split('/').filter(Boolean);
    const first = parts[0]?.toLowerCase() || '';
    const isRegionalRoute = ['us', 'uk', 'es'].includes(first) || 
      (first.startsWith('store-') && ['us', 'uk', 'es'].includes(first.replace('store-', '')));

    // If user explicitly chose market, supplied ?country=, or is on an explicit regional route, do NOT run geo-detection
    if (hasUserMarket || hasSessionChoice || hasLocalChoice || hasUrlCountry || isRegionalRoute) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function detectGeoMarket() {
      try {
        let detectedCode: string | null = null;

        // Try fast endpoint
        try {
          const res1 = await fetch('https://api.country.is/', { signal: controller.signal });
          if (res1.ok) {
            const d1 = await res1.json();
            if (d1?.country) detectedCode = d1.country.toUpperCase();
          }
        } catch {}

        if (!detectedCode) {
          try {
            const res2 = await fetch('https://ipapi.co/json/', { signal: controller.signal });
            if (res2.ok) {
              const d2 = await res2.json();
              if (d2?.country_code || d2?.country) {
                detectedCode = (d2.country_code || d2.country).toUpperCase();
              }
            }
          } catch {}
        }

        if (!isMounted) return;

        // Double check storage before setting
        if (localStorage.getItem('user_market')) return;

        let targetMarket: Market = 'US';
        if (detectedCode === 'ES') {
          targetMarket = 'ES';
        } else if (detectedCode === 'GB' || detectedCode === 'UK') {
          targetMarket = 'UK';
        } else {
          targetMarket = 'US';
        }

        setMarketState(prev => (prev !== targetMarket ? targetMarket : prev));
        try {
          localStorage.setItem('user_market', targetMarket);
          localStorage.setItem('selected-market', targetMarket);
          localStorage.setItem('selected_region', targetMarket);
        } catch {}

        window.dispatchEvent(new CustomEvent('market-changed', { detail: { market: targetMarket } }));
        window.dispatchEvent(new CustomEvent('region-changed', { detail: { region: targetMarket } }));
      } catch {
        // Leave existing market state undisturbed on error
      }
    }

    detectGeoMarket();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Sync with explicit route changes (e.g., direct navigation to /store-us, /store-uk, /store-es)
  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    const first = parts[0]?.toLowerCase() || '';
    
    if (first.startsWith('store-')) {
      const regionSuffix = first.replace('store-', '').toUpperCase();
      if (['US', 'UK', 'ES'].includes(regionSuffix)) {
        const routeMarket = regionSuffix as Market;
        setMarketState(prev => (prev !== routeMarket ? routeMarket : prev));
        try {
          localStorage.setItem('user_market', routeMarket);
          localStorage.setItem('selected-market', routeMarket);
        } catch {}
      }
    } else {
      const searchParams = new URLSearchParams(location.search);
      const urlCountry = searchParams.get('country')?.toUpperCase();
      if (urlCountry && ['US', 'UK', 'ES'].includes(urlCountry)) {
        const queryMarket = urlCountry as Market;
        setMarketState(prev => (prev !== queryMarket ? queryMarket : prev));
        try {
          localStorage.setItem('user_market', queryMarket);
          localStorage.setItem('selected-market', queryMarket);
        } catch {}
      }
    }
  }, [location.pathname, location.search]);

  // Listen for storage or external custom event changes
  useEffect(() => {
    const handleMarketChanged = (e: any) => {
      const incoming = e?.detail?.market || e?.detail?.region;
      if (incoming && ['US', 'UK', 'ES'].includes(incoming.toUpperCase())) {
        const normalized = incoming.toUpperCase() as Market;
        setMarketState((prev) => (prev !== normalized ? normalized : prev));
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user_market' || e.key === 'selected-market' || e.key === 'selected_region' || e.key === 'country_flag') {
        const val = e.newValue?.toUpperCase();
        if (val && ['US', 'UK', 'ES'].includes(val)) {
          setMarketState((prev) => (prev !== val ? (val as Market) : prev));
        }
      }
    };

    window.addEventListener('market-changed', handleMarketChanged);
    window.addEventListener('region-changed', handleMarketChanged);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('market-changed', handleMarketChanged);
      window.removeEventListener('region-changed', handleMarketChanged);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <MarketContext.Provider value={{ market, setMarket }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  return useContext(MarketContext);
}
