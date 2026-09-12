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

    // 3. Check if user EXPLICITLY chose a market flag previously
    const hasExplicitChoice = localStorage.getItem('user_explicit_market_selection') === 'true';
    if (hasExplicitChoice) {
      const keys = ['selected-market', 'selected_region', 'country_flag'];
      for (const key of keys) {
        const saved = localStorage.getItem(key);
        if (saved && ['US', 'UK', 'ES'].includes(saved.toUpperCase())) {
          return saved.toUpperCase() as Market;
        }
      }
    }
  } catch {
    // Fallback on any error
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

  // Post-hydration Geolocation Fallback:
  // If no explicit user selection or URL param exists, detect visitor location via Geo-IP in the background.
  // If IP/header geolocation returns null, undefined, or any country code outside UK or ES, default directly to 'US'.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);
    const hasUrlCountry = searchParams.get('country');
    const hasExplicitChoice = localStorage.getItem('user_explicit_market_selection') === 'true';

    // Only run auto-geolocation if user has not explicitly chosen a market or supplied ?country=
    if (hasUrlCountry || hasExplicitChoice) return;

    let isMounted = true;
    const controller = new AbortController();

    async function detectGeoMarket() {
      try {
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const countryCode = (data.country_code || data.country || '').toUpperCase();

          if (!isMounted) return;

          if (countryCode === 'ES') {
            setMarketState('ES');
          } else if (countryCode === 'GB' || countryCode === 'UK') {
            setMarketState('UK');
          } else {
            // Null, undefined, or any country code outside UK or ES defaults directly to 'US'
            setMarketState('US');
          }
        } else {
          if (isMounted) setMarketState('US');
        }
      } catch {
        // Default strictly to 'US' on network error, ad blocker, or timeout
        if (isMounted) setMarketState('US');
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


