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
 * Ensures SSR and initial render ALWAYS default to 'US' unless an explicit local
 * parameter or saved preference is present.
 */
export function getInitialMarket(): Market {
  try {
    if (typeof window === 'undefined') {
      return 'US';
    }

    // 1. Check URL Search Param (?country=US, ?country=UK, ?country=ES)
    const searchParams = new URLSearchParams(window.location.search);
    const urlCountry = searchParams.get('country')?.toUpperCase();
    if (urlCountry && ['US', 'UK', 'ES'].includes(urlCountry)) {
      return urlCountry as Market;
    }

    // 2. Check route path prefix (/us/..., /uk/..., /es/... or /store-us, /store-uk, /store-es)
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

    // 3. Check if user explicitly changed flag in current session or previous visit
    const sessionChoice = sessionStorage.getItem('user_explicit_market_selection');
    if (sessionChoice && ['US', 'UK', 'ES'].includes(sessionChoice.toUpperCase())) {
      return sessionChoice.toUpperCase() as Market;
    }
    const localChoice = localStorage.getItem('selected-market') || localStorage.getItem('selected_region');
    if (localChoice && ['US', 'UK', 'ES'].includes(localChoice.toUpperCase())) {
      return localChoice.toUpperCase() as Market;
    }
  } catch {
    return 'US';
  }

  // 4. Default Base State: Strictly 'US'
  return 'US';
}

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [market, setMarketState] = useState<Market>(getInitialMarket);

  // Set market and broadcast to all listeners across the app
  const setMarket = useCallback((newMarket: Market) => {
    const normalized = (newMarket || 'US').toUpperCase() as Market;
    const finalMarket = ['US', 'UK', 'ES'].includes(normalized) ? normalized : 'US';
    
    setMarketState(prev => (prev !== finalMarket ? finalMarket : prev));
    try {
      sessionStorage.setItem('user_explicit_market_selection', finalMarket);
      localStorage.setItem('user_explicit_market_selection', 'true');
      localStorage.setItem('selected-market', finalMarket);
      localStorage.setItem('selected_region', finalMarket);
      localStorage.setItem('country_flag', finalMarket);
    } catch {}

    // Dispatch global events for instant sync
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('market-changed', { detail: { market: finalMarket } }));
      window.dispatchEvent(new CustomEvent('region-changed', { detail: { region: finalMarket } }));
    }
  }, []);

  // Post-hydration Geolocation Detection:
  // Detects visitor country code via fast Geo-IP in the background.
  // If IP is US (or outside UK/ES), guarantees strict 'US' state.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);
    const hasUrlCountry = searchParams.get('country');
    const hasSessionChoice = sessionStorage.getItem('user_explicit_market_selection');
    const hasLocalChoice = localStorage.getItem('selected-market');

    // Check if user is on an explicit regional route like /store-us, /store-uk, /store-es, /us, /uk, /es
    const parts = window.location.pathname.split('/').filter(Boolean);
    const first = parts[0]?.toLowerCase() || '';
    const isRegionalRoute = ['us', 'uk', 'es'].includes(first) || 
      (first.startsWith('store-') && ['us', 'uk', 'es'].includes(first.replace('store-', '')));

    // If user explicitly supplied ?country=, selected flag, or is on an explicit regional route, don't overwrite
    if (hasUrlCountry || hasSessionChoice || hasLocalChoice || isRegionalRoute) return;

    let isMounted = true;
    const controller = new AbortController();

    async function detectGeoMarket() {
      try {
        let detectedCode: string | null = null;

        // Try Endpoint 1: api.country.is (ultra fast, lightweight)
        try {
          const res1 = await fetch('https://api.country.is/', { signal: controller.signal });
          if (res1.ok) {
            const d1 = await res1.json();
            if (d1?.country) detectedCode = d1.country.toUpperCase();
          }
        } catch {}

        // Try Endpoint 2: ipapi.co
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

        // Try Endpoint 3: ipwho.is
        if (!detectedCode) {
          try {
            const res3 = await fetch('https://ipwho.is/', { signal: controller.signal });
            if (res3.ok) {
              const d3 = await res3.json();
              if (d3?.country_code) detectedCode = d3.country_code.toUpperCase();
            }
          } catch {}
        }

        if (!isMounted) return;

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

  // Sync with route changes
  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    const knownRegions = ['us', 'uk', 'es'];
    let targetFromRoute: Market | null = null;

    if (parts.length > 0) {
      const first = parts[0].toLowerCase();
      if (knownRegions.includes(first)) {
        targetFromRoute = first.toUpperCase() as Market;
      } else if (first.startsWith('store-') && knownRegions.includes(first.replace('store-', ''))) {
        targetFromRoute = first.replace('store-', '').toUpperCase() as Market;
      }
    }

    if (!targetFromRoute) {
      const searchParams = new URLSearchParams(location.search);
      const urlCountry = searchParams.get('country')?.toUpperCase();
      if (urlCountry && ['US', 'UK', 'ES'].includes(urlCountry)) {
        targetFromRoute = urlCountry as Market;
      }
    }

    if (targetFromRoute) {
      setMarketState(prev => (prev !== targetFromRoute ? targetFromRoute : prev));
      try {
        localStorage.setItem('selected-market', targetFromRoute);
        localStorage.setItem('selected_region', targetFromRoute);
        localStorage.setItem('country_flag', targetFromRoute);
      } catch {}
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
      if (e.key === 'selected-market' || e.key === 'selected_region' || e.key === 'country_flag') {
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


