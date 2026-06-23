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

type AffiliateLinks = Record<string, any>;

interface AffiliateLinksContextType {
  links: AffiliateLinks;
  loading: boolean;
  refreshLinks: () => Promise<void>;
}


const staticLinkInfo: AffiliateLinks = {
  ...Object.fromEntries(
    Object.entries(staticLinks)
      .filter(([_, url]) => typeof url === 'string')
      .map(([key, url]) => [key, { url: url as string }])
  ),
  quiz: staticLinks.quiz
};

const AffiliateLinksContext = createContext<AffiliateLinksContextType>({
  links: staticLinkInfo,
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
      const newLinks: Record<string, any> = {};
      // Initialize with static links
      Object.entries(staticLinks).forEach(([key, url]) => {
        if (typeof url === 'string') {
          newLinks[key] = { url };
        } else {
          // deep copy nested config objects (like quiz)
          newLinks[key] = JSON.parse(JSON.stringify(url));
        }
      });

      mappingsData.forEach(mapping => {
        const dbProduct = productsData.find(p => p.id === mapping.product_id);
        if (dbProduct && dbProduct.affiliate_link) {
          const product = mapToProduct(dbProduct);
          const brand = product.tags?.[0] || 'Premium Vetted';
          const currencySymbol = product.currency === 'USD' ? '$' : product.currency === 'GBP' ? '£' : product.currency === 'EUR' ? '€' : '';
          const priceDisplay = product.price ? `${currencySymbol}${product.price.toFixed(2)}` : '';

          if (mapping.key.startsWith('quiz_')) {
            const parts = mapping.key.split('_');
            if (parts.length >= 3) {
              const region = parts[parts.length - 1]; // 'us', 'uk', 'es'
              const slug = parts.slice(1, parts.length - 1).join('_'); // e.g. 'vitamin-d3-k2'
              
              if (!newLinks.quiz) newLinks.quiz = {};
              if (!newLinks.quiz[slug]) newLinks.quiz[slug] = {};
              
              newLinks.quiz[slug][region] = product.amazon_url;
            }
          } else {
            newLinks[mapping.key] = {
              url: product.amazon_url,
              image: product.image_url,
              name: product.product_name,
              brand: brand,
              desc: product.description || product.short_benefit,
              price: priceDisplay
            };
          }
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
