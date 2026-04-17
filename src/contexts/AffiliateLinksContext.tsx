import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { affiliateLinks as staticLinks } from '../config/affiliateLinks';

type AffiliateLinks = typeof staticLinks;

interface AffiliateLinksContextType {
  links: AffiliateLinks;
  loading: boolean;
  refreshLinks: () => Promise<void>;
}

const AffiliateLinksContext = createContext<AffiliateLinksContextType>({
  links: staticLinks,
  loading: false,
  refreshLinks: async () => {},
});

export const useAffiliateLinks = () => useContext(AffiliateLinksContext);

export const AffiliateLinksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [links, setLinks] = useState<AffiliateLinks>(staticLinks);
  const [loading, setLoading] = useState(true);

  const fetchDynamicLinks = async () => {
    if (!hasValidSupabaseConfig || !supabase) {
      setLoading(false);
      return;
    }

    try {
      // Fetch mappings
      const { data: mappingsData, error: mappingError } = await supabase
        .from('affiliate_link_mappings')
        .select('key, product_id');

      if (mappingError && mappingError.code !== '42P01') throw mappingError;
      if (!mappingsData || mappingsData.length === 0) {
        setLinks(staticLinks);
        return;
      }

      // Fetch products to get the URLs
      const productIds = mappingsData.map(m => m.product_id);
      const { data: productsData, error: productsError } = await supabase
        .from('amazon_affiliate_products')
        .select('id, affiliate_link')
        .in('id', productIds);

      if (productsError) throw productsError;
      if (!productsData || productsData.length === 0) {
        setLinks(staticLinks);
        return;
      }

      // Build new link dictionary merging static with dynamic overrides
      const newLinks = { ...staticLinks } as any;

      mappingsData.forEach(mapping => {
        const product = productsData.find(p => p.id === mapping.product_id);
        if (product && product.affiliate_link) {
          newLinks[mapping.key] = product.affiliate_link;
        }
      });

      setLinks(newLinks);
    } catch (err) {
      console.error('Failed to fetch dynamic affiliate links:', err);
      // Fails gracefully back to static links
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDynamicLinks();
  }, []);

  return (
    <AffiliateLinksContext.Provider value={{ links, loading, refreshLinks: fetchDynamicLinks }}>
      {children}
    </AffiliateLinksContext.Provider>
  );
};
