import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function insertBlog() {
  const newBlog = {
    category: 'health',
    title: "Beyond the Basin: Why the Cuisinart Tri-Zone is the Future of Healthy Cooking",
    slug: "cuisinart-tri-zone-healthy-cooking-" + crypto.randomBytes(2).toString('hex'),
    author: '123TheNext Level Team',
    image_url: "https://123thenextlevel.com/Products/triple.jpg",
    excerpt: "Revolutionize your kitchen with the largest capacity air fryer that lets you cook entire healthy meals with 85% less oil.",
    tags: ["health", "nutrition", "air fryer", "cooking"],
    featured: false,
    content: `When it comes to the Health Pillar of your life, nutrition is the bedrock. However, for many busy professionals and parents, the hurdle isn't just knowing what to eat—it's having the time and tools to prepare it without resorting to greasy, processed alternatives. This is where the [Cuisinart Tri Zone 13.6L Air Fryer & Oven](https://www.amazon.co.uk/dp/B0F54NQBKV?tag=youruk-21) steps in as a literal life-changer.

### The Problem with Traditional Frying
Traditional deep frying isn't just messy; it's a significant source of oxidized fats and excess calories. By submerging food in boiling oil, you're effectively adding hundreds of empty calories to otherwise healthy ingredients. The Cuisinart Tri-Zone solves this by utilizing 360-degree rapid heat circulation, allowing you to achieve that perfect crispy texture using 85% less oil.

### Versatility for a Diverse Diet
One of the most impressive features of the Tri-Zone is its massive 13.6L capacity and the ability to cook multiple items at once. Whether you're roasting a whole chicken for lean protein, dehydrating fruits for healthy snacks, or air-frying a mountain of fiber-rich vegetables, this oven handles it all. Its 11 presets take the guesswork out of healthy meal prep, ensuring your salmon is perfectly flaky and your sweet potato fries are crisp every single time.

### Promoting a Sustainable Lifestyle
A healthy lifestyle is one that is sustainable. By making healthy cooking easy, fast, and delicious, the [Cuisinart Tri Zone](https://www.amazon.co.uk/dp/B0F54NQBKV?tag=youruk-21) removes the friction that often leads to unhealthy takeout choices. It's an investment in your long-term wellness that pays dividends in every meal.

### Conclusion
If you're serious about your health pillar, your kitchen tools should reflect that commitment. The Cuisinart Tri-Zone isn't just an appliance; it's a partner in your wellness journey.`,
    created_at: new Date().toISOString()
  };

  console.log("Inserting manual blog post into Supabase...");
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([newBlog])
    .select();

  if (error) {
    console.error("Error:", error);
  } else {
    console.log("✅ Success! Blog post inserted.");
    console.log("Slug:", newBlog.slug);
  }
}

insertBlog();
