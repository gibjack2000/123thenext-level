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

    // 2. Check route path prefix (/us/..., /uk/..., /es/...)
    const parts = window.location.pathname.split('/').filter(Boolean);
    const knownRegions = ['us', 'uk', 'es'];
    if (parts.length > 0 && knownRegions.includes(parts[0].toLowerCase())) {
      return parts[0].toUpperCase() as Market;
    }

    // 3. Check if user explicitly changed flag in current session
    const sessionChoice = sessionStorage.getItem('user_explicit_market_selection');
    if (sessionChoice && ['US', 'UK', 'ES'].includes(sessionChoice.toUpperCase())) {
      return sessionChoice.toUpperCase() as Market;
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
    
    setMarketState(finalMarket);
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
      window.dispatchEvent(new Event('storage'));
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

    // If user explicitly supplied ?country= or selected flag this session, don't overwrite
    if (hasUrlCountry || hasSessionChoice) return;

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
          // US, CA, or any international visitor strictly gets US market
          targetMarket = 'US';
        }

        setMarketState(targetMarket);
        try {
          localStorage.setItem('selected-market', targetMarket);
          localStorage.setItem('selected_region', targetMarket);
        } catch {}

        window.dispatchEvent(new CustomEvent('market-changed', { detail: { market: targetMarket } }));
        window.dispatchEvent(new CustomEvent('region-changed', { detail: { region: targetMarket } }));
      } catch {
        if (isMounted) {
          setMarketState('US');
        }
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
    if (parts.length > 0 && knownRegions.includes(parts[0].toLowerCase())) {
      const newMarket = parts[0].toUpperCase() as Market;
      setMarketState(newMarket);
      try {
        localStorage.setItem('selected-market', newMarket);
        localStorage.setItem('selected_region', newMarket);
        localStorage.setItem('country_flag', newMarket);
      } catch {}
    } else {
      const searchParams = new URLSearchParams(location.search);
      const urlCountry = searchParams.get('country')?.toUpperCase();
      if (urlCountry && ['US', 'UK', 'ES'].includes(urlCountry)) {
        const newMarket = urlCountry as Market;
        setMarketState(newMarket);
        try {
          localStorage.setItem('selected-market', newMarket);
          localStorage.setItem('selected_region', newMarket);
          localStorage.setItem('country_flag', newMarket);
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
      if (e.key === 'selected-market' || e.key === 'selected_region' || e.key === 'country_flag') {
        const val = e.newValue?.toUpperCase();
        if (val && ['US', 'UK', 'ES'].includes(val)) {
          setMarketState(val as Market);
        } else {
          setMarketState('US');
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


