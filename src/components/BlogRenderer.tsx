import React from 'react';
import { BlogMarkdownRenderer, BlogMarkdownRendererProps } from './BlogMarkdownRenderer';

/**
 * BlogRenderer Component (Alias for BlogMarkdownRenderer)
 * Dynamically parses and renders blog markdown articles with:
 * - Dynamic product card binding (<ProductCard id="..." /> or <div data-product-id="...">)
 * - Strict US market fallback ($, FDA/CLIA, Amazon US affiliate links)
 * - Instant reactivity to MarketContext and header flag switcher events
 */
export const BlogRenderer: React.FC<BlogMarkdownRendererProps> = (props) => {
  return <BlogMarkdownRenderer {...props} />;
};

export { BlogMarkdownRenderer } from './BlogMarkdownRenderer';
export default BlogRenderer;
