import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { affiliateLinks as staticLinks } from '../config/affiliateLinks';
import { mapToProduct } from '../types';

type AffiliateLinkInfo = {
  url: string;
  image?: string;
  name?: string;
  brand?: string;
  desc?: string;
  price?: string;
};

type AffiliateLinks = Record<string, AffiliateLinkInfo>;

interface AffiliateLinksContextType {
  links: AffiliateLinks;
  loading: boolean;
  refreshLinks: () => Promise<void>;
}


const staticLinkInfo: Record<string, AffiliateLinkInfo> = Object.fromEntries(
  Object.entries(staticLinks).map(([key, url]) => [key, { url }])
);

const AffiliateLinksContext = createContext<AffiliateLinksContextType>({
  links: staticLinkInfo as any,
  loading: false,
  refreshLinks: async () => {},
});

export const useAffiliateLinks = () => useContext(AffiliateLinksContext);

export const AffiliateLinksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [links, setLinks] = useState<AffiliateLinks>(staticLinkInfo as any);
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
        setLinks(staticLinkInfo as any);
        return;
      }

      // Fetch products to get all fields
      const productIds = mappingsData.map(m => m.product_id);
      const { data: productsData, error: productsError } = await supabase
        .from('amazon_affiliate_products')
        .select('*')
        .in('id', productIds);

      if (productsError) throw productsError;
      if (!productsData || productsData.length === 0) {
        setLinks(staticLinkInfo as any);
        return;
      }

      // Build new link dictionary merging static with dynamic overrides
      const newLinks: Record<string, AffiliateLinkInfo> = {} as any;
      // Initialize with static links (no images)
      Object.entries(staticLinks).forEach(([key, url]) => {
        newLinks[key] = { url };
      });

      mappingsData.forEach(mapping => {
        const dbProduct = productsData.find(p => p.id === mapping.product_id);
        if (dbProduct && dbProduct.affiliate_link) {
          const product = mapToProduct(dbProduct);
          const brand = product.tags?.[0] || 'Premium Vetted';
          const currencySymbol = product.currency === 'USD' ? '$' : product.currency === 'GBP' ? '£' : product.currency === 'EUR' ? '€' : '';
          const priceDisplay = product.price ? `${currencySymbol}${product.price.toFixed(2)}` : '';

          newLinks[mapping.key] = {
            url: product.amazon_url,
            image: product.image_url,
            name: product.product_name,
            brand: brand,
            desc: product.description || product.short_benefit,
            price: priceDisplay
          };
        }
      });

      setLinks(newLinks as any);
    } catch (err) {
      console.error('Failed to fetch dynamic affiliate links:', err);
      // Fails gracefully back to static links
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDynamicLinks();

    if (!supabase || !hasValidSupabaseConfig) return;

    // Listen for mapping changes
    const mappingChannel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'affiliate_link_mappings' },
        () => fetchDynamicLinks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(mappingChannel);
    };
  }, []);

  return (
    <AffiliateLinksContext.Provider value={{ links, loading, refreshLinks: fetchDynamicLinks }}>
      {children}
    </AffiliateLinksContext.Provider>
  );
};
