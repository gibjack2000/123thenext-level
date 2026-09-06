import { MOCK_PRODUCTS } from '../src/data/mockData.ts';

const mockKitchen = MOCK_PRODUCTS.filter(p => p.category === 'home_kitchen' || p.category === 'Home & Kitchen' || p.category?.toLowerCase().includes('kitchen'));
console.log('MOCK_PRODUCTS with kitchen: ' + mockKitchen.length);
mockKitchen.forEach(p => {
  console.log('[' + p.region + '] [' + p.amazon_asin + '] ' + p.product_name + ' | Price: ' + p.price);
});
