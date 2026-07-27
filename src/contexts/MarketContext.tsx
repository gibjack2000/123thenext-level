import React, { createContext, useContext, useState, useEffect } from 'react';
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

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [market, setMarketState] = useState<Market>(() => {
    try {
      const saved = localStorage.getItem('selected-market');
      if (saved && ['US', 'UK', 'ES'].includes(saved.toUpperCase())) {
        return saved.toUpperCase() as Market;
      }
    } catch {}

    const parts = window.location.pathname.split('/').filter(Boolean);
    const knownRegions = ['us', 'uk', 'es'];
    if (parts.length > 0 && knownRegions.includes(parts[0].toLowerCase())) {
      return parts[0].toUpperCase() as Market;
    }

    return 'US';
  });

  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    const knownRegions = ['us', 'uk', 'es'];
    if (parts.length > 0 && knownRegions.includes(parts[0].toLowerCase())) {
      const newMarket = parts[0].toUpperCase() as Market;
      setMarketState(newMarket);
      try {
        localStorage.setItem('selected-market', newMarket);
      } catch {}
    }
  }, [location.pathname]);

  const setMarket = (newMarket: Market) => {
    setMarketState(newMarket);
    try {
      localStorage.setItem('selected-market', newMarket);
    } catch {}
  };

  return (
    <MarketContext.Provider value={{ market, setMarket }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  return useContext(MarketContext);
}
