import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { 
  Dumbbell, 
  ChefHat, 
  Smartphone, 
  Pill, 
  Sparkles, 
  Zap, 
  Activity 
} from 'lucide-react';

type MarketTab = 'US' | 'UK' | 'ES';

// Dedicated Regional Master Registries (Guarantees strict separation across US, UK, and Spain)
const REGIONAL_MASTER_CATALOGS: Record<MarketTab, any[]> = {
  "UK": [
    {
      "id": "reagent-strips-uk",
      "name": "ALLTEST 10-Parameter Urinary Reagent Strips",
      "category": "Performance & Testing",
      "rating": 4.85,
      "description": "A visual, dip-and-read chemical test tracking 10 critical parameters (Glucose, Ketones, Specific Gravity, Blood, pH, Protein, Nitrite, Bilirubin, Urobilinogen, Leucocytes) in under 2 minutes. Zero digital screen-time.",
      "price_text": "£12.99",
      "deal_url": "https://www.amazon.co.uk/dp/B0DJM3KV8X?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "MHRA Registered",
      "image_url": "https://123thenextlevel.com/assets/images/shop/reagent-strips.png"
    },
    {
      "id": "sleep-analyzer-uk",
      "name": "Withings Medically Validated Sleep Analyzer",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.82,
      "description": "A contact-free ballistocardiography mat placed under the mattress. Logs sleeping heart rate, sleep cycles, snoring, and medically validated Sleep Apnea episodes silently overnight.",
      "price_text": "£119.99",
      "deal_url": "https://www.amazon.co.uk/dp/B0892BGFX7?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "CE Medically Validated (Apnea)",
      "image_url": "https://123thenextlevel.com/assets/images/shop/sleep-analyzer.png"
    },
    {
      "id": "stethoscope-uk",
      "name": "Eko CORE 500™ Digital AI Stethoscope",
      "category": "Performance & Testing",
      "rating": 4.95,
      "description": "FDA-cleared electronic stethoscope with 3-lead ECG. Uses clinical AI to detect murmurs, arrhythmias, and cardiac strain signs in 15 seconds, streaming waveforms safely to your clinician.",
      "price_text": "£379.00",
      "deal_url": "https://www.ekohealth.com/products/core-500-digital-stethoscope",
      "market_region": "UK",
      "badge_text": "MHRA Registered",
      "image_url": "https://123thenextlevel.com/assets/images/shop/core-500.png"
    },
    {
      "id": "blood-pressure-cuff-uk",
      "name": "Withings BPM Connect Wi-Fi Cuff",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.8,
      "description": "Smart Wi-Fi blood pressure cuff. Automatically logs systolic, diastolic, and pulse trends, classifying cardiovascular data against JNC-8 guidelines without spot-check anxiety.",
      "price_text": "£89.99",
      "deal_url": "https://www.amazon.co.uk/dp/B07SJV1HNR?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "CE Medical Class IIa",
      "image_url": "https://123thenextlevel.com/assets/images/shop/bpm-connect.png"
    },
    {
      "id": "sirtuin-stack-uk",
      "name": "Momentous Sirtuin Activation & Cell Recovery Stack",
      "category": "Supplements",
      "rating": 4.9,
      "description": "Premium NSF Certified for Sport Trans-Resveratrol, NMN, and Nattokinase. Formulated to provide biological cofactors to activate Sirtuin pathways, stabilizing chromatin loops and repairing cellular DNA.",
      "price_text": "£79.99",
      "deal_url": "https://healf.co.uk/collections/momentus",
      "market_region": "UK",
      "badge_text": "NSF Certified / UK Sourced (Healf)",
      "image_url": "https://123thenextlevel.com/assets/images/shop/sirtuin-stack.png"
    },
    {
      "id": "cgm-uk",
      "name": "Continuous Glucose Monitor (Abbott Lingo UK)",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.75,
      "description": "Real-time interstitial glucose tracking mapping energy peaks and valleys. Instantly syncs blood sugar fluctuations to target metabolic health, post-meal walks, and prevent insulin resistance.",
      "price_text": "£79.00 / month",
      "deal_url": "https://hellolingo.co.uk",
      "market_region": "UK",
      "badge_text": "MHRA Registered",
      "image_url": "https://123thenextlevel.com/assets/images/shop/cgm.png"
    },
    {
      "id": "segmental-scale-uk",
      "name": "Withings Body Scan Segmental Composition Scale",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.88,
      "description": "CE Medical-marked 8-electrode bioelectrical impedance scale. Segmentally maps skeletal muscle mass, fat percentage by limb, and visceral fat index surrounding organs to target training.",
      "price_text": "£349.99",
      "deal_url": "https://www.amazon.co.uk/dp/B0B9849CD1?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "CE Medical Marked",
      "image_url": "https://123thenextlevel.com/assets/images/shop/body-scan.png"
    },
    {
      "id": "wearable-tracker-uk",
      "name": "Apple Watch Series 10 (GPS 46mm)",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.8,
      "description": "Advanced multispectral wearable capturing sleep architecture, resting heart rate, sleep apnea flags, and sleeping Heart Rate Variability (HRV) for passive autonomic monitoring.",
      "price_text": "£379.00",
      "deal_url": "https://www.amazon.co.uk/dp/B0DGJHCPX5?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "MHRA Certified Telemetry",
      "image_url": "https://123thenextlevel.com/assets/images/shop/apple-watch.png"
    },
    {
      "id": "blood-panel-uk",
      "name": "Lola Vital Check 56 (Baseline Longevity Blood Map)",
      "category": "Performance & Testing",
      "rating": 4.98,
      "description": "Advanced, direct-to-consumer multi-omic longevity blood panel analyzing 56 primary biomarkers including ApoB, hs-CRP, and HbA1c to eliminate clinical guessing. Clinician-partnered secure digital reporting.",
      "price_text": "£149.00",
      "deal_url": "https://snwbl.io/out/NcealZ11",
      "market_region": "UK",
      "badge_text": "UKAS Accredited & ISO 9001 Certified",
      "image_url": "https://123thenextlevel.com/assets/images/shop/blood-panel.png"
    },
    {
      "id": "amazon-supp-uk-b0dd7tjzp5",
      "name": "Oxford Origins Award Winning 10-in-1 Digestive Enzyme Supplements",
      "category": "Supplements",
      "rating": 4.3,
      "description": "Award Winning 10-in-1 Digestive Enzyme Supplements | Made in The UK | Probiotics & Peppermint Oil for Gut Health, Bloating Relief and Belly Reduction | One Vegan Capsule per Meal | 60 Capsules",
      "price_text": "£9.95",
      "deal_url": "https://www.amazon.co.uk/dp/B0DD7TJZP5?tag=123znl08a-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/oxford.jpeg"
    },
    {
      "id": "amazon-supp-uk-b0cqcwkkwj",
      "name": "Applied Nutrition Marine Collagen Powder - Hydrolysed Collagen Protein, Healthy Skin, Hair, Nails (Unflavoured) (300g - 25 Servings)",
      "category": "Supplements",
      "rating": 4.2,
      "description": "Applied Nutrition Marine Collagen Powder - Hydrolysed Collagen Protein, Healthy Skin, Hair, Nails (Unflavoured) (300g - 25 Servings)",
      "price_text": "£22.50",
      "deal_url": "https://www.amazon.co.uk/dp/B0CQCWKKWJ?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/CollagenUK.jpg"
    },
    {
      "id": "amazon-supp-uk-b0dpbj26qd",
      "name": "PUROVITALIS Liposomal Quercetin Complex 150mg with Bromelain, Vitamin C & Zinc, 99% Purity, Immune Support Supplement, 1-Month Supply (30 Vegan Capsules)",
      "category": "Supplements",
      "rating": 4.3,
      "description": "PUROVITALIS Liposomal Quercetin Complex 150mg with Bromelain, Vitamin C & Zinc, 99% Purity, Immune Support Supplement, 1-Month Supply (30 Vegan Capsules)",
      "price_text": "£23.50",
      "deal_url": "https://www.amazon.co.uk/dp/B0DPBJ26QD?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/quercitin.jpeg"
    },
    {
      "id": "amazon-supp-uk-b0dhynrw5g",
      "name": "Vinco Spermidine Supplement - 10mg x 120 High Strength Spermidine Capsules - 99% Purity - Supports Healthy Ageing & Longevity - Non GMO & Gluten Free - Made in The UK",
      "category": "Supplements",
      "rating": 4.5,
      "description": "Vinco Spermidine Supplement - 10mg x 120 High Strength Spermidine Capsules - 99% Purity - Supports Healthy Ageing & Longevity - Non GMO & Gluten Free - Made in The UK",
      "price_text": "£13.99",
      "deal_url": "https://www.amazon.co.uk/dp/B0DHYNRW5G?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/spermidineuk.jpeg"
    },
    {
      "id": "amazon-supp-uk-b08tcg2rh7",
      "name": "WeightWorld Calcium, Magnesium, Zinc and Vitamin D Supplement | 1+ Year Supply | 400 Vegan Tablets | Calcium Tablets with Vitamin K2, Vitamin D, Copper & Selenium | Magnesium Stearate-Free",
      "category": "Supplements",
      "rating": 4.5,
      "description": "WeightWorld Calcium, Magnesium, Zinc and Vitamin D Supplement | 1+ Year Supply | 400 Vegan Tablets | Calcium Tablets with Vitamin K2, Vitamin D, Copper & Selenium | Magnesium Stearate-Free",
      "price_text": "£16.99",
      "deal_url": "https://www.amazon.co.uk/dp/B08TCG2RH7?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/calciumvitduk.jpeg"
    },
    {
      "id": "amazon-supp-uk-b06xrvtyn3",
      "name": "Centrum Advance Multivitamin & Mineral Supplements",
      "category": "Supplements",
      "rating": 4.4,
      "description": "24 essential nutrients including vitamin D, C, Calcium, Daily Multivitamin Tablets, 180ct",
      "price_text": "£16.46",
      "deal_url": "https://www.amazon.co.uk/dp/B06XRVTYN3?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/centrum3.jpg"
    },
    {
      "id": "amazon-supp-uk-b00ui3o5be",
      "name": "Wellman Max - Multivitamin Tablets for Men ",
      "category": "Supplements",
      "rating": 4.6,
      "description": "Formula Mix with Maximum Support for Energy, Immune System, Testosterone Level, Bone, Brain,Heart and Vision Health,",
      "price_text": "£11.39",
      "deal_url": "https://www.amazon.co.uk/dp/B00UI3O5BE?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/wellman2.jpg"
    },
    {
      "id": "amazon-supp-uk-b00x0zce2o",
      "name": "Solgar 4000IU Vitamin D3 - Healthy Teeth and Bones - Better Calcium Absorption - Pack of 120 Vegetable Capsules",
      "category": "Supplements",
      "rating": 4.7,
      "description": "Solgar 4000IU Vitamin D3 - Healthy Teeth and Bones - Better Calcium Absorption - Pack of 120 Vegetable Capsules",
      "price_text": "£18.90",
      "deal_url": "https://www.amazon.co.uk/dp/B00X0ZCE2O?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/d3.jpg"
    },
    {
      "id": "amazon-supp-uk-b00ui1o5ys",
      "name": "Wellwoman Max Multivitamin Tablets for Women,84 Count (Pack of 1)",
      "category": "Supplements",
      "rating": 4.6,
      "description": "Wellwoman Max Multivitamin Tablets for Women,84 Count (Pack of 1)",
      "price_text": "£14.06",
      "deal_url": "https://www.amazon.co.uk/dp/B00UI1O5YS?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/wellwoman3.jpg"
    },
    {
      "id": "amazon-supp-uk-b086v74kkr",
      "name": "Vitamin D3 4000IU - 1+ Year Supply - 400 Tablets - Easy to Swallow 6mm Micro Vitamin D Tablets - Gentle Cholecalciferol Form - Vegetarian-Friendly VIT D Supplement - 1 per Day - Made in the UK",
      "category": "Supplements",
      "rating": 4.6,
      "description": "Vitamin D3 4000IU - 1+ Year Supply - 400 Tablets - Easy to Swallow 6mm Micro Vitamin D Tablets - Gentle Cholecalciferol Form - Vegetarian-Friendly VIT D Supplement - 1 per Day - Made in the UK",
      "price_text": "£8.99",
      "deal_url": "https://www.amazon.co.uk/dp/B086V74KKR?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/vitamind3.jpeg"
    },
    {
      "id": "amazon-supp-uk-b0bnb8k8q5",
      "name": "NAD+ Nicotinamide Riboside Chloride 300mg- NAD Supplements - Hexagon",
      "category": "Supplements",
      "rating": 4.4,
      "description": "Hexagon NAD+ supplements deliver 300mg of Nicotinamide Riboside Chloride to effectively replenish NAD+ levels, essential for cellular repair and metabolic function. This premium formula is designed to enhance vitality, cognitive health, and overall longevity by fueling your body's mitochondria.",
      "price_text": "£64.90",
      "deal_url": "https://www.amazon.co.uk/dp/B0BNB8K8Q5?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/nadplusus.jpg"
    },
    {
      "id": "amazon-supp-uk-b08m3qrwhp",
      "name": "Vegan Vitamin D3 and K2 2500 IU | Vegan Vitamin D Supplement | Vitamin D and K2 Complex- Made in The UK, Supports Healthy Bones, Teeth and Cell Divisi",
      "category": "Supplements",
      "rating": 5,
      "description": "Vegan Vitamin D3 and K2 2500 IU | Vegan Vitamin D Supplement | Vitamin D and K2 Complex- Made in The UK, Supports Healthy Bones, Teeth and Cell Division",
      "price_text": "£43.60",
      "deal_url": "https://www.amazon.co.uk/dp/B08M3QRWHP?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/d3k2uk.jpeg"
    },
    {
      "id": "amazon-supp-uk-b00izd3yc0",
      "name": "Bulk Vitamin C Tablets, 1000 mg, Pack of 270",
      "category": "Supplements",
      "rating": 4.4,
      "description": "Bulk Vitamin C Tablets, 1000 mg, Pack of 270",
      "price_text": "£14.49",
      "deal_url": "https://www.amazon.co.uk/dp/B00IZD3YC0?tag=https://www.amazon.co.uk/dp/B0G3Y7LW1T?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/vitc.jpg"
    },
    {
      "id": "amazon-supp-uk-b0dbqzbstm",
      "name": "NAD+ Nicotinamide Riboside Chloride 300mg - +6 Months Cure - Against Age and Fatigue, NAD Booster - Pure Powder, 180 Capsules - Pharmaceutical Grade - Vegan - Hexagon",
      "category": "Supplements",
      "rating": 4.4,
      "description": "NAD+ Nicotinamide Riboside Chloride 300mg - +6 Months Cure - Against Age and Fatigue, NAD Booster - Pure Powder, 180 Capsules - Pharmaceutical Grade - Vegan - Hexagon",
      "price_text": "£99.90",
      "deal_url": "https://www.amazon.co.uk/dp/B0DBQZBSTM?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/nadplusukspain.jpg"
    },
    {
      "id": "amazon-supp-uk-b0b4bbnd37",
      "name": "Ancient + Brave - True Collagen -100% Hydrolyzed Collagen Peptides Powder, 200g - Pure Pasture-Fed Bovine Collagen - High Protein, Ideal Fasting & Keto - Skin, Hair & Nails",
      "category": "Supplements",
      "rating": 4.5,
      "description": "Ancient + Brave - True Collagen -100% Hydrolyzed Collagen Peptides Powder, 200g - Pure Pasture-Fed Bovine Collagen - High Protein, Ideal Fasting & Keto - Skin, Hair & Nails",
      "price_text": "£25.60",
      "deal_url": "https://www.amazon.co.uk/dp/B0B4BBND37?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/ancientbrave.jpeg"
    },
    {
      "id": "amazon-supp-uk-b00lke1q44",
      "name": "Myprotein Impact Creatine Monohydrate Tablets – High Strength Pure Creatine Pills to Boost High-Intensity Performance – Micronised Creatine Supplement – 250 Tablets (3 Months Supply) – Vegan Friendly",
      "category": "Supplements",
      "rating": 4.4,
      "description": "Myprotein Impact Creatine Monohydrate Tablets – High Strength Pure Creatine Pills to Boost High-Intensity Performance – Micronised Creatine Supplement – 250 Tablets (3 Months Supply) – Vegan Friendly",
      "price_text": "£18.78",
      "deal_url": "https://www.amazon.co.uk/dp/B00LKE1Q44?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/impactcreatine.jpeg"
    },
    {
      "id": "amazon-supp-uk-b084g5xc29",
      "name": "Omega 3 Fish Oil 2000mg - 240 Softgels (4 Months Supply) - 660mg EPA & 440mg DHA - Omega 3 Fatty Acids Supplements - Non-GMO, Gluten-Free & Lactose-Free - Fish Oil Capsules - Made in the UK",
      "category": "Supplements",
      "rating": 4.6,
      "description": "Omega 3 Fish Oil 2000mg - 240 Softgels (4 Months Supply) - 660mg EPA & 440mg DHA - Omega 3 Fatty Acids Supplements - Non-GMO, Gluten-Free & Lactose-Free - Fish Oil Capsules - Made in the UK",
      "price_text": "£16.99",
      "deal_url": "https://www.amazon.co.uk/dp/B084G5XC29?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/omega3fish.jpeg"
    },
    {
      "id": "amazon-supp-uk-b0dhvh8mcg",
      "name": "Fast&Up Reload – Energising Electrolyte Drink - Variety Pack - 80 Effervescent Hydration Tablets - Added Vitamin C & B12 - Vegan",
      "category": "Supplements",
      "rating": 4.3,
      "description": "Fast&Up Reload – Energising Electrolyte Drink - Variety Pack - 80 Effervescent Hydration Tablets - Added Vitamin C & B12 - Vegan",
      "price_text": "£12.65",
      "deal_url": "https://www.amazon.co.uk/dp/B0DHVH8MCG?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/electrolytes.jpeg"
    },
    {
      "id": "amazon-supp-uk-b0bk8x47m5",
      "name": "Vegavero Pure Glycine Powder 1 kg | 3000 mg Daily Dose | NO Additives, Lab-Tested | Recovery, Muscle & Collagen Synthesis | with Measuring Spoon | Vegan",
      "category": "Supplements",
      "rating": 4.5,
      "description": "Vegavero Pure Glycine Powder 1 kg | 3000 mg Daily Dose | NO Additives, Lab-Tested | Recovery, Muscle & Collagen Synthesis | with Measuring Spoon | Vegan",
      "price_text": "£20.39",
      "deal_url": "https://www.amazon.co.uk/dp/B0BK8X47M5?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/glycine.jpeg"
    },
    {
      "id": "amazon-supp-uk-b0c9vvcl12",
      "name": "Magnesium Glycinate 3-in-1 Complex - 1800mg Supplements as Bisglycinate, Citrate & Malate 90 Vegan Capsules, Triple High Absorption 384mg Elemental, UK Made",
      "category": "Supplements",
      "rating": 4.4,
      "description": "Magnesium Glycinate 3-in-1 Complex - 1800mg Supplements as Bisglycinate, Citrate & Malate 90 Vegan Capsules, Triple High Absorption 384mg Elemental, UK Made",
      "price_text": "£8.49",
      "deal_url": "https://www.amazon.co.uk/dp/B0C9VVCL12?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/magnesiumglycinate.jpeg"
    },
    {
      "id": "amazon-supp-uk-b0c9twkqqv",
      "name": "Lions Mane Supplement 4000mg with Vitamin B1 & Black Pepper, 180 Vegan Tablets - Lion's Mane Mushroom 15:1 Extract (Not Lions Mane Powder or Capsules), UK Made for Mental Performance & Nervous System",
      "category": "Supplements",
      "rating": 4.4,
      "description": "Lions Mane Supplement 4000mg with Vitamin B1 & Black Pepper, 180 Vegan Tablets - Lion's Mane Mushroom 15:1 Extract (Not Lions Mane Powder or Capsules), UK Made for Mental Performance & Nervous System",
      "price_text": "£8.49",
      "deal_url": "https://www.amazon.co.uk/dp/B0C9TWKQQV?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/lionsmane.jpeg"
    },
    {
      "id": "amazon-supp-uk-b0fh7fxxb5",
      "name": "CoQ10 Ubiquinol 400mg – 180 Capsules – 6 Month Supply - High Strength – Active Form – Bioavailable Coenzyme Q10 Supplement",
      "category": "Supplements",
      "rating": 4.7,
      "description": "CoQ10 Ubiquinol 400mg – 180 Capsules – 6 Month Supply - High Strength – Active Form – Bioavailable Coenzyme Q10 Supplement",
      "price_text": "£29.99",
      "deal_url": "https://www.amazon.co.uk/dp/B0FH7FXXB5?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/coq10.jpeg"
    },
    {
      "id": "amazon-supp-uk-b0dqqdzgcw",
      "name": "Pure Creatine Monohydrate Powder - 315g (90 Servings) - Easy Dissolve Creatine Powder, Unflavoured & Micronised (Not Creatine Gummies or Creatine Tablets), Vegan Creatine for Women and Men",
      "category": "Supplements",
      "rating": 4.5,
      "description": "Pure Creatine Monohydrate Powder - 315g (90 Servings) - Easy Dissolve Creatine Powder, Unflavoured & Micronised (Not Creatine Gummies or Creatine Tablets), Vegan Creatine for Women and Men",
      "price_text": "£8.49",
      "deal_url": "https://www.amazon.co.uk/dp/B0DQQDZGCW?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/creatinemono.jpeg"
    },
    {
      "id": "amazon-supp-uk-b084hh913j",
      "name": "Igennus Super B-Complex - High Absorption Methylated B Vitamins, Clean Label, 180 Sustained Release Tablets - Complete Spectrum of B Vitamins with Folate, Boosted B12 & Vitamin C, 90 Servings",
      "category": "Supplements",
      "rating": 4.6,
      "description": "Igennus Super B-Complex - High Absorption Methylated B Vitamins, Clean Label, 180 Sustained Release Tablets - Complete Spectrum of B Vitamins with Folate, Boosted B12 & Vitamin C, 90 Servings",
      "price_text": "£22.09",
      "deal_url": "https://www.amazon.co.uk/dp/B084HH913J?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/methylatedbcomplex.jpeg"
    },
    {
      "id": "amazon-supp-uk-b0c111hff4",
      "name": "Ashwagandha KSM 66 Complex – 3000mg Enhanced with L-Tryptophan & Vitamin B6 (2 Month Supply) – Ashwagandha High Strength Capsules with 250mg Extract (Not Gummies or Powder) - Vegan, UK Made",
      "category": "Supplements",
      "rating": 4.5,
      "description": "Ashwagandha KSM 66 Complex – 3000mg Enhanced with L-Tryptophan & Vitamin B6 (2 Month Supply) – Ashwagandha High Strength Capsules with 250mg Extract (Not Gummies or Powder) - Vegan, UK Made",
      "price_text": "£7.64",
      "deal_url": "https://www.amazon.co.uk/dp/B0C111HFF4?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/ashgawanda.jpeg"
    },
    {
      "id": "amazon-supp-uk-b0892pb4rd",
      "name": "Kinetica Sports Creapure® 100% Creatine Monohydrate Powder - Unflavoured | 3.4g Creatine/Serve, 147 Servings/500g Pack | Vegan & Gluten Free | Optimum for High Physical Performance & Muscle Power",
      "category": "Supplements",
      "rating": 4.6,
      "description": "Kinetica Sports Creapure® 100% Creatine Monohydrate Powder - Unflavoured | 3.4g Creatine/Serve, 147 Servings/500g Pack | Vegan & Gluten Free | Optimum for High Physical Performance & Muscle Power",
      "price_text": "£31.44",
      "deal_url": "https://www.amazon.co.uk/dp/B0892PB4RD?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/creatineKinetica.jpeg"
    },
    {
      "id": "amazon-supp-uk-b077j3bfln",
      "name": "NKD Living Inulin High Grade Prebiotic Fibre Powder (1 Kg) - Manufactured in the EU - Fibre Prebiotic Supplement",
      "category": "Supplements",
      "rating": 4.6,
      "description": "NKD Living Inulin High Grade Prebiotic Fibre Powder (1 Kg) - Manufactured in the EU - Fibre Prebiotic Supplement",
      "price_text": "£12.99",
      "deal_url": "https://www.amazon.co.uk/dp/B077J3BFLN?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/prebioticfibre.jpeg"
    },
    {
      "id": "amazon-supp-uk-b07zkmcn2z",
      "name": "Bio Cultures Complex Probiotics and Prebiotics - 77 Billion CFU - 20 Live Cultures - 60 Capsules - Strains Like Lactobacillus Acidophilus & Casei - Prebiotic and Probiotic Supplements for Women & Men",
      "category": "Supplements",
      "rating": 4.5,
      "description": "Bio Cultures Complex Probiotics and Prebiotics - 77 Billion CFU - 20 Live Cultures - 60 Capsules - Strains Like Lactobacillus Acidophilus & Casei - Prebiotic and Probiotic Supplements for Women & Men",
      "price_text": "£16.98",
      "deal_url": "https://www.amazon.co.uk/dp/B07ZKMCN2Z?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/bioculturescomplex.jpeg"
    },
    {
      "id": "amazon-supp-uk-b005a6964u",
      "name": "Designs for Health Magnesium Glycinate Complex - Chelated Bisglycinate Formula - 300 mg Magnesium per Serving - Supports Bones, Muscles, Energy & Nervous System - Vegan, Non-GMO - 240 Capsules",
      "category": "Supplements",
      "rating": 4.7,
      "description": "Designs for Health Magnesium Glycinate Complex - Chelated Bisglycinate Formula - 300 mg Magnesium per Serving - Supports Bones, Muscles, Energy & Nervous System - Vegan, Non-GMO - 240 Capsules",
      "price_text": "£45.31",
      "deal_url": "https://www.amazon.co.uk/dp/B005A6964U?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "UK GMP Certified",
      "image_url": "https://123thenextlevel.com/Products/maglycinatees.jpeg"
    },
    {
      "id": "amazon-fitness-uk-rower",
      "name": "Concept2 Remo Indoor Model D Rower",
      "category": "Fitness",
      "rating": 4.95,
      "description": "The gold-standard indoor rowing machine with PM5 monitor to optimize cardiorespiratory output, muscular baseline, and metabolic power.",
      "price_text": "£850.00",
      "deal_url": "https://www.amazon.co.uk/dp/B099KBD9X8?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "PM5 Clinical Standard",
      "image_url": "https://123thenextlevel.com/assets/images/shop/rower.png"
    },
    {
      "id": "amazon-fitness-uk-kettlebell",
      "name": "Bowflex SelectTech 840 Adjustable Kettlebell",
      "category": "Fitness",
      "rating": 4.88,
      "description": "Adjusts from 3.5kg to 18kg with the turn of a dial for rapid eccentric loading, posterior chain power, and functional hypertrophy.",
      "price_text": "£139.00",
      "deal_url": "https://www.amazon.co.uk/dp/B07V2C6374?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "6-in-1 Compact Weight",
      "image_url": "https://123thenextlevel.com/assets/images/shop/rower.png"
    },
    {
      "id": "amazon-kitchen-uk-blender",
      "name": "NutriBullet 1200 Series High-Speed Blender",
      "category": "Kitchen",
      "rating": 4.9,
      "description": "High-speed precision cyclonic nutrient extractor designed to pulverize tough cell walls of leafy greens, seeds, and longevity superfoods.",
      "price_text": "£99.99",
      "deal_url": "https://www.amazon.co.uk/dp/B08524B5C6?tag=123znl0f3-21",
      "market_region": "UK",
      "badge_text": "1200W High Speed",
      "image_url": "https://123thenextlevel.com/assets/images/shop/water-bottle.png"
    }
  ],
  "US": [
    {
      "id": "sleep-analyzer-us",
      "name": "Withings Sleep Analyzer Under-Mattress Pad",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.82,
      "description": "A contact-free ballistocardiography mat placed under the mattress. Logs sleeping heart rate, sleep cycles, snoring, and passive breathing disturbances, transferring data silently upon waking.",
      "price_text": "$129.95",
      "deal_url": "https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20",
      "market_region": "US",
      "badge_text": "Touch-Free Sleep Science",
      "image_url": "https://123thenextlevel.com/assets/images/shop/sleep-analyzer.png"
    },
    {
      "id": "segmental-scale-us",
      "name": "Withings Body Scan Segmental Composition Scale",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.88,
      "description": "FDA-cleared 8-electrode bioelectrical impedance scale. Segmentally maps skeletal muscle mass, fat percentage by limb, and visceral fat index surrounding organs to target training.",
      "price_text": "$399.95",
      "deal_url": "https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20",
      "market_region": "US",
      "badge_text": "FDA Cleared",
      "image_url": "https://123thenextlevel.com/assets/images/shop/body-scan.png"
    },
    {
      "id": "reagent-strips-us",
      "name": "ALLTEST 10-Parameter Urinary Reagent Strips",
      "category": "Performance & Testing",
      "rating": 4.85,
      "description": "A visual, dip-and-read chemical test tracking 10 critical parameters (Glucose, Ketones, Specific Gravity, Blood, pH, Protein, Nitrite, Bilirubin, Urobilinogen, Leucocytes) in under 2 minutes. Zero digital screen-time.",
      "price_text": "$14.99",
      "deal_url": "https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20",
      "market_region": "US",
      "badge_text": "FDA Cleared & CLIA Waived",
      "image_url": "https://123thenextlevel.com/assets/images/shop/reagent-strips.png"
    },
    {
      "id": "sirtuin-stack-us",
      "name": "Momentous Sirtuin Activation & Cell Recovery Stack",
      "category": "Supplements",
      "rating": 4.9,
      "description": "Premium NSF Certified for Sport Trans-Resveratrol, NMN, and Nattokinase. Formulated to provide biological cofactors to activate Sirtuin pathways, stabilizing chromatin loops and repairing cellular DNA.",
      "price_text": "$89.95",
      "deal_url": "https://livemomentous.com/modernwisdom?code=modernwisdom",
      "market_region": "US",
      "badge_text": "NSF Certified for Sport",
      "image_url": "https://123thenextlevel.com/assets/images/shop/sirtuin-stack.png"
    },
    {
      "id": "stethoscope-us",
      "name": "Eko CORE 500™ Digital AI Stethoscope",
      "category": "Performance & Testing",
      "rating": 4.95,
      "description": "FDA-cleared electronic stethoscope with 3-lead ECG. Uses clinical AI to detect murmurs, arrhythmias, and cardiac strain signs in 15 seconds, streaming waveforms safely to your clinician.",
      "price_text": "$429.00",
      "deal_url": "https://www.ekohealth.com/products/core-500-digital-stethoscope",
      "market_region": "US",
      "badge_text": "FDA Cleared AI Auscultation",
      "image_url": "https://123thenextlevel.com/assets/images/shop/core-500.png"
    },
    {
      "id": "blood-pressure-cuff-us",
      "name": "Withings BPM Connect Wi-Fi Cuff",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.8,
      "description": "Smart Wi-Fi blood pressure cuff. Automatically logs systolic, diastolic, and pulse trends, classifying cardiovascular data against JNC-8 guidelines without spot-check anxiety.",
      "price_text": "$99.95",
      "deal_url": "https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20",
      "market_region": "US",
      "badge_text": "FDA Cleared",
      "image_url": "https://123thenextlevel.com/assets/images/shop/bpm-connect.png"
    },
    {
      "id": "wearable-tracker-us",
      "name": "Apple Watch Series 10 (GPS 46mm)",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.8,
      "description": "Advanced multispectral wearable capturing sleep architecture, resting heart rate, sleep apnea flags, and sleeping Heart Rate Variability (HRV) for passive autonomic monitoring.",
      "price_text": "$399.00",
      "deal_url": "https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20",
      "market_region": "US",
      "badge_text": "FDA Approved Heart Notifications",
      "image_url": "https://123thenextlevel.com/assets/images/shop/apple-watch.png"
    },
    {
      "id": "blood-panel-us",
      "name": "Personalized Cellular Biomarker Map (56 Biomarkers)",
      "category": "Performance & Testing",
      "rating": 4.92,
      "description": "Direct-to-consumer longevity blood panels mapping 56 essential biomarkers—including ApoB (cardiovascular plaque risk), HbA1c, and hs-CRP. Draws are completed at local Quest or Labcorp patient centers.",
      "price_text": "$299.00",
      "deal_url": "https://www.healthlabs.com/?affiliate=123znl",
      "market_region": "US",
      "badge_text": "CLIA Certified & CAP Accredited",
      "image_url": "https://123thenextlevel.com/assets/images/shop/blood-panel.png"
    },
    {
      "id": "cgm-us",
      "name": "Continuous Glucose Monitor (Abbott Lingo / Dexcom Stelo)",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.75,
      "description": "Real-time interstitial glucose tracking mapping energy peaks and valleys. Instantly syncs blood sugar fluctuations to target metabolic health, post-meal walks, and prevent insulin resistance.",
      "price_text": "$89.00 / month",
      "deal_url": "https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20",
      "market_region": "US",
      "badge_text": "FDA Cleared / OTC Eligible",
      "image_url": "https://123thenextlevel.com/assets/images/shop/cgm.png"
    },
    {
      "id": "amazon-supp-us-b004u3y8om",
      "name": "Nature Made Vitamin D3 1000 IU (25 mcg), Vitamin D Supplement for Bone, Teeth, Muscle and Immune Health Support, 300 Softgels, 300 Day Supply",
      "category": "Supplements",
      "rating": 4.8,
      "description": "Vitamin D Supplement for Bone, Teeth, Muscle and Immune Health Support, 300 Softgels, 300 Day Supply",
      "price_text": "$9.99",
      "deal_url": "https://www.amazon.com/dp/B004U3Y8OM?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/vitd3.jpg"
    },
    {
      "id": "amazon-supp-us-b07tk5k5tq",
      "name": "RU NIAGEN Patented NAD Supplement for Brain Function, Anti Aging & Cell Regeneration, 300mg Niagen, 30 Servings | Supports Cellular Energy, Muscle | Nicotinamide Riboside (NR) Take 1 Daily | 1 Bottle",
      "category": "Supplements",
      "rating": 4.4,
      "description": "RU NIAGEN Patented NAD Supplement for Brain Function, Anti Aging & Cell Regeneration, 300mg Niagen, 30 Servings | Supports Cellular Energy, Muscle | Nicotinamide Riboside (NR) Take 1 Daily | 1 Bottle",
      "price_text": "$49.00",
      "deal_url": "https://www.amazon.com/dp/B07TK5K5TQ?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/nadplusus.jpg"
    },
    {
      "id": "amazon-supp-us-b07dx89zhn",
      "name": "Sports Research® Omega-3 Fish Oil 1250 - Triple Strength Fish Oil Supplement from Wild Alaska Pollock - MSC Certified Sustainable · Non-GMO · Soy Free - 90 Softgel Capsules",
      "category": "Supplements",
      "rating": 4.7,
      "description": "Triple Strength Fish Oil Supplement from Wild Alaska Pollock - MSC Certified Sustainable · Non-GMO · Soy Free - 90 Softgel Capsules",
      "price_text": "$22.36",
      "deal_url": "https://www.amazon.com/dp/B07DX89ZHN?tag=123znl0e-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/omega3.jpg"
    },
    {
      "id": "amazon-supp-us-b079h53d2b",
      "name": "Physician's CHOICE Probiotics 60 Billion CFU - 10 Strains + Organic Prebiotics - Immune, Digestive & Gut Health - Supports Occasional Constipation, Diarrhea, Gas & Bloating - for Women & Men - 30ct",
      "category": "Supplements",
      "rating": 4.6,
      "description": "Probiotics 60 Billion CFU - 10 Strains + Organic Prebiotics - Immune, Digestive & Gut Health - Supports Occasional Constipation, Diarrhea, Gas & Bloating - for Women & Men - 30ct",
      "price_text": "$23.97",
      "deal_url": "https://www.amazon.com/dp/B079H53D2B?tag=123znl0e-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/probio.jpg"
    },
    {
      "id": "amazon-supp-us-b00fotmgtu",
      "name": "THORNE - Basic Nutrients 2/Day - Comprehensive Daily Multi-Vitamin with Optimal Bioavailability - Vitamin & Mineral Formula - Third-Party Certified - Gluten, Dairy & Soy-Free - 60 Capsules",
      "category": "Supplements",
      "rating": 4.2,
      "description": " Comprehensive Daily Multi-Vitamin with Optimal Bioavailability - Vitamin & Mineral Formula - Third-Party Certified - Gluten, Dairy & Soy-Free - 60 Capsules",
      "price_text": "$36.00",
      "deal_url": "https://www.amazon.com/dp/B00FOTMGTU?tag=123znl0e-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/thorne.jpg"
    },
    {
      "id": "amazon-supp-us-b0000djasy",
      "name": "Nature Made Vitamin C 1000 mg Extra Strength, Dietary Supplement for Immune Support, 100 Tablets, 100 Day Supply",
      "category": "Supplements",
      "rating": 4.8,
      "description": "Dietary Supplement for Immune Support, 100 Tablets, 100 Day Supply",
      "price_text": "$9.50",
      "deal_url": "https://www.amazon.com/dp/B0000DJASY?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/vitc.jpg"
    },
    {
      "id": "amazon-supp-us-b084jvn2vt",
      "name": "Real Mushrooms Lion’s Mane Supplement Capsules - Organic Lions Mane Extract for Overall Wellbeing - Beta Glucan Supplements – Vegan 300 ct Mushroom Extract",
      "category": "Supplements",
      "rating": 4.5,
      "description": "Real Mushrooms Lion’s Mane Supplement Capsules - Organic Lions Mane Extract for Overall Wellbeing - Beta Glucan Supplements – Vegan 300 ct Mushroom Extract",
      "price_text": "$55.96",
      "deal_url": "https://www.amazon.com/dp/B084JVN2VT?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/lionsmaneus.webp"
    },
    {
      "id": "amazon-supp-us-b09np4mpqb",
      "name": "Spermidine Supplement (10mg of 99% Spermidine 3HCL - Third Party Tested) 120 Capsules - Over 100x More Potent Than Wheat Germ Extract for Cell Membrane, Telomere Health and Aging by Double Wood",
      "category": "Supplements",
      "rating": 4.4,
      "description": "Spermidine Supplement (10mg of 99% Spermidine 3HCL - Third Party Tested) 120 Capsules - Over 100x More Potent Than Wheat Germ Extract for Cell Membrane, Telomere Health and Aging by Double Wood",
      "price_text": "$39.95",
      "deal_url": "https://www.amazon.com/dp/B09NP4MPQB?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/spermidineus.jpeg"
    },
    {
      "id": "amazon-supp-us-b0cyzt7js9",
      "name": "BioEmblem Triple Magnesium Complex 180 Capsules with Vitamin D3 K2 90 Capsules",
      "category": "Supplements",
      "rating": 4.9,
      "description": "BioEmblem Triple Magnesium Complex 180 Capsules with Vitamin D3 K2 90 Capsules",
      "price_text": "$59.99",
      "deal_url": "https://www.amazon.com/dp/B0CYZT7JS9?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/d3k2us.jpeg"
    },
    {
      "id": "amazon-supp-us-b0f62vd96r",
      "name": "ZEBORA Marine Collagen Peptides Powder 50 Servings - Wild Caught Hydrolyzed Fish Collagen with Hyaluronic Acid, Keratin, Multivitamins - Collagen for Women Support Skin Hair Nail Joint, Keto Friendly",
      "category": "Supplements",
      "rating": 4.7,
      "description": "ZEBORA Marine Collagen Peptides Powder 50 Servings - Wild Caught Hydrolyzed Fish Collagen with Hyaluronic Acid, Keratin, Multivitamins - Collagen for Women Support Skin Hair Nail Joint, Keto Friendly",
      "price_text": "$23.07",
      "deal_url": "https://www.amazon.com/dp/B0F62VD96R?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/CollagenUS.jpg"
    },
    {
      "id": "amazon-supp-us-b01mz6yi2a",
      "name": "New Chapter Calcium Supplement - Bone Strength Plant-Based USDA Organic Calcium with Magnesium, Vitamin D3+K2, for Bone Health & Joint Mobility, Heart Support, 905 mg dose - 120 Slim Tablets",
      "category": "Supplements",
      "rating": 4.6,
      "description": "New Chapter Calcium Supplement - Bone Strength Plant-Based USDA Organic Calcium with Magnesium, Vitamin D3+K2, for Bone Health & Joint Mobility, Heart Support, 905 mg dose - 120 Slim Tablets",
      "price_text": "$41.97",
      "deal_url": "https://www.amazon.com/dp/B01MZ6YI2A?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/calciumvitdspain.jpeg"
    },
    {
      "id": "amazon-supp-us-b002j0rhtq",
      "name": "NOW Foods Supplements, Glycine 1,000 mg Free-Form, Neurotransmitter Support*, 100 Veg Capsules",
      "category": "Supplements",
      "rating": 4.6,
      "description": "NOW Foods Supplements, Glycine 1,000 mg Free-Form, Neurotransmitter Support*, 100 Veg Capsules",
      "price_text": "$11.00",
      "deal_url": "https://www.amazon.com/dp/B002J0RHTQ?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/lysineus.webp"
    },
    {
      "id": "amazon-supp-us-b0055ouoqq",
      "name": "Qunol Ultra CoQ10 100mg, 3x Better Absorption, Patented Water and Fat Soluble Natural Supplement Form of Coenzyme Q10, Antioxidant for Heart Health, 120 Count Softgels",
      "category": "Supplements",
      "rating": 4.7,
      "description": "Qunol Ultra CoQ10 100mg, 3x Better Absorption, Patented Water and Fat Soluble Natural Supplement Form of Coenzyme Q10, Antioxidant for Heart Health, 120 Count Softgels",
      "price_text": "$29.97",
      "deal_url": "https://www.amazon.com/dp/B0055OUOQQ?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/coq10us.webp"
    },
    {
      "id": "amazon-supp-us-b01evvqx9u",
      "name": "Nutricost Creatine Monohydrate Micronized Powder (1 KG) - Pure Creatine Monohydrate",
      "category": "Supplements",
      "rating": 4.7,
      "description": "Nutricost Creatine Monohydrate Micronized Powder (1 KG) - Pure Creatine Monohydrate",
      "price_text": "$31.96",
      "deal_url": "https://www.amazon.com/dp/B01EVVQX9U?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/creatineus.webp"
    },
    {
      "id": "amazon-supp-us-b01iigq5kg",
      "name": "Sugar Free – Lemonade, 90 Servings – Hydration Powder with 6 Key Electrolytes and Trace Minerals – Keto Friendly, Vegan, Non-GMO",
      "category": "Supplements",
      "rating": 4.7,
      "description": "Sugar Free – Lemonade, 90 Servings – Hydration Powder with 6 Key Electrolytes and Trace Minerals – Keto Friendly, Vegan, Non-GMO",
      "price_text": "$35.99",
      "deal_url": "https://www.amazon.com/dp/B01IIGQ5KG?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/electrolyteus.webp"
    },
    {
      "id": "amazon-supp-us-b00cx3asfe",
      "name": "Benefiber Daily Prebiotic GLP-1 Friendly Fiber Supplement Powder for Digestive Health, Unflavored - 250 Teaspoons (17.6 Ounces)",
      "category": "Supplements",
      "rating": 4.7,
      "description": "Benefiber Daily Prebiotic GLP-1 Friendly Fiber Supplement Powder for Digestive Health, Unflavored - 250 Teaspoons (17.6 Ounces)",
      "price_text": "$23.49",
      "deal_url": "https://www.amazon.com/dp/B00CX3ASFE?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/prefiberus.webp"
    },
    {
      "id": "amazon-supp-us-b003pge98k",
      "name": "ORGANIC INDIA Ashwagandha Capsules - Organic Ashwagandha Supplement - Vegan Ashwagandha Root, Gluten-Free, Kosher, Non-GMO, Supports Stress Relief, Energy, and Sleep - 90 Capsules",
      "category": "Supplements",
      "rating": 4.5,
      "description": "ORGANIC INDIA Ashwagandha Capsules - Organic Ashwagandha Supplement - Vegan Ashwagandha Root, Gluten-Free, Kosher, Non-GMO, Supports Stress Relief, Energy, and Sleep - 90 Capsules",
      "price_text": "$16.99",
      "deal_url": "https://www.amazon.com/dp/B003PGE98K?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/ashgawandaus.webp"
    },
    {
      "id": "amazon-supp-us-b086rqvndv",
      "name": "Nature Made Magnesium Glycinate 200 mg per serving, Magnesium Supplement for Muscle, Heart, Nerve and Bone Support, 180 Magnesium Bisglycinate Capsules, 90 Day Supply",
      "category": "Supplements",
      "rating": 4.6,
      "description": "Nature Made Magnesium Glycinate 200 mg per serving, Magnesium Supplement for Muscle, Heart, Nerve and Bone Support, 180 Magnesium Bisglycinate Capsules, 90 Day Supply",
      "price_text": "$33.60",
      "deal_url": "https://www.amazon.com/dp/B086RQVNDV?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/magglycinateus.webp"
    },
    {
      "id": "amazon-supp-us-b0dllhrvly",
      "name": "Micro Ingredients Pure Methylated B Complex, 240 Capsules | 11-in-1 Formula with Methylfolate, B12, Thiamin, Inositol, Choline, & Fat Soluble Vitamin C | Clean Ingredients Without Fillers | Non-GMO",
      "category": "Supplements",
      "rating": 4.7,
      "description": "Micro Ingredients Pure Methylated B Complex, 240 Capsules | 11-in-1 Formula with Methylfolate, B12, Thiamin, Inositol, Choline, & Fat Soluble Vitamin C | Clean Ingredients Without Fillers | Non-GMO",
      "price_text": "$20.48",
      "deal_url": "https://www.amazon.com/dp/B0DLLHRVLY?tag=123znl08-20",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://123thenextlevel.com/Products/methylatedBcomplexus.webp"
    },
    {
      "id": "amazon-supp-us-b0mitonad",
      "name": "Mitochondrial NAD+ Precursor",
      "category": "Supplements",
      "rating": 5,
      "description": "Advanced mitochondrial support with NAD+ precursors for cellular energy.",
      "price_text": "$59.99",
      "deal_url": "https://www.amazon.com/Amazon-Basics-Portablel-Smoothie-Portable/dp/B0DKV95176?ref_=ast_sto_dp",
      "market_region": "US",
      "badge_text": "FDA / GMP Verified",
      "image_url": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "amazon-fitness-us-rower",
      "name": "Concept2 Remo Indoor Model D Rower",
      "category": "Fitness",
      "rating": 4.95,
      "description": "The gold-standard indoor rowing machine with PM5 monitor to optimize cardiorespiratory output, muscular baseline, and metabolic power.",
      "price_text": "$990.00",
      "deal_url": "https://www.amazon.com/dp/B099KBD9X8?tag=123znl0e-20",
      "market_region": "US",
      "badge_text": "PM5 Clinical Standard",
      "image_url": "https://123thenextlevel.com/assets/images/shop/rower.png"
    },
    {
      "id": "amazon-fitness-us-kettlebell",
      "name": "Bowflex SelectTech 840 Adjustable Kettlebell",
      "category": "Fitness",
      "rating": 4.88,
      "description": "Adjusts from 8 to 40 lbs with the turn of a dial for rapid eccentric loading, posterior chain power, and functional hypertrophy.",
      "price_text": "$149.00",
      "deal_url": "https://www.amazon.com/dp/B07V2C6374?tag=123znl0e-20",
      "market_region": "US",
      "badge_text": "6-in-1 Compact Weight",
      "image_url": "https://123thenextlevel.com/assets/images/shop/rower.png"
    },
    {
      "id": "amazon-kitchen-us-blender",
      "name": "NutriBullet 1200 Series High-Speed Blender",
      "category": "Kitchen",
      "rating": 4.9,
      "description": "High-speed precision cyclonic nutrient extractor designed to pulverize tough cell walls of leafy greens, seeds, and longevity superfoods.",
      "price_text": "$109.99",
      "deal_url": "https://www.amazon.com/dp/B08524B5C6?tag=123znl0e-20",
      "market_region": "US",
      "badge_text": "1200W High Speed",
      "image_url": "https://123thenextlevel.com/assets/images/shop/water-bottle.png"
    }
  ],
  "ES": [
    {
      "id": "sirtuin-stack-es",
      "name": "Paquete de Activación de Sirtuina y Recuperación Celular Momentous",
      "category": "Supplements",
      "rating": 4.9,
      "description": "Trans-Resveratrol, NMN y Natokinasa de alta calidad con certificación NSF para el deporte. Proporciona cofactores para activar las vías de sirtuinas.",
      "price_text": "89,95€",
      "deal_url": "https://newtra.eu",
      "market_region": "ES",
      "badge_text": "Customs-Safe EU Delivery (Newtra)",
      "image_url": "https://123thenextlevel.com/assets/images/shop/sirtuin-stack.png"
    },
    {
      "id": "blood-pressure-cuff-es",
      "name": "Withings BPM Connect Tensiómetro Inteligente",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.8,
      "description": "Tensiómetro inteligente Wi-Fi. Registra automáticamente las tendencias cardiovasculares en su panel de control privado.",
      "price_text": "99,95€",
      "deal_url": "https://www.amazon.es/dp/B07SJV1HNR?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "CE Medical Class IIa",
      "image_url": "https://123thenextlevel.com/assets/images/shop/bpm-connect.png"
    },
    {
      "id": "segmental-scale-es",
      "name": "Báscula de Composición Segmentaria Withings Body Scan",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.88,
      "description": "Báscula médica de impedancia con 8 electrodos. Mapea la masa muscular y el índice de grasa visceral para guiar los ciclos metabólicos.",
      "price_text": "399,95€",
      "deal_url": "https://www.amazon.es/dp/B0B9849CD1?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "CE Medical Marked",
      "image_url": "https://123thenextlevel.com/assets/images/shop/body-scan.png"
    },
    {
      "id": "blood-panel-es",
      "name": "Mapa de Biomarcadores Celulares Personalizados Melio (56 Biomarcadores)",
      "category": "Performance & Testing",
      "rating": 4.92,
      "description": "Análisis de sangre integral directo al consumidor que cubre 56 biomarcadores metabólicos y cardiovasculares. Extracción privada en centros colaboradores Megalab o Unilabs de España.",
      "price_text": "149,00€",
      "deal_url": "https://www.melio.es",
      "market_region": "ES",
      "badge_text": "CE Marked & Megalab/Unilabs Certified",
      "image_url": "https://123thenextlevel.com/assets/images/shop/blood-panel.png"
    },
    {
      "id": "wearable-tracker-es",
      "name": "Apple Watch Series 10 (GPS 46mm)",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.8,
      "description": "Reloj inteligente avanzado con sensores multiespectrales para monitorizar la variabilidad de la frecuencia cardíaca nocturna (HRV).",
      "price_text": "399,00€",
      "deal_url": "https://www.amazon.es/dp/B0DGJG692K?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "CE Compliant Biometrics",
      "image_url": "https://123thenextlevel.com/assets/images/shop/apple-watch.png"
    },
    {
      "id": "cgm-es",
      "name": "Monitor Continuo de Glucosa (Dexcom ONE+ / Abbott Libre)",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.75,
      "description": "Monitoreo de glucosa en tiempo real que mapea picos de energía. Sincroniza datos para optimizar la nutrición metabólica.",
      "price_text": "79,00€ / mes",
      "deal_url": "https://www.dexcom.com/es-ES",
      "market_region": "ES",
      "badge_text": "CE Marked / Pharmacy Approved",
      "image_url": "https://123thenextlevel.com/assets/images/shop/cgm.png"
    },
    {
      "id": "stethoscope-es",
      "name": "Estetoscopio Digital con IA Eko CORE 500™",
      "category": "Performance & Testing",
      "rating": 4.95,
      "description": "Estetoscopio electrónico con ECG de 3 derivaciones. Utiliza IA clínica para evaluar soplos cardíacos y arritmias en 15 segundos.",
      "price_text": "429,00€",
      "deal_url": "https://www.doccheck.com/es/",
      "market_region": "ES",
      "badge_text": "CE Marked Clinical Device",
      "image_url": "https://123thenextlevel.com/assets/images/shop/core-500.png"
    },
    {
      "id": "sleep-analyzer-es",
      "name": "Withings Analizador de Sueño de Contacto Cero",
      "category": "Tech Gadgets & Wearables",
      "rating": 4.82,
      "description": "Alfombrilla neumática bajo el colchón. Registra el ritmo cardíaco nocturno y detecta la apnea obstructiva del sueño con validación médica CE.",
      "price_text": "129,95€",
      "deal_url": "https://www.amazon.es/dp/B0892BGFX7?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "CE Medically Validated (Apnea)",
      "image_url": "https://123thenextlevel.com/assets/images/shop/sleep-analyzer.png"
    },
    {
      "id": "reagent-strips-es",
      "name": "ALLTEST Tiras de Reactivos Urinarios de 10 Parámetros",
      "category": "Performance & Testing",
      "rating": 4.85,
      "description": "Prueba química visual de inmersión y lectura que rastrea 10 parámetros críticos en menos de 2 minutos. Cero tiempo de pantalla digital.",
      "price_text": "14,99€",
      "deal_url": "https://www.amazon.es/dp/B00NH9WEUA?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "CE 0123 Medical Marked",
      "image_url": "https://123thenextlevel.com/assets/images/shop/reagent-strips.png"
    },
    {
      "id": "amazon-supp-es-b08tcg2rh7",
      "name": "Calcium, Magnesium and Zinc with Vitamin D3, K2 and More - 400 Vegan Tablets (+1 Year) - Vitamin & Mineral Complex, Gluten Free, Lactose Free",
      "category": "Supplements",
      "rating": 4.5,
      "description": "Calcium, Magnesium and Zinc with Vitamin D3, K2 and More - 400 Vegan Tablets (+1 Year) - Vitamin & Mineral Complex, Gluten Free, Lactose Free",
      "price_text": "21,49€",
      "deal_url": "https://www.amazon.es/dp/B08TCG2RH7?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/calciumvitdus.jpeg"
    },
    {
      "id": "amazon-supp-es-b01bccp44g",
      "name": "HSN Magnesium Bisglycinate 350mg - 120 Vegetable Capsules - High Bioavailability Chelated Magnesium - Gluten Free, Non-GMO Vegan",
      "category": "Supplements",
      "rating": 4.7,
      "description": "High bioavailability chelated magnesium bisglycinate 350mg elemental, 120 vegetable capsules, vegan and gluten free",
      "price_text": "9,99€",
      "deal_url": "https://www.amazon.es/dp/B01BCCP44G?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/magnesiumchelate.jpg"
    },
    {
      "id": "amazon-supp-es-b07q31n9d4",
      "name": "Healthy Fusion Whey Protein with Collagen + Magnesium - Improve Workouts - Protects and Increases Muscle Mass - 1000g Chocolate",
      "category": "Supplements",
      "rating": 4.1,
      "description": "Pure whey protein with collagen and magnesium to improve workouts and protect muscle mass, 1000g chocolate flavor",
      "price_text": "29,90€",
      "deal_url": "https://www.amazon.es/dp/B07Q31N9D4?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/whey3.jpg"
    },
    {
      "id": "amazon-supp-es-b07m7l3j7y",
      "name": "Magnesium Citrate 1545mg + Magnesium Bisglycinate 600mg - Reduces Tiredness and Fatigue - Magnesium Complex High Bioavailability - 120 Vegan Capsules Nutralie",
      "category": "Supplements",
      "rating": 4.6,
      "description": "Magnesium complex with citrate and bisglycinate for high bioavailability, reduces tiredness and fatigue, 120 vegan capsules",
      "price_text": "16,91€",
      "deal_url": "https://www.amazon.es/dp/B07M7L3J7Y?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/magnesium.jpg"
    },
    {
      "id": "amazon-supp-es-b09hhnz5q4",
      "name": "Pure Hydrolyzed Collagen + Hyaluronic Acid + Coenzyme Q10 + Vitamins and B12 + Zinc - 120 Days Maximum Dose - Advanced Formula - Collagen for Strong Joints, Tense Skin and Energy",
      "category": "Supplements",
      "rating": 4.7,
      "description": "Pure Hydrolyzed Collagen + Hyaluronic Acid + Coenzyme Q10 + Vitamins and B12 + Zinc - 120 Days Maximum Dose - Advanced Formula - Collagen for Strong Joints, Tense Skin and Energy",
      "price_text": "22,09€",
      "deal_url": "https://www.amazon.es/dp/B09HHNZ5Q4?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/CollagenSpain.jpg"
    },
    {
      "id": "amazon-supp-es-b0dbqzbstm",
      "name": "NAD+ Nicotinamide Riboside Chloride 300mg - +6 Months Cure - Against Age and Fatigue, NAD Booster - Pure Powder, 180 Capsules - Pharmaceutical Grade - Vegan - Hexagon",
      "category": "Supplements",
      "rating": 4.2,
      "description": "NAD+ Nicotinamide Riboside Chloride 300mg - +6 Months Cure - Against Age and Fatigue, NAD Booster - Pure Powder, 180 Capsules - Pharmaceutical Grade - Vegan - Hexagon",
      "price_text": "129,00€",
      "deal_url": "https://www.amazon.es/dp/B0DBQZBSTM?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/nadplusukspain.jpg"
    },
    {
      "id": "amazon-supp-es-b084g5xc29",
      "name": "Omega 3 2000mg - 240 Fish Oil Beads (660mg EPA + 440mg DHA) - Omega 3 Fatty Acids for 4 Months, Non-GMO",
      "category": "Supplements",
      "rating": 4.7,
      "description": "Omega 3 2000mg - 240 Fish Oil Beads (660mg EPA + 440mg DHA) - Omega 3 Fatty Acids for 4 Months, Non-GMO",
      "price_text": "18,26€",
      "deal_url": "https://www.amazon.es/dp/B084G5XC29?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/omega3sp.jpeg.jpeg"
    },
    {
      "id": "amazon-supp-es-b0bthkhphs",
      "name": "idine Forte 5.5 mg: High Dose of Premium Wheat Germ Extract, 90 Vegan Capsules (3 Month Supply), Natural and No Additives, Green Naturals®.",
      "category": "Supplements",
      "rating": 4.4,
      "description": "idine Forte 5.5 mg: High Dose of Premium Wheat Germ Extract, 90 Vegan Capsules (3 Month Supply), Natural and No Additives, Green Naturals®.",
      "price_text": "46,90€",
      "deal_url": "https://www.amazon.es/dp/B0BTHKHPHS?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/spermidinespain.jpeg"
    },
    {
      "id": "amazon-supp-es-b0888qxz14",
      "name": "Vitamin D3 and K2. Vitamin D3 5000 ui + Vitamin K2 MK7 200 μg + Silicon + Bamboo. High dosage and bioavailability. Contributes to the immune system. 150 capsules. N2 Natural Nutrition",
      "category": "Supplements",
      "rating": 4.7,
      "description": "Vitamin D3 and K2. Vitamin D3 5000 ui + Vitamin K2 MK7 200 μg + Silicon + Bamboo. High dosage and bioavailability. Contributes to the immune system. 150 capsules. N2 Natural Nutrition",
      "price_text": "17,70€",
      "deal_url": "https://www.amazon.es/dp/B0888QXZ14?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/d3k2spain.jpeg"
    },
    {
      "id": "amazon-supp-es-b0dzd7th17",
      "name": "NDL Pro-Health Electrolytes - Effervescent Tablets for Rapid Hydration, Electrolytes and Mineral Salts for Sports, Reduces Fatigue and Fatigue - Lemon Flavor - Pack 2-40 Tablets",
      "category": "Supplements",
      "rating": 4.1,
      "description": "NDL Pro-Health Electrolytes - Effervescent Tablets for Rapid Hydration, Electrolytes and Mineral Salts for Sports, Reduces Fatigue and Fatigue - Lemon Flavor - Pack 2-40 Tablets",
      "price_text": "13,40€",
      "deal_url": "https://www.amazon.es/dp/B0DZD7TH17?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/elctrolyte-es.jpeg"
    },
    {
      "id": "amazon-supp-es-b0924pfyn9",
      "name": "Creatine Monohydrate 3000mg, 270 Tablets, 3 Month Supply - Vegan Friendly Sports Supplement, 3 Tablets a Day, Non-GMO and Magnesium Stearate",
      "category": "Supplements",
      "rating": 4.4,
      "description": "Creatine Monohydrate 3000mg, 270 Tablets, 3 Month Supply - Vegan Friendly Sports Supplement, 3 Tablets a Day, Non-GMO and Magnesium Stearate",
      "price_text": "22,94€",
      "deal_url": "https://www.amazon.es/dp/B0924PFYN9?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/creatine-es.webp"
    },
    {
      "id": "amazon-supp-es-b0cg64t7lg",
      "name": "Lion's Mane 58,500 mg (30:1) Per Daily Dose - High Absorption Lions Mane (Hericium erinaceus) with Vitamin C and Black Pepper - 30% Polysaccharides, 5% Beta-Glucans - Non-GMO & Gluten Free",
      "category": "Supplements",
      "rating": 4.4,
      "description": "Lion's Mane 58,500 mg (30:1) Per Daily Dose - High Absorption Lions Mane (Hericium erinaceus) with Vitamin C and Black Pepper - 30% Polysaccharides, 5% Beta-Glucans - Non-GMO & Gluten Free",
      "price_text": "19,99€",
      "deal_url": "https://www.amazon.es/dp/B0CG64T7LG?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/melenaleon.jpeg"
    },
    {
      "id": "amazon-supp-es-b092q8sgpt",
      "name": "Intestinal Probiotics & Prebiotics with 20 Bacterial Strains - 120 Capsules for 2 Month Supply - 60 Billion CFU, With Inulin & FOS Powder, Vegan Friendly, Lactose Free & Non-GMO",
      "category": "Supplements",
      "rating": 4.5,
      "description": "Intestinal Probiotics & Prebiotics with 20 Bacterial Strains - 120 Capsules for 2 Month Supply - 60 Billion CFU, With Inulin & FOS Powder, Vegan Friendly, Lactose Free & Non-GMO",
      "price_text": "14,72€",
      "deal_url": "https://www.amazon.es/dp/B092Q8SGPT?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/multistrainprebio.jpeg"
    },
    {
      "id": "amazon-supp-es-b084hh913j",
      "name": "Igennus Super B-Complex - Methylated Vitamin B Complex with Methylfolate, Vitamin B12 Methylcobalamin and Vitamin C, High Absorption and Extended Release, 180 Vegan Tablets",
      "category": "Supplements",
      "rating": 4.7,
      "description": "Igennus Super B-Complex - Methylated Vitamin B Complex with Methylfolate, Vitamin B12 Methylcobalamin and Vitamin C, High Absorption and Extended Release, 180 Vegan Tablets",
      "price_text": "23,99€",
      "deal_url": "https://www.amazon.es/dp/B084HH913J?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/methylatedbcomplex.jpeg"
    },
    {
      "id": "amazon-supp-es-b0gfwqcjk9",
      "name": "Ashwagandha KSM-66 Capsules 250mg High Potency - 5% Withanolides - 90 Vegan Capsules (3 Month Supply) - with B6 for Tiredness & B5 for Mental Performance - for Men and Women - 4 HIM & HER",
      "category": "Supplements",
      "rating": 4.4,
      "description": "Ashwagandha KSM-66 Capsules 250mg High Potency - 5% Withanolides - 90 Vegan Capsules (3 Month Supply) - with B6 for Tiredness & B5 for Mental Performance - for Men and Women - 4 HIM & HER",
      "price_text": "17,00€",
      "deal_url": "https://www.amazon.es/dp/B0GFWQCJK9?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/ashwagandhaes.jpeg"
    },
    {
      "id": "amazon-supp-es-b07fdl3t4z",
      "name": "Prebio Inulin Powder - 1100g (1.1kg) - High Fiber Content - Prebiotic - Controlled Waste - Origin Europe - Naturally from Chicory Root - 100% Vegan",
      "category": "Supplements",
      "rating": 4.6,
      "description": "Prebio Inulin Powder - 1100g (1.1kg) - High Fiber Content - Prebiotic - Controlled Waste - Origin Europe - Naturally from Chicory Root - 100% Vegan",
      "price_text": "15,29€",
      "deal_url": "https://www.amazon.es/dp/B07FDL3T4Z?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/prebioticfibre.jpeg"
    },
    {
      "id": "amazon-supp-es-b07mzy4p1r",
      "name": "Coenzyme Q10 200mg Concentration 120 Vegan Capsules, 4 Month Supply - Ubiquinone CoQ10, 4 Month Supply, Gluten Free, GMO and Magnesium Stearate Free",
      "category": "Supplements",
      "rating": 4.6,
      "description": "Coenzyme Q10 200mg Concentration 120 Vegan Capsules, 4 Month Supply - Ubiquinone CoQ10, 4 Month Supply, Gluten Free, GMO and Magnesium Stearate Free",
      "price_text": "19,79€",
      "deal_url": "https://www.amazon.es/dp/B07MZY4P1R?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/coq10es.jpeg"
    },
    {
      "id": "amazon-supp-es-b0bk8x47m5",
      "name": "Pure Glycine Powder 1kg Vegavero® | NO Additives, Lab-Tested | Supports Recovery, Muscle & Collagen Synthesis | L-Glycine 1000g with Measuring Spoon | L Glycine Supplement | Vegan",
      "category": "Supplements",
      "rating": 4.5,
      "description": "Pure Glycine Powder 1kg Vegavero® | NO Additives, Lab-Tested | Supports Recovery, Muscle & Collagen Synthesis | L-Glycine 1000g with Measuring Spoon | L Glycine Supplement | Vegan",
      "price_text": "13,58€",
      "deal_url": "https://www.amazon.es/dp/B0BK8X47M5?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Certificado UE",
      "image_url": "https://123thenextlevel.com/Products/glycine.jpeg"
    },
    {
      "id": "amazon-fitness-es-rower",
      "name": "Concept2 Remo Indoor Model D Rower",
      "category": "Fitness",
      "rating": 4.95,
      "description": "La máquina de remo de referencia con monitor PM5 para optimizar el rendimiento cardiorrespiratorio y la potencia metabólica.",
      "price_text": "950,00€",
      "deal_url": "https://www.amazon.es/dp/B099KBD9X8?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Estándar Clínico PM5",
      "image_url": "https://123thenextlevel.com/assets/images/shop/rower.png"
    },
    {
      "id": "amazon-fitness-es-kettlebell",
      "name": "Bowflex SelectTech 840 Pesa Rusa Ajustable",
      "category": "Fitness",
      "rating": 4.88,
      "description": "Se ajusta de 3,5 kg a 18 kg para entrenamientos funcionales de cadena posterior y fuerza adaptativa.",
      "price_text": "149,00€",
      "deal_url": "https://www.amazon.es/dp/B07V2C6374?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Compacta 6 en 1",
      "image_url": "https://123thenextlevel.com/assets/images/shop/rower.png"
    },
    {
      "id": "amazon-kitchen-es-blender",
      "name": "NutriBullet 1200 Batidora Extractor de Nutrientes",
      "category": "Kitchen",
      "rating": 4.9,
      "description": "Extractor ciclónico de precisión de alta velocidad para pulverizar hojas verdes, semillas y superalimentos de longevidad.",
      "price_text": "99,99€",
      "deal_url": "https://www.amazon.es/dp/B08524B5C6?tag=123znl08a-21",
      "market_region": "ES",
      "badge_text": "Motor Potente 1200W",
      "image_url": "https://123thenextlevel.com/assets/images/shop/water-bottle.png"
    }
  ]
};

