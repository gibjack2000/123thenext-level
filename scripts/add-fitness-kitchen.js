import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function ensureFitnessAndKitchen() {
  const fitnessItems = [
    // UK Fitness
    {
      id: "amazon-fitness-uk-rower",
      name: "Concept2 Remo Indoor Model D Rower",
      category: "Fitness",
      rating: 4.95,
      description: "The gold-standard indoor rowing machine with PM5 monitor to optimize cardiorespiratory output, muscular baseline, and metabolic power.",
      price_text: "£850.00",
      deal_url: "https://www.amazon.co.uk/dp/B099KBD9X8?tag=123znl0f3-21",
      market_region: "UK",
      badge_text: "PM5 Clinical Standard",
      image_url: "https://123thenextlevel.com/assets/images/shop/rower.png"
    },
    {
      id: "amazon-fitness-uk-kettlebell",
      name: "Bowflex SelectTech 840 Adjustable Kettlebell",
      category: "Fitness",
      rating: 4.88,
      description: "Adjusts from 3.5kg to 18kg with the turn of a dial for rapid eccentric loading, posterior chain power, and functional hypertrophy.",
      price_text: "£139.00",
      deal_url: "https://www.amazon.co.uk/dp/B07V2C6374?tag=123znl0f3-21",
      market_region: "UK",
      badge_text: "6-in-1 Compact Weight",
      image_url: "https://123thenextlevel.com/assets/images/shop/rower.png"
    },
    // US Fitness
    {
      id: "amazon-fitness-us-rower",
      name: "Concept2 Remo Indoor Model D Rower",
      category: "Fitness",
      rating: 4.95,
      description: "The gold-standard indoor rowing machine with PM5 monitor to optimize cardiorespiratory output, muscular baseline, and metabolic power.",
      price_text: "$990.00",
      deal_url: "https://www.amazon.com/dp/B099KBD9X8?tag=123znl0e-20",
      market_region: "US",
      badge_text: "PM5 Clinical Standard",
      image_url: "https://123thenextlevel.com/assets/images/shop/rower.png"
    },
    {
      id: "amazon-fitness-us-kettlebell",
      name: "Bowflex SelectTech 840 Adjustable Kettlebell",
      category: "Fitness",
      rating: 4.88,
      description: "Adjusts from 8 to 40 lbs with the turn of a dial for rapid eccentric loading, posterior chain power, and functional hypertrophy.",
      price_text: "$149.00",
      deal_url: "https://www.amazon.com/dp/B07V2C6374?tag=123znl0e-20",
      market_region: "US",
      badge_text: "6-in-1 Compact Weight",
      image_url: "https://123thenextlevel.com/assets/images/shop/rower.png"
    },
    // ES Fitness
    {
      id: "amazon-fitness-es-rower",
      name: "Concept2 Remo Indoor Model D Rower",
      category: "Fitness",
      rating: 4.95,
      description: "La máquina de remo de referencia con monitor PM5 para optimizar el rendimiento cardiorrespiratorio y la potencia metabólica.",
      price_text: "950,00€",
      deal_url: "https://www.amazon.es/dp/B099KBD9X8?tag=123znl08a-21",
      market_region: "ES",
      badge_text: "Estándar Clínico PM5",
      image_url: "https://123thenextlevel.com/assets/images/shop/rower.png"
    },
    {
      id: "amazon-fitness-es-kettlebell",
      name: "Bowflex SelectTech 840 Pesa Rusa Ajustable",
      category: "Fitness",
      rating: 4.88,
      description: "Se ajusta de 3,5 kg a 18 kg para entrenamientos funcionales de cadena posterior y fuerza adaptativa.",
      price_text: "149,00€",
      deal_url: "https://www.amazon.es/dp/B07V2C6374?tag=123znl08a-21",
      market_region: "ES",
      badge_text: "Compacta 6 en 1",
      image_url: "https://123thenextlevel.com/assets/images/shop/rower.png"
    },
    // UK Kitchen
    {
      id: "amazon-kitchen-uk-blender",
      name: "NutriBullet 1200 Series High-Speed Blender",
      category: "Kitchen",
      rating: 4.90,
      description: "High-speed precision cyclonic nutrient extractor designed to pulverize tough cell walls of leafy greens, seeds, and longevity superfoods.",
      price_text: "£99.99",
      deal_url: "https://www.amazon.co.uk/dp/B08524B5C6?tag=123znl0f3-21",
      market_region: "UK",
      badge_text: "1200W High Speed",
      image_url: "https://123thenextlevel.com/assets/images/shop/water-bottle.png"
    },
    // US Kitchen
    {
      id: "amazon-kitchen-us-blender",
      name: "NutriBullet 1200 Series High-Speed Blender",
      category: "Kitchen",
      rating: 4.90,
      description: "High-speed precision cyclonic nutrient extractor designed to pulverize tough cell walls of leafy greens, seeds, and longevity superfoods.",
      price_text: "$109.99",
      deal_url: "https://www.amazon.com/dp/B08524B5C6?tag=123znl0e-20",
      market_region: "US",
      badge_text: "1200W High Speed",
      image_url: "https://123thenextlevel.com/assets/images/shop/water-bottle.png"
    },
    // ES Kitchen
    {
      id: "amazon-kitchen-es-blender",
      name: "NutriBullet 1200 Batidora Extractor de Nutrientes",
      category: "Kitchen",
      rating: 4.90,
      description: "Extractor ciclónico de precisión de alta velocidad para pulverizar hojas verdes, semillas y superalimentos de longevidad.",
      price_text: "99,99€",
      deal_url: "https://www.amazon.es/dp/B08524B5C6?tag=123znl08a-21",
      market_region: "ES",
      badge_text: "Motor Potente 1200W",
      image_url: "https://123thenextlevel.com/assets/images/shop/water-bottle.png"
    }
  ];

  const { error } = await supabase.from('products').upsert(fitnessItems, { onConflict: 'id' });
  if (error) {
    console.error('Error upserting fitness and kitchen:', error);
  } else {
    console.log('✅ Successfully upserted localized Fitness & Kitchen products for UK, US, ES');
  }
}

ensureFitnessAndKitchen();
