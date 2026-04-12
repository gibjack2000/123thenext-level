export type Product = {
  id: string;
  region: 'US' | 'UK' | 'ES';
  category: string;
  product_name: string;
  amazon_asin: string;
  amazon_url: string;
  image_url: string;
  short_benefit: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  featured: boolean;
  tags: string[];
  last_checked_at: string;
};

export type BlogPost = {
  id: string;
  created_at: string;
  category: 'health' | 'fitness' | 'nutrition' | 'wellness';
  title: string;
  slug: string;
  author: string;
  content: string;
  image_url: string;
  image_url_2?: string;
  image_url_3?: string;
  affiliate_url?: string;
  excerpt: string;
  tags: string[];
  featured: boolean;
};

// Mapper from DB amazon_affiliate_products to internal Product type
export const mapToProduct = (dbProduct: any): Product => {
  return {
    id: dbProduct.id?.toString(),
    region: dbProduct.market as 'US' | 'UK' | 'ES',
    category: dbProduct.category,
    product_name: dbProduct.title,
    amazon_asin: dbProduct.asin,
    amazon_url: dbProduct.affiliate_link,
    image_url: dbProduct.image_url,
    short_benefit: dbProduct.cta,
    description: dbProduct.description,
    price: parseFloat(dbProduct.price || 0),
    currency: dbProduct.market === 'US' ? 'USD' : dbProduct.market === 'UK' ? 'GBP' : 'EUR',
    rating: dbProduct.rating,
    featured: dbProduct.is_active,
    tags: [],
    last_checked_at: dbProduct.last_updated
  };
};