function CategoryBanner({ categoryKey, marketTab }: { categoryKey: string; marketTab: MarketTab }) {
  const normKey = categoryKey.toLowerCase();
  
  const getBannerConfig = (cat: string, market: MarketTab) => {
    if (cat.includes('supplement')) {
      if (market === 'UK') {
        return {
          title: 'UK AMAZON SUPPLEMENTS',
          subtitle: 'Curated British & European pharmaceutical-grade longevity supplements and bioactives',
          icon: Pill,
          iconColor: 'text-emerald-400',
          iconBorder: 'border-emerald-500/30',
          iconGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
          radarColor: 'text-emerald-500/10'
        };
      } else if (market === 'ES') {
        return {
          title: 'ES AMAZON SUPLEMENTOS',
          subtitle: 'Vitaminas, bioactivos y suplementos de longevidad certificados de Amazon España',
          icon: Pill,
          iconColor: 'text-emerald-400',
          iconBorder: 'border-emerald-500/30',
          iconGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
          radarColor: 'text-emerald-500/10'
        };
      } else {
        return {
          title: 'US AMAZON SUPPLEMENTS',
          subtitle: 'Curated US Amazon longevity vitamins, bioactives, and purity-tested nutraceuticals',
          icon: Pill,
          iconColor: 'text-emerald-400',
          iconBorder: 'border-emerald-500/30',
          iconGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
          radarColor: 'text-emerald-500/10'
        };
      }
    }
    
    if (cat.includes('fitness')) {
      return {
        title: market === 'ES' ? 'ES EQUIPAMIENTO FITNESS' : `${market} FITNESS GEAR`,
        subtitle: market === 'ES' 
          ? 'Material de entrenamiento y gimnasio en casa en España' 
          : `Home gym essentials and workout equipment in the ${market === 'UK' ? 'United Kingdom' : 'United States'}`,
        icon: Dumbbell,
        iconColor: 'text-cyan-400',
        iconBorder: 'border-cyan-500/30',
        iconGlow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)]',
        radarColor: 'text-cyan-500/10'
      };
    }

    if (cat.includes('kitchen')) {
      return {
        title: market === 'ES' ? 'ES HOGAR Y COCINA' : `${market} HOME & KITCHEN`,
        subtitle: market === 'ES' 
          ? 'Electrodomésticos, extractores y cocina saludable en España' 
          : `Appliances, cookware, and longevity nutrient extractors in the ${market === 'UK' ? 'UK' : 'US'}`,
        icon: ChefHat,
        iconColor: 'text-amber-400',
        iconBorder: 'border-amber-500/30',
        iconGlow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
        radarColor: 'text-amber-500/10'
      };
    }

    if (cat.includes('tech') || cat.includes('wearable')) {
      return {
        title: market === 'ES' ? 'ES DISPOSITIVOS Y WEARABLES' : `${market} TECH GADGETS & WEARABLES`,
        subtitle: market === 'ES' 
          ? 'Sensores biofísicos, wearables y monitorización del sueño' 
          : 'Latest biophysical monitors, wearables, and sleep sensors',
        icon: Smartphone,
        iconColor: 'text-indigo-400',
        iconBorder: 'border-indigo-500/30',
        iconGlow: 'shadow-[0_0_25px_rgba(99,102,241,0.25)]',
        radarColor: 'text-indigo-500/10'
      };
    }

    if (cat.includes('performance') || cat.includes('testing')) {
      return {
        title: market === 'ES' ? 'ES PRUEBAS Y RENDIMIENTO' : `${market} PERFORMANCE & TESTING`,
        subtitle: market === 'ES' 
          ? 'Herramientas de diagnóstico y pruebas de biomarcadores' 
          : 'Diagnostic tools, biomarker testing, and telemetry devices',
        icon: Sparkles,
        iconColor: 'text-rose-400',
        iconBorder: 'border-rose-500/30',
        iconGlow: 'shadow-[0_0_25px_rgba(244,63,94,0.25)]',
        radarColor: 'text-rose-500/10'
      };
    }

    return {
      title: `${market} CURATED GEAR`,
      subtitle: 'High-performance lifestyle accelerators and equipment',
      icon: Activity,
      iconColor: 'text-cyan-400',
      iconBorder: 'border-cyan-500/30',
      iconGlow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)]',
      radarColor: 'text-cyan-500/10'
    };
  };

  const config = getBannerConfig(normKey, marketTab);
  const Icon = config.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 md:p-8 flex items-center justify-between shadow-2xl transition-all duration-300">
      {/* Subtle Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
          backgroundSize: '18px 18px'
        }}
      />

      {/* Futuristic Radar & Circular Reticle Graphics (Right-aligned) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none opacity-20 overflow-hidden">
        <svg className={`w-full h-full ${config.radarColor || 'text-cyan-400'}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6">
          <circle cx="75" cy="50" r="44" strokeDasharray="3 3" />
          <circle cx="75" cy="50" r="32" />
          <circle cx="75" cy="50" r="18" strokeDasharray="2 2" />
          <circle cx="75" cy="50" r="6" />
          <path d="M75 6 v88 M31 50 h88" strokeDasharray="1 3" />
          <path d="M44 19 l62 62 M44 81 l62 -62" strokeWidth="0.3" strokeDasharray="2 4" />
        </svg>
      </div>

      {/* Main Content Info */}
      <div className="relative z-10 flex items-center space-x-6">
        {/* Squircle Badge Icon */}
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-slate-950/90 border ${config.iconBorder} flex items-center justify-center ${config.iconGlow} flex-shrink-0 transition-transform duration-300 hover:scale-105`}>
          <Icon className={`w-8 h-8 md:w-10 md:h-10 ${config.iconColor} transform -rotate-45`} />
        </div>

        {/* Text Area */}
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
            {config.title}
          </h3>
          <p className="text-slate-400 text-sm md:text-base mt-1 font-normal">
            {config.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Store() {
  const [activeTab, setActiveTab] = useState<MarketTab>('US');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDynamicStore() {
      setLoading(true);
      try {
        // 1. Fetch live products from Supabase for the strictly selected market
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('market_region', activeTab);

        if (error || !data || data.length === 0) {
          throw error || new Error(`Database is empty for ${activeTab}`);
        }

        // 2. Client-side absolute image link and deal URL matching
        const healedData = data.map((p: any) => {
          let healedImg = p.image_url;
          if (healedImg && healedImg.startsWith('/assets/') && !healedImg.startsWith('http')) {
            healedImg = `https://123thenextlevel.com${healedImg}`;
          } else if (healedImg && healedImg.startsWith('/Products/') && !healedImg.startsWith('http')) {
            healedImg = `https://123thenextlevel.com${healedImg}`;
          }

          let healedDeal = p.deal_url;
          if (healedDeal && healedDeal.startsWith('https://123thenextlevel.comhttp')) {
            healedDeal = healedDeal.replace('https://123thenextlevel.com', '');
          }

          return { ...p, image_url: healedImg, deal_url: healedDeal };
        });

        setProducts(healedData);

        // 3. Extract unique categories present in this specific market
        const rawCategories = healedData.map((p: any) => p.category).filter(Boolean);
        const uniqueCategories = Array.from(new Set(rawCategories)).map((cat: any) => {
          return cat.charAt(0).toUpperCase() + cat.slice(1);
        });

        setCategories(['All', ...uniqueCategories]);
      } catch (err) {
        console.warn(`Supabase fetch failed for ${activeTab}. Falling back to regional offline registry:`, err);
        
        // 4. Strict Market-Specific Offline Fallback logic
        const fallbackList = REGIONAL_MASTER_CATALOGS[activeTab] || [];
        setProducts(fallbackList);

        const uniqueCategories = Array.from(new Set(fallbackList.map((p: any) => p.category).filter(Boolean)))
          .map((cat: any) => cat.charAt(0).toUpperCase() + cat.slice(1));
        setCategories(['All', ...uniqueCategories]);
      } finally {
        setLoading(false);
      }
    }

    fetchDynamicStore();
  }, [activeTab]);

  // Handle case-insensitive filtering
  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category && p.category.toLowerCase() === activeCategory.toLowerCase());

  // Split into Tier 1 (Clinical Direct) and Tier 2 (Amazon Hub)
  const clinicalPartners = filteredProducts.filter(p => 
    p.is_direct_affiliate === true || 
    (p.deal_url && !p.deal_url.toLowerCase().includes('amazon'))
  );

  const amazonHubProducts = filteredProducts.filter(p => 
    p.is_direct_affiliate !== true && 
    (p.deal_url && p.deal_url.toLowerCase().includes('amazon'))
  );

  // Group amazon products by category for structured sections when "All" is active
  const amazonCategoriesInView = Array.from(
    new Set(amazonHubProducts.map(p => p.category).filter(Boolean))
  );

  const getFlagEmoji = (tab: MarketTab) => {
    if (tab === 'US') return '🇺🇸';
    if (tab === 'UK') return '🇬🇧';
    return '🇪🇸';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased p-6 md:p-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Sovereign Apothecary & Longevity Gear Store
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Access highly localized, premium diagnostic blood screening, advanced biophysical sensors, and curated lifestyle accelerators.
        </p>
      </div>

      {/* Country Selector */}
      <div className="max-w-md mx-auto flex justify-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl mb-12">
        {(['US', 'UK', 'ES'] as MarketTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setActiveCategory('All');
            }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <span className="text-lg">{getFlagEmoji(tab)}</span>
            <span>{tab === 'ES' ? 'España (EU)' : tab === 'UK' ? 'United Kingdom' : 'United States'}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Filter Pills */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-900 pb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${
              activeCategory.toLowerCase() === category.toLowerCase()
                ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
          <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Syncing Live {activeTab} Catalog...</span>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* TIER 1: CLINICAL DIAGNOSTICS & DIRECT PARTNERS */}
          {clinicalPartners.length > 0 && (
            <div className="space-y-6">
              <div className="border-l-4 border-rose-500 pl-4">
                <span className="text-xs text-rose-500 uppercase font-semibold tracking-widest">DIRECT ACCESS PARTNERS ({activeTab})</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">Clinical Diagnostics & Direct Offerings</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicalPartners.map(product => (
                  <div key={product.id} className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-rose-500/30 p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
                    <div>
                      {product.image_url && (
                        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800/80 mb-4 flex items-center justify-center p-4">
                          <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://123thenextlevel.com/assets/images/shop/placeholder.png';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-rose-950/20 border border-rose-900/30">
                          {product.category}
                        </span>
                        <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                          <span>★</span> <span>{product.rating || '4.85'}</span>
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-400 transition-colors duration-300">{product.name}</h3>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-semibold">Badge Status</span>
                        <span className="text-[10px] text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/20">{product.badge_text || 'Verified'}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                        <span className="font-extrabold text-slate-100 text-lg">{product.price_text}</span>
                        <a href={product.deal_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white text-xs font-bold shadow-lg transition-all duration-300">
                          Access Partner Portal
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TIER 2: CURATED LIFESTYLE & GEAR (AMAZON ASSOCIATES) */}
          {amazonHubProducts.length > 0 && (
            <div className="space-y-10 pt-6 border-t border-slate-900">
              <div className="border-l-4 border-cyan-500 pl-4">
                <span className="text-xs text-cyan-400 uppercase font-semibold tracking-widest">CURATED LIFESTYLE & PILLAR HARDWARE</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">Amazon Longevity Gear Hub {getFlagEmoji(activeTab)}</h2>
              </div>

              {/* If "All" is active, render category-by-category with header banners */}
              {activeCategory === 'All' ? (
                amazonCategoriesInView.map(catKey => {
                  const catProducts = amazonHubProducts.filter(p => p.category === catKey);
                  return (
                    <div key={catKey} className="space-y-6 pt-4">
                      {/* Section Header Banner with Market Specificity & Telemetry */}
                      <CategoryBanner categoryKey={catKey} marketTab={activeTab} />

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {catProducts.map(product => (
                          <div key={product.id} className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-850 hover:border-cyan-500/20 p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
                            <div>
                              {product.image_url && (
                                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-950/80 border border-slate-850/80 mb-4 flex items-center justify-center p-4">
                                  <img 
                                    src={product.image_url} 
                                    alt={product.name} 
                                    className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = 'https://123thenextlevel.com/assets/images/shop/placeholder.png';
                                    }}
                                  />
                                </div>
                              )}
                              <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-cyan-950/20 border border-cyan-900/30">
                                  {product.category}
                                </span>
                                <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                                  <span>★</span> <span>{product.rating || '4.80'}</span>
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{product.name}</h3>
                              <p className="text-xs text-slate-400 mt-3 leading-relaxed">{product.description}</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-semibold">Network Target</span>
                                <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-905 border border-slate-800">{product.network || 'Amazon Associates'}</span>
                              </div>
                              <div className="flex justify-between items-center bg-slate-900/20 p-3 rounded-xl border border-slate-900">
                                <span className="font-extrabold text-slate-100 text-lg">{product.price_text}</span>
                                <a href={product.deal_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/30 text-cyan-400 text-xs font-bold transition-all duration-300">
                                  Buy on Amazon {getFlagEmoji(activeTab)}
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                /* Specific Category Filter Active: Render Single Matching Category Banner */
                <div className="space-y-6">
                  <CategoryBanner categoryKey={activeCategory} marketTab={activeTab} />

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {amazonHubProducts.map(product => (
                      <div key={product.id} className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-850 hover:border-cyan-500/20 p-6 flex flex-col justify-between shadow-xl transition-all duration-300">
                        <div>
                          {product.image_url && (
                            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-950/80 border border-slate-850/80 mb-4 flex items-center justify-center p-4">
                              <img 
                                src={product.image_url} 
                                alt={product.name} 
                                className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://123thenextlevel.com/assets/images/shop/placeholder.png';
                                }}
                              />
                            </div>
                          )}
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest px-2 py-1 rounded bg-cyan-950/20 border border-cyan-900/30">
                              {product.category}
                            </span>
                            <span className="text-xs text-amber-500 font-bold flex items-center space-x-1">
                              <span>★</span> <span>{product.rating || '4.80'}</span>
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{product.name}</h3>
                          <p className="text-xs text-slate-400 mt-3 leading-relaxed">{product.description}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-semibold">Network Target</span>
                            <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-905 border border-slate-800">{product.network || 'Amazon Associates'}</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-900/20 p-3 rounded-xl border border-slate-900">
                            <span className="font-extrabold text-slate-100 text-lg">{product.price_text}</span>
                            <a href={product.deal_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/30 text-cyan-400 text-xs font-bold transition-all duration-300">
                              Buy on Amazon {getFlagEmoji(activeTab)}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Localized Disclaimers */}
          <div className="text-center max-w-3xl mx-auto pt-12 border-t border-slate-900 space-y-2 text-[10px] text-slate-500 leading-relaxed">
            <p>
              {activeTab === 'ES'
                ? '* Enlace de afiliado oficial de Amazon España. Su compra apoya directamente nuestra investigación de longevidad sin costo adicional.'
                : activeTab === 'UK'
                ? '* Official Amazon UK affiliate link. Your purchase directly supports our longevity research at zero additional cost to you.'
                : '* Official Amazon affiliate link. Your purchase directly supports our longevity research at zero additional cost to you.'}
            </p>
            <p>
              All diagnostic and physiological telemetry solutions are intended strictly for educational and baseline tracking purposes. Access portals are operated by external third-party medical partners. 123TheNextLevel never retains, compiles, or sells your genetic, hematological, or molecular test results.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
