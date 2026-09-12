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

export function getInitialMarket(): Market {
  try {
    // 1. Check URL Search Param
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const urlCountry = searchParams.get('country')?.toUpperCase();
      if (urlCountry && ['US', 'UK', 'ES'].includes(urlCountry)) {
        return urlCountry as Market;
      }
    }

    // 2. Check localStorage keys
    const keys = ['selected-market', 'selected_region', 'country_flag'];
    for (const key of keys) {
      const saved = localStorage.getItem(key);
      if (saved && ['US', 'UK', 'ES'].includes(saved.toUpperCase())) {
        return saved.toUpperCase() as Market;
      }
    }

    // 3. Check path prefix
    if (typeof window !== 'undefined') {
      const parts = window.location.pathname.split('/').filter(Boolean);
      const knownRegions = ['us', 'uk', 'es'];
      if (parts.length > 0 && knownRegions.includes(parts[0].toLowerCase())) {
        return parts[0].toUpperCase() as Market;
      }
    }
  } catch {}

  // 4. Default Fallback
  return 'US';
}

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [market, setMarketState] = useState<Market>(getInitialMarket);

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

  // Set market and broadcast to all listeners across the app
  const setMarket = useCallback((newMarket: Market) => {
    const normalized = (newMarket || 'US').toUpperCase() as Market;
    setMarketState(normalized);
    try {
      localStorage.setItem('selected-market', normalized);
      localStorage.setItem('selected_region', normalized);
      localStorage.setItem('country_flag', normalized);
    } catch {}

    // Dispatch global events for instant sync
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('market-changed', { detail: { market: normalized } }));
      window.dispatchEvent(new CustomEvent('region-changed', { detail: { region: normalized } }));
      window.dispatchEvent(new Event('storage'));
    }
  }, []);

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

