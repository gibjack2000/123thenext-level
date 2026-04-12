const fs = require('fs');
const path = require('path');

// This script simulates the automation of blog creation.
// In a real environment, you might use an LLM API to generate the content.
// Here, we provide a template-based approach or a placeholder for future AI integration.

const PRODUCTS_PATH = path.join(__dirname, '../src/data/mockData.ts');
const BLOGS_PATH = path.join(__dirname, '../src/data/mockBlogPosts.ts');

function getRandomProduct() {
  const content = fs.readFileSync(PRODUCTS_PATH, 'utf-8');
  // Simple regex to extract products from the mock file
  // This is a bit fragile but works for this mock setup
  const productsMatch = content.match(/MOCK_PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);
  if (!productsMatch) throw new Error("Could not find MOCK_PRODUCTS");
  
  // Clean up the string to be valid JSON (remove trailing commas, etc. if needed)
  // Or just use a simple approach to find IDs
  const products = eval(productsMatch[1]); // eval is unsafe but okay for this local mock script
  return products[Math.floor(Math.random() * products.length)];
}

function generateBlogContent(product) {
  return {
    title: `How ${product.product_name.split(',')[0]} Can Transform Your Health`,
    slug: `${product.product_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-health-benefits`,
    author: "123TheNext Level Team",
    category: "health",
    image_url: product.image_url,
    tags: ["health", "wellness", product.category.toLowerCase().replace(/\s+/g, '-')],
    content: `When it comes to building a solid health pillar, the tools you choose matter. Today, we're looking at a product that has been making waves in the wellness community: the [${product.product_name}](${product.amazon_url}).

### Why Quality Matters
In a world full of quick fixes, finding products that truly support your long-term health is essential. This product stands out due to its ${product.description.toLowerCase()}.

### Health Improvements
Using this product can lead to significant improvements in your daily vitality. Whether you're focused on ${product.short_benefit.toLowerCase()} or looking to overhaul your entire routine, the benefits are clear.

### Conclusion
Investing in the right products is an investment in yourself. The ${product.product_name} is more than just a purchase; it's a step toward a better, healthier you. Checkout the details [here](${product.amazon_url}).`
  };
}

function addBlogToFile(blog) {
  const content = fs.readFileSync(BLOGS_PATH, 'utf-8');
  const insertionPoint = content.lastIndexOf('  }');
  const newContent = content.slice(0, insertionPoint + 3) + 
    ',\n  ' + JSON.stringify(blog, null, 2).replace(/\n/g, '\n  ') +
    content.slice(insertionPoint + 3);
  
  fs.writeFileSync(BLOGS_PATH, newContent);
  console.log(`Successfully added blog: ${blog.title}`);
}

try {
  const product = getRandomProduct();
  const blog = generateBlogContent(product);
  addBlogToFile(blog);
} catch (err) {
  console.error("Error generating blog:", err);
}
