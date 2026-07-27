/**
 * Extensible Product Recommendation Mapping Registry
 * Maps the six core clinical pillars to localized products based on selected market (US, UK, ES).
 */

export interface ProductRecommendation {
  id: string;
  name: string;
  rating: number;
  description: string;
  priceText: string;
  dealUrl: string;
  badgeText: string;
  imagePlaceholder: string;
  pillar: string;
}

export const RECOMMENDATIONS_MAP: Record<'US' | 'UK' | 'ES', ProductRecommendation[]> = {
  US: [
    {
      id: "us-apple-watch-10",
      name: "Apple Watch Series 10 [GPS 46mm case]",
      rating: 4.7,
      description: "The gold standard for continuous heart rate, blood oxygen tracking, and nocturnal Heart Rate Variability (HRV) telemetry.",
      priceText: "$399.00",
      dealUrl: "https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl08-20",
      badgeText: "Vetted Telemetry Hub",
      imagePlaceholder: "/assets/products/apple-watch-10.jpg",
      pillar: "fitness"
    },
    {
      id: "us-concept2-rowerg",
      name: "Concept2 RowErg US",
      rating: 4.9,
      description: "High-end commercial grade indoor rowing machine for optimal cardiorespiratory VO2 Max conditioning and joint-safe power training.",
      priceText: "$990.00",
      dealUrl: "https://www.amazon.com/dp/B00NH9WEUA?tag=123znl08-20",
      badgeText: "VO2 Max Optimizer",
      imagePlaceholder: "/assets/products/concept2-rowerg-us.jpg",
      pillar: "fitness"
    },
    {
      id: "us-basics-dumbbells",
      name: "Amazon Basics Neoprene Dumbbells",
      rating: 4.8,
      description: "Ergonomically designed hand weights for functional strength, core activation, and longevity resistance training.",
      priceText: "$25.00",
      dealUrl: "https://www.amazon.com/dp/B01LR5RG08?tag=123znl08-20",
      badgeText: "Resistance Training",
      imagePlaceholder: "/assets/products/basics-dumbbells.jpg",
      pillar: "fitness"
    },
    {
      id: "us-qunol-coq10",
      name: "Qunol Ultra CoQ10 100mg",
      rating: 4.7,
      description: "Highly bioavailable Coenzyme Q10 supplement to support cellular mitochondrial energy production and vascular healthspan.",
      priceText: "$29.99",
      dealUrl: "https://www.amazon.com/dp/B0055OUOQQ?tag=123znl08-20",
      badgeText: "Mitochondrial Fuel",
      imagePlaceholder: "/assets/products/qunol-coq10.jpg",
      pillar: "health"
    },
    {
      id: "us-strength-rack",
      name: "Performance Strength Rack US",
      rating: 5.0,
      description: "Heavy-duty home strength rack supporting safe compound movements, pull-ups, and baseline resistance protocols.",
      priceText: "$499.00",
      dealUrl: "https://123thenextlevel.com/shop/strength-rack",
      badgeText: "Structural Joint Health",
      imagePlaceholder: "/assets/products/strength-rack.jpg",
      pillar: "fitness"
    },
    {
      id: "us-ovarian-test",
      name: "Ovarian Reserve Test Kit (USA)",
      rating: 5.0,
      description: "Comprehensive home endocrine screening assessing female reproductive longevity and hormone metrics.",
      priceText: "$89.00",
      dealUrl: "https://www.amazon.co.uk/dp/B01B81R34U?tag=123znl0a-21&",
      badgeText: "Biology-Specific Screening",
      imagePlaceholder: "/assets/products/ovarian-test-us.jpg",
      pillar: "womens-health"
    }
  ],
  UK: [
    {
      id: "uk-lola-vital-check-56",
      name: "Lola Vital Check 56",
      rating: 5.0,
      description: "Clinical-grade 56-marker blood panel co-evaluated with your general practitioner to map cardiovascular, immune, and metabolic baselines.",
      priceText: "£237.00",
      dealUrl: "https://referrals.lolahealth.com/NextLevel15",
      badgeText: "Cardiovascular Baseline",
      imagePlaceholder: "/assets/products/lola-check-56.jpg",
      pillar: "health"
    },
    {
      id: "uk-lola-peak-insights-70",
      name: "Lola Peak Insights 70",
      rating: 5.0,
      description: "Advanced 70-marker diagnostics measuring cellular velocity, lipid fractions, inflammation indexes, and metabolic longevity indicators.",
      priceText: "£349.00",
      dealUrl: "https://referrals.lolahealth.com/NextLevel15",
      badgeText: "Vascular Protection",
      imagePlaceholder: "/assets/products/lola-insights-70.jpg",
      pillar: "health"
    },
    {
      id: "uk-ninja-airfryer",
      name: "Ninja Foodi Dual Zone 7.6L AF300UK",
      rating: 4.8,
      description: "Dual-drawer hot air cooking tool for low-oil, nutrient-dense glycemic family meal prep and metabolic control.",
      priceText: "£199.00",
      dealUrl: "https://123thenextlevel.com/shop/ninja-af300",
      badgeText: "Glycemic Meal Prep",
      imagePlaceholder: "/assets/products/ninja-airfryer.jpg",
      pillar: "nutrition"
    },
    {
      id: "uk-moulinex-airfryer",
      name: "Moulinex Easy Fry & Grill 4.2L",
      rating: 4.7,
      description: "Accessible, space-saving kitchen assistant ideal for single-person glycemic dietary preparation.",
      priceText: "£89.99",
      dealUrl: "https://www.amazon.co.uk/dp/B09FQBKFQ6?tag=123znl08a-21",
      badgeText: "Low-Glycemic Snacking",
      imagePlaceholder: "/assets/products/moulinex-airfryer.jpg",
      pillar: "nutrition"
    },
    {
      id: "uk-concept2-rowerg",
      name: "Concept2 RowErg UK",
      rating: 4.8,
      description: "The gold standard for full-body cardiovascular VO2 Max telemetry, metabolic pacing, and power endurance.",
      priceText: "£860.00",
      dealUrl: "https://www.amazon.co.uk/dp/B00NH9WEUA?tag=123znl0f3-21",
      badgeText: "Global Top Pick",
      imagePlaceholder: "/assets/products/concept2-rowerg-uk.jpg",
      pillar: "fitness"
    },
    {
      id: "uk-strongway-plates",
      name: "Strongway Olympic Weight Plates with Barbell",
      rating: 4.7,
      description: "Precision-cast iron plates and heavy-duty barbell designed for progressive resistance strength training.",
      priceText: "£149.00",
      dealUrl: "https://www.amazon.co.uk/dp/B0BY9NK73N?tag=123znl0f3-21",
      badgeText: "Longevity Strength",
      imagePlaceholder: "/assets/products/strongway-barbell.jpg",
      pillar: "fitness"
    },
    {
      id: "uk-xn8-gym-mat",
      name: "Xn8 Sports Tri-Fold Gymnastics Mat",
      rating: 4.7,
      description: "High-density cushioned mat supporting core work, vagal tone stretching, and daily joint mobility routines.",
      priceText: "£34.99",
      dealUrl: "https://www.amazon.co.uk/dp/B07H353SSV?tag=123znl0f3-21",
      badgeText: "Mobility Protocol",
      imagePlaceholder: "/assets/products/xn8-mat.jpg",
      pillar: "fitness"
    },
    {
      id: "uk-ovarian-test",
      name: "Ovarian Test UK",
      rating: 5.0,
      description: "Focused endocrine assessment screening for female biometrics, reproductive health, and athletic longevity.",
      priceText: "£79.00",
      dealUrl: "https://123thenextlevel.com/shop/ovarian-test-uk",
      badgeText: "Biology-Specific Screening",
      imagePlaceholder: "/assets/products/ovarian-test-uk.jpg",
      pillar: "womens-health"
    }
  ],
  ES: [
    {
      id: "es-smart-scale",
      name: "Báscula Inteligente Bluetooth 8 Electrodos",
      rating: 5.0,
      description: "Báscula médica de precisión segmentada que mide porcentaje de grasa visceral, masa muscular y agua intracelular.",
      priceText: "89,99 €",
      dealUrl: "https://www.amazon.es/dp/B0GW8GWK1Q?tag=123znl08a-21",
      badgeText: "Mapeo de Composición",
      imagePlaceholder: "/assets/products/smart-scale-es.jpg",
      pillar: "health"
    },
    {
      id: "es-treadmill",
      name: "3.0 HP Cinta de Correr 9% Inclinación",
      rating: 4.8,
      description: "Cinta de correr doméstica premium con inclinación motorizada para caminatas de movilidad y entrenamiento VO2 Max.",
      priceText: "449,00 €",
      dealUrl: "https://www.amazon.es/dp/B0DKDZYNTC?tag=123znl08a-21",
      badgeText: "Resistencia Vascular",
      imagePlaceholder: "/assets/products/treadmill-es.jpg",
      pillar: "fitness"
    },
    {
      id: "es-concept2-rowerg",
      name: "Concept2 RowErg (ES)",
      rating: 4.8,
      description: "La máquina de remo de referencia mundial para acondicionamiento cardiovascular cruzado de bajo impacto.",
      priceText: "990,00 €",
      dealUrl: "https://www.amazon.es/dp/B00NH9WEUA?tag=123znl08a-21",
      badgeText: "Top Deporte",
      imagePlaceholder: "/assets/products/concept2-rowerg-es.jpg",
      pillar: "fitness"
    }
  ]
};

/**
 * Retrieves the recommended products filtered by clinical pillar and selected market.
 *
 * @param pillar The core optimization pillar (e.g. 'health', 'fitness', 'nutrition', 'womens-health', 'wellness', 'social-fitness')
 * @param market The target localized market ('US' | 'UK' | 'ES')
 */
export function getRecommendations(pillar: string, market: 'US' | 'UK' | 'ES'): ProductRecommendation[] {
  const normalizedPillar = pillar.toLowerCase().trim();
  const products = RECOMMENDATIONS_MAP[market] || [];
  
  // Filter products by normalized clinical pillar name
  return products.filter(product => {
    const prodPillar = product.pillar.toLowerCase();
    
    // Normalize aliases for clinical pillars
    if (normalizedPillar === 'neurowellness' || normalizedPillar === 'wellness') {
      return prodPillar === 'wellness' || prodPillar === 'fitness'; // Telemetry/HRV is mapped to fitness
    }
    
    return prodPillar === normalizedPillar;
  });
}
