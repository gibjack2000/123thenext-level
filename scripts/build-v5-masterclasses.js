import fs from 'fs';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://seoaictzhmqdwnkfymxt.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// ==============================================================================
// 1. HELPER: RESPONSIVE HIGH-DEFINITION SVG INFOGRAPHIC GENERATOR
// ==============================================================================
function generateSvgInfographic({
  title,
  subtitle,
  category = 'DIAGNOSTIC TELEMETRY & CLINICAL SYSTEMS ARCHITECTURE',
  svgInner,
  viewBox = '0 0 800 280'
}) {
  return `
<div class="clinical-svg-infographic my-8 p-4 sm:p-6 rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl overflow-hidden backdrop-blur-md">
  <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 0.75rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #22d3ee;">
    <span style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; letter-spacing: 0.05em;">
      <span style="display: inline-block; width: 8px; height: 8px; border-radius: 9999px; background: #10b981; box-shadow: 0 0 8px #10b981;"></span>
      ${category}
    </span>
    <span style="font-size: 10px; text-transform: uppercase; color: #64748b; letter-spacing: 0.08em;">High-Definition Vector Protocol</span>
  </div>
  <div style="margin-bottom: 0.75rem;">
    <h4 style="margin: 0 0 0.25rem 0; font-size: 1rem; font-weight: 800; color: #f8fafc; font-family: 'Outfit', sans-serif; letter-spacing: -0.01em;">${title}</h4>
    <p style="margin: 0; font-size: 0.8rem; color: #94a3b8;">${subtitle}</p>
  </div>
  <div style="width: 100%; overflow-x: auto;">
    <svg viewBox="${viewBox}" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display: block; min-width: 600px; max-width: 100%;">
      <defs>
        <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.9"/>
        </linearGradient>
        <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#059669" stop-opacity="0.9"/>
        </linearGradient>
        <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#d97706" stop-opacity="0.9"/>
        </linearGradient>
        <linearGradient id="grad-rose" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#be123c" stop-opacity="0.9"/>
        </linearGradient>
        <linearGradient id="grad-dark-box" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1e293b" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.9"/>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      ${svgInner}
    </svg>
  </div>
</div>
`.trim();
}

// ==============================================================================
// 2. HELPER: DYNAMIC & FALLBACK PRODUCT CARD GENERATOR
// ==============================================================================
function generateDynamicAndFallbackProductCard({
  id,
  title,
  subtitle,
  price,
  priceSecondary,
  badgeText,
  imageUrl,
  productType,
  dealUrl,
  dealBtnText = 'Direct Live Deal',
  storeUrl = 'https://123thenextlevel.com/store'
}) {
  return `
<ProductCard id="${id}" productType="${productType}" dealBtnText="${dealBtnText}" />

<!-- Fallback HTML Representation for Static Parsers -->
<div class="product-card-box my-8 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-cyan-500/50" data-product-id="${id}" style="margin: 2.25rem 0; padding: 1.5rem; border-radius: 1.25rem; border: 1px solid rgba(255, 255, 255, 0.09); background: rgba(13, 17, 23, 0.85); box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08); backdrop-filter: blur(16px);">
  <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 1.5rem; align-items: center;">
    <div style="flex-shrink: 0; width: 140px; height: 140px; border-radius: 1rem; overflow: hidden; background: rgba(2, 6, 23, 0.6); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255, 255, 255, 0.08); padding: 0.5rem;">
      <img src="${imageUrl}" alt="${title}" style="max-width: 100%; max-height: 100%; object-fit: contain; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.4));" />
    </div>
    <div style="flex: 1; min-width: 260px;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
        <span style="display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.25rem 0.6rem; border-radius: 9999px; background: rgba(16, 185, 129, 0.12); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><polyline points="20 6 9 17 4 12"></polyline></svg>
          ${badgeText}
        </span>
        <span style="font-size: 0.75rem; color: #64748b; font-weight: 600;">${productType}</span>
      </div>
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.15rem; font-weight: 800; color: #f8fafc; line-height: 1.3;">${title}</h4>
      <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #94a3b8; line-height: 1.5;">${subtitle}</p>
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 0.85rem;">
        <div>
          <span style="font-size: 0.7rem; color: #64748b; text-transform: uppercase; font-weight: 600; display: block;">Live Retail & Subscriptions</span>
          <span style="font-size: 1.25rem; font-weight: 800; color: #f8fafc;">${price} <span style="font-size: 0.8rem; font-weight: 600; color: #64748b;">${priceSecondary ? `(${priceSecondary})` : ''}</span></span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <a href="${dealUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.4rem; background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: #ffffff; padding: 0.6rem 1.15rem; border-radius: 0.6rem; font-weight: 700; font-size: 0.825rem; text-decoration: none; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.35); transition: all 0.2s ease;">
            <span>${dealBtnText}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <a href="${storeUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(15, 23, 42, 0.8); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.12); padding: 0.6rem 1.1rem; border-radius: 0.6rem; font-weight: 600; font-size: 0.825rem; text-decoration: none; transition: all 0.2s ease;">
            <span>Store Hub</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
`.trim();
}

// ==============================================================================
// 3. COMPILE THE 6 LAYMAN-FRIENDLY MASTERCLASS ARTICLES (VERSION 5)
// ==============================================================================

// --- ARTICLE 1: PERFORMANCE & BIODATA ---
const p1_svg1 = generateSvgInfographic({
  title: 'Your Body as a Supercar: Telemetry Pipeline',
  subtitle: 'How wearable sensors track real-time engine strain, fuel burning, and recovery readiness.',
  svgInner: `
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>
    <g transform="translate(40, 30)">
      <rect width="200" height="50" rx="8" fill="url(#grad-dark-box)" stroke="#06b6d4" stroke-width="1.5"/>
      <circle cx="20" cy="25" r="5" fill="#06b6d4"/>
      <text x="35" y="24" fill="#f8fafc" font-size="12" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700">Heart Rate & HRV (Dashboard)</text>
      <text x="35" y="38" fill="#94a3b8" font-size="10" font-family="monospace">Nervous System Fuel Gauge</text>
    </g>
    <g transform="translate(40, 90)">
      <rect width="200" height="50" rx="8" fill="url(#grad-dark-box)" stroke="#10b981" stroke-width="1.5"/>
      <circle cx="20" cy="25" r="5" fill="#10b981"/>
      <text x="35" y="24" fill="#f8fafc" font-size="12" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700">Muscle Oxygen (SmO2)</text>
      <text x="35" y="38" fill="#94a3b8" font-size="10" font-family="monospace">Local Muscle Oxygen Flow</text>
    </g>
    <g transform="translate(40, 150)">
      <rect width="200" height="50" rx="8" fill="url(#grad-dark-box)" stroke="#f59e0b" stroke-width="1.5"/>
      <circle cx="20" cy="25" r="5" fill="#f59e0b"/>
      <text x="35" y="24" fill="#f8fafc" font-size="12" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700">2-Minute Urine Strips</text>
      <text x="35" y="38" fill="#94a3b8" font-size="10" font-family="monospace">Hydration & Kidney Dipstick</text>
    </g>
    <g transform="translate(40, 210)">
      <rect width="200" height="50" rx="8" fill="url(#grad-dark-box)" stroke="#f43f5e" stroke-width="1.5"/>
      <circle cx="20" cy="25" r="5" fill="#f43f5e"/>
      <text x="35" y="24" fill="#f8fafc" font-size="12" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700">Power Ergometer (Wattage)</text>
      <text x="35" y="38" fill="#94a3b8" font-size="10" font-family="monospace">Exact Horsepower Output</text>
    </g>
    <path d="M 240 55 L 300 140" stroke="#06b6d4" stroke-width="2" fill="none"/>
    <path d="M 240 115 L 300 140" stroke="#10b981" stroke-width="2" fill="none"/>
    <path d="M 240 175 L 300 140" stroke="#f59e0b" stroke-width="2" fill="none"/>
    <path d="M 240 235 L 300 140" stroke="#f43f5e" stroke-width="2" fill="none"/>
    <g transform="translate(300, 70)">
      <rect width="200" height="140" rx="12" fill="url(#grad-dark-box)" stroke="#38bdf8" stroke-width="2" filter="url(#glow)"/>
      <text x="100" y="30" fill="#38bdf8" font-size="13" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" text-anchor="middle">YOUR INTERNAL CPU</text>
      <line x1="20" y1="45" x2="180" y2="45" stroke="#334155"/>
      <text x="30" y="70" fill="#cbd5e1" font-size="11" font-family="monospace">• Zone 2 Cruising Speed</text>
      <text x="30" y="95" fill="#cbd5e1" font-size="11" font-family="monospace">• FatMax vs Carb Burn</text>
      <text x="30" y="120" fill="#cbd5e1" font-size="11" font-family="monospace">• Recovery Time Left</text>
    </g>
    <path d="M 500 140 L 560 140" stroke="#38bdf8" stroke-width="3" fill="none"/>
    <g transform="translate(560, 45)">
      <rect width="200" height="190" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
      <rect x="0" y="0" width="200" height="35" rx="12" fill="url(#grad-emerald)"/>
      <text x="100" y="22" fill="#ffffff" font-size="12" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" text-anchor="middle">PRECISION ACTION</text>
      <text x="20" y="65" fill="#f8fafc" font-size="11" font-weight="700">Train Smart, Not Broken</text>
      <text x="20" y="80" fill="#94a3b8" font-size="10">Skip burnout; hit PRs safely</text>
      <text x="20" y="115" fill="#f8fafc" font-size="11" font-weight="700">Build Mitochondrial V8</text>
      <text x="20" y="130" fill="#94a3b8" font-size="10">Burn pure fat for endless fuel</text>
      <text x="20" y="165" fill="#f8fafc" font-size="11" font-weight="700">Zero Overuse Injuries</text>
      <text x="20" y="180" fill="#94a3b8" font-size="10">Protect knees & tendons for life</text>
    </g>
  `,
  viewBox: '0 0 800 280'
});

const p1_cards = [
  generateDynamicAndFallbackProductCard({
    id: 'rower-us',
    title: 'Concept2 Remo Indoor Model D Rower',
    subtitle: 'The gold standard for full-body aerobic power and low-impact joint longevity.',
    price: '$990.00',
    priceSecondary: '£850.00 / 950€',
    badgeText: 'Clinical PM5 Telemetry',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/rower.png',
    productType: 'Precision Ergometer Hardware',
    dealUrl: 'https://www.amazon.com/dp/B099KBD9X8?tag=123znl0e-20',
    dealBtnText: 'Check Live Deal'
  }),
  generateDynamicAndFallbackProductCard({
    id: 'wearable-tracker-us',
    title: 'Apple Watch Series 10 (GPS 46mm)',
    subtitle: 'Continuous wrist telemetry tracking heart rate variability, ECG rhythm, and recovery readiness.',
    price: '$399.00',
    priceSecondary: '£379.00 / 399€',
    badgeText: 'FDA Approved Heart Monitoring',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/apple-watch.png',
    productType: 'Multispectral Wearable Biosensor',
    dealUrl: 'https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20',
    dealBtnText: 'View on Amazon'
  }),
  generateDynamicAndFallbackProductCard({
    id: 'reagent-strips-us',
    title: 'ALLTEST 10-Parameter Urinary Reagent Strips',
    subtitle: 'Instant 2-minute biochemical test tracking hydration, urine ketones, and kidney health.',
    price: '$14.99',
    priceSecondary: '£12.99 / 14,99€',
    badgeText: 'FDA Cleared & CLIA Waived',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/reagent-strips.png',
    productType: 'Rapid Biochemical Diagnostic',
    dealUrl: 'https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20',
    dealBtnText: 'Order Reagent Strips'
  })
].join('\n\n');

const p1_content = `# Performance & Biodata: Reading Your Body's Dashboard, Lactate Gears & Smarter Recovery

## The Human Supercar: Stop Guessing, Start Measuring

Imagine driving a twin-turbocharged supercar on the open highway, but all the dashboard instruments are blacked out. No speedometer, no tachometer, no oil temperature gauge, and no fuel meter. You are driving purely on gut feeling. 

For decades, that is exactly how most people approached fitness and physical longevity. We measured success by how drenched our shirts were or whether our knees ached the next morning.

In 2026, high-performance longevity has completely left guesswork behind. Your body has an intricate internal dashboard. When you learn how to read its real-time telemetry—lactate thresholds, heart rate variability, and muscle oxygenation—you can build elite stamina and multi-decade structural resilience without burning out your joints or draining your adrenal reserves.

${p1_svg1}

---

## 1. The Myth of "Lactic Acid" (It's Not Waste; It's Rocket Fuel!)

For over fifty years, gym lore taught that "lactic acid" is a toxic byproduct that makes your muscles burn and causes next-day soreness. Modern exercise biology has completely debunked this:

> **The Everyday Analogy: High-Octane Hybrid Fuel**
> Lactate is not a waste product. It is actually a premium, high-octane fuel that your heart, brain, and slow-twitch muscle fibers greedily devour during exercise! 

Your metabolism operates across two distinct gears:

### Gear 1: The Cruising Gear (Zone 2 - The Aerobic Fat-Burner)
When you jog lightly, cycle smoothly, or row at a conversational pace, your slow-twitch muscle fibers burn fatty acids cleanly. They produce small amounts of lactate, which are instantly sucked up and burned as energy. This is your **Aerobic Threshold (LT1)**. Building this engine allows you to cruise for hours without fatigue.

### Gear 2: The Turbocharger (Zone 4 & 5 - The Glycolytic Sprint)
When you sprint or push up a steep mountain pass, demand outpaces oxygen delivery. Your fast-twitch fibers kick in, burning pure glycogen. Lactate rises rapidly until it crosses the **Anaerobic Threshold (LT2)**—the redline where the engine can no longer clear lactate as fast as it produces it.

---

## 2. Reading Your In-Cabin Gauges: The 3 Essential Sensors

You do not need a multi-million-dollar sports science laboratory to monitor your engine. Three non-invasive tools give you complete clarity:

1. **The Pulse & Stress Tachometer (Heart Rate Variability - HRV):** Measures millisecond variations between heartbeats. A high HRV means your nervous system is fully charged and ready for high horsepower; a low HRV warns that your engine needs a recovery pit stop.
2. **The Dipstick Check (10-Parameter Urinary Test Strips):** A simple 2-minute dip test that reveals your hydration status, urine specific gravity, and whether your body is burning clean ketones or leaking micro-albumin from over-exhaustion.
3. **The Power Meter (Precision Ergometer):** Tracking exact wattage per stroke or pedal turn ensures you are challenging muscle tissue without slamming high-impact shock through your spine and cartilage.

---

## 3. Curated Performance & Bio-Telemetry Hardware

Equip your daily fitness protocol with clinical hardware directly synced from our Sovereign Store:

${p1_cards}

---

## 4. Next-Level Conversion & Diagnostic Next Steps

Ready to calibrate your personalized training zones and audit your biological horsepower?

👉 **[Take the Free 5-Minute Health Baseline & Diagnostic Quiz](https://123thenextlevel.com/health-quiz)**

📘 **[Download the Full Clinical Longevity Protocol & GP Consultation Workbook](https://123thenextlevel.com/premium-guides)**
`.trim();


// --- ARTICLE 2: HEALTHSPAN & LONGEVITY ---
const p2_svg1 = generateSvgInfographic({
  title: 'The 3 Pillars of Cellular Healthspan Architecture',
  subtitle: 'How cleaning cellular debris, repairing DNA software, and clearing arterial highways slows biological aging.',
  svgInner: `
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>
    <g transform="translate(50, 40)">
      <rect width="200" height="190" rx="12" fill="url(#grad-dark-box)" stroke="#06b6d4" stroke-width="2"/>
      <circle cx="100" cy="40" r="18" fill="#06b6d4" fill-opacity="0.2"/>
      <text x="100" y="45" fill="#38bdf8" font-size="14" font-weight="900" text-anchor="middle">1</text>
      <text x="100" y="80" fill="#f8fafc" font-size="13" font-weight="800" text-anchor="middle">DNA SOFTWARE UPDATE</text>
      <text x="100" y="110" fill="#94a3b8" font-size="11" text-anchor="middle">Sirtuins & NAD+ repair</text>
      <text x="100" y="130" fill="#94a3b8" font-size="11" text-anchor="middle">cellular operating code,</text>
      <text x="100" y="150" fill="#94a3b8" font-size="11" text-anchor="middle">preventing biological bugs.</text>
    </g>
    <g transform="translate(300, 40)">
      <rect width="200" height="190" rx="12" fill="url(#grad-dark-box)" stroke="#10b981" stroke-width="2"/>
      <circle cx="100" cy="40" r="18" fill="#10b981" fill-opacity="0.2"/>
      <text x="100" y="45" fill="#34d399" font-size="14" font-weight="900" text-anchor="middle">2</text>
      <text x="100" y="80" fill="#f8fafc" font-size="13" font-weight="800" text-anchor="middle">ZOMBIE CELL CLEANUP</text>
      <text x="100" y="110" fill="#94a3b8" font-size="11" text-anchor="middle">Senophagy recycles</text>
      <text x="100" y="130" fill="#94a3b8" font-size="11" text-anchor="middle">retired senescent cells,</text>
      <text x="100" y="150" fill="#94a3b8" font-size="11" text-anchor="middle">stopping inflammatory smoke.</text>
    </g>
    <g transform="translate(550, 40)">
      <rect width="200" height="190" rx="12" fill="url(#grad-dark-box)" stroke="#f59e0b" stroke-width="2"/>
      <circle cx="100" cy="40" r="18" fill="#f59e0b" fill-opacity="0.2"/>
      <text x="100" y="45" fill="#fbbf24" font-size="14" font-weight="900" text-anchor="middle">3</text>
      <text x="100" y="80" fill="#f8fafc" font-size="13" font-weight="800" text-anchor="middle">ARTERIAL HIGHWAYS</text>
      <text x="100" y="110" fill="#94a3b8" font-size="11" text-anchor="middle">Managing ApoB delivery</text>
      <text x="100" y="130" fill="#94a3b8" font-size="11" text-anchor="middle">trucks & blood pressure to</text>
      <text x="100" y="150" fill="#94a3b8" font-size="11" text-anchor="middle">keep blood vessels pristine.</text>
    </g>
  `,
  viewBox: '0 0 800 280'
});

const p2_cards = [
  generateDynamicAndFallbackProductCard({
    id: 'sirtuin-stack-us',
    title: 'Momentous Sirtuin Activation & Cell Recovery Stack',
    subtitle: 'Clinically certified Resveratrol, NMN precursors, and Apigenin to protect your cellular software.',
    price: '$89.95',
    priceSecondary: '£79.99 / 89,95€',
    badgeText: 'NSF Certified for Sport',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sirtuin-stack.png',
    productType: 'Cellular Epigenetic Stack',
    dealUrl: 'https://livemomentous.com/modernwisdom?code=modernwisdom',
    dealBtnText: 'Get Sirtuin Stack'
  }),
  generateDynamicAndFallbackProductCard({
    id: 'segmental-scale-us',
    title: 'Withings Body Scan Segmental Composition Scale',
    subtitle: 'Tracks visceral fat around organs, vascular arterial age, and segmental muscle balance.',
    price: '$399.95',
    priceSecondary: '£349.99 / 399,95€',
    badgeText: 'FDA Cleared 6-Lead ECG',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/body-scan.png',
    productType: 'Clinical Segmental Hardware',
    dealUrl: 'https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20',
    dealBtnText: 'Check Live Deal'
  }),
  generateDynamicAndFallbackProductCard({
    id: 'blood-pressure-cuff-us',
    title: 'Withings BPM Connect Wi-Fi Cuff',
    subtitle: 'Medical-grade cardiovascular pressure monitor tracking arterial elasticity and heart safety silently.',
    price: '$99.95',
    priceSecondary: '£89.99 / 99,95€',
    badgeText: 'FDA Cleared Medical Device',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/bpm-connect.png',
    productType: 'Arterial Telemetry Sensor',
    dealUrl: 'https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20',
    dealBtnText: 'Order BPM Connect'
  })
].join('\n\n');

const p2_content = `# Healthspan & Longevity: Upgrading Your Cellular Software, Clearing Cellular Junk & Arterial Health

## Living Longer vs. Living Better: The Longevity Revolution

There is a profound difference between *Lifespan* (the total number of years you are alive) and *Healthspan* (the number of years you live with sharp mental acuity, boundless physical energy, and complete physical autonomy).

In 2026, cutting-edge clinical longevity focuses on three primary mechanisms: keeping the arterial highways clean, updating the cellular software (the epigenome), and clearing out the "zombie factory workers" that accelerate biological aging.

${p2_svg1}

---

## 1. The ApoB Delivery Trucks: Why "Total Cholesterol" is the Wrong Metric

For decades, patients were handed a single cholesterol number. But treating cholesterol like a monolith ignores how cardiovascular plumbing actually works:

> **The Everyday Analogy: Delivery Trucks on a Highway**
> Think of ApoB particles as delivery trucks driving on your arterial highways. It is not just about the cargo inside the truck (cholesterol); it is about how many total trucks are swarming the road! When arterial walls suffer micro-scratches from high blood pressure or systemic inflammation, excess ApoB trucks crash into the potholes, initiating atherosclerotic plaque.

Keeping your blood pressure relaxed and your ApoB particle count optimized is the single most validated intervention for preserving cardiovascular youth.

---

## 2. The Zombie Factory Workers (Senescent Cells) & Cellular Software

Every day, trillions of cells in your body perform vital work. But under high stress or chronic oxidative damage, some cells enter a state called **Senescence**:

- **The Zombie Workers:** These cells permanently stop dividing, yet they refuse to die. Instead, they linger around like disgruntled factory workers, spewing inflammatory smoke (SASP) that damages neighboring healthy cells.
- **Autophagy & Senophagy:** This is your internal biological recycling crew. Fasting, cold exposure, resistance exercise, and targeted sirtuin activators signal the body to dismantle these zombie cells and build fresh, energized mitochondria.

---

## 3. Curated Epigenetic & Senolytic Arsenal

Deploy clinically validated longevity hardware and cellular formulations from our Sovereign Store:

${p2_cards}

---

## 4. Next-Level Conversion & Diagnostic Next Steps

Take control of your biological clock and measure your arterial baseline:

👉 **[Take the Free 5-Minute Longevity & Diagnostic Quiz](https://123thenextlevel.com/health-quiz)**

📘 **[Download the Full Clinical Longevity Protocol & GP Consultation Workbook](https://123thenextlevel.com/premium-guides)**
`.trim();


// --- ARTICLE 3: METABOLIC NUTRITION & GLP-1 ---
const p3_svg1 = generateSvgInfographic({
  title: 'The Glucose Rollercoaster vs. Steady Longevity Curve',
  subtitle: 'How wild blood sugar spikes cause energy crashes, compared to a smooth, flat metabolic line.',
  svgInner: `
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>
    <line x1="60" y1="240" x2="740" y2="240" stroke="#475569" stroke-width="2"/>
    <line x1="60" y1="240" x2="60" y2="30" stroke="#475569" stroke-width="2"/>
    <text x="50" y="240" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">70 mg/dL</text>
    <text x="50" y="160" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">110 mg/dL</text>
    <text x="50" y="70" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">180 mg/dL</text>
    <rect x="60" y="140" width="680" height="60" fill="#10b981" fill-opacity="0.1"/>
    <text x="70" y="175" fill="#34d399" font-size="11" font-weight="700">OPTIMAL STABLE ZONE (80 - 110 mg/dL)</text>
    <!-- Spiky Curve -->
    <path d="M 60 180 Q 150 40 240 180 T 420 50 T 600 230 T 740 170" fill="none" stroke="#f43f5e" stroke-width="3" stroke-dasharray="4 4"/>
    <text x="250" y="60" fill="#fb7185" font-size="11" font-weight="800">Spike & Crash Rollercoaster (Brain Fog & Cravings)</text>
    <!-- Smooth Line -->
    <path d="M 60 170 Q 200 155 350 165 T 550 160 T 740 165" fill="none" stroke="#22d3ee" stroke-width="4" filter="url(#glow)"/>
    <text x="550" y="145" fill="#22d3ee" font-size="11" font-weight="800">Metabolic Mastery (Steady Energy & Satiety)</text>
  `,
  viewBox: '0 0 800 280'
});

const p3_cards = [
  generateDynamicAndFallbackProductCard({
    id: 'cgm-us',
    title: 'Continuous Glucose Monitor (Abbott Lingo / Dexcom)',
    subtitle: 'Real-time interstitial glucose telemetry syncing blood sugar levels directly to your phone.',
    price: '$89.00 / month',
    priceSecondary: '£79.00 / 79,00€',
    badgeText: 'FDA Cleared / OTC Eligible',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/cgm.png',
    productType: 'Continuous Metabolic Biosensor',
    dealUrl: 'https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20',
    dealBtnText: 'View Live Deal'
  }),
  generateDynamicAndFallbackProductCard({
    id: 'segmental-scale-us',
    title: 'Withings Body Scan Segmental Composition Scale',
    subtitle: 'Measures visceral fat around internal organs and preserves lean muscle during weight loss.',
    price: '$399.95',
    priceSecondary: '£349.99 / 399,95€',
    badgeText: 'FDA Cleared Muscle Telemetry',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/body-scan.png',
    productType: 'Visceral Adiposity Scale',
    dealUrl: 'https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20',
    dealBtnText: 'Check Live Deal'
  }),
  generateDynamicAndFallbackProductCard({
    id: 'reagent-strips-us',
    title: 'ALLTEST 10-Parameter Urinary Reagent Strips',
    subtitle: 'Instant screen tracking urine ketones, kidney load, and metabolic hydration status.',
    price: '$14.99',
    priceSecondary: '£12.99 / 14,99€',
    badgeText: 'FDA Cleared & CLIA Waived',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/reagent-strips.png',
    productType: 'Rapid Metabolic Diagnostic',
    dealUrl: 'https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20',
    dealBtnText: 'Order Reagent Strips'
  })
].join('\n\n');

const p3_content = `# Metabolic Nutrition: Your Real-Time Fuel Gauge, Steady Energy & Glycemic Freedom

## The 3:00 PM Energy Crash: Stopping the Glucose Rollercoaster

You finish lunch, feel great for about 45 minutes, and then at 3:00 PM, a heavy blanket of brain fog rolls over your mind. You feel irritable, exhausted, and desperately crave sugar or a triple espresso.

This is not a lack of willpower; it is the classic **Blood Sugar Rollercoaster**. When high-glycemic carbohydrates flood the bloodstream, your pancreas responds by pumping out an emergency wave of insulin. Insulin shunts glucose out of the blood so aggressively that blood sugar crashes into the basement—triggering hunger alarms in the brain.

${p3_svg1}

---

## 1. The Continuous Fuel Gauge: How CGMs Transformed Nutrition

For decades, people only tested blood sugar with occasional finger-prick tests. Today, **Continuous Glucose Monitors (CGMs)** give you a live heads-up display:

> **The Everyday Analogy: Your Car's Live Mileage Meter**
> Imagine having a real-time fuel efficiency meter that shows exactly how your engine handles different fuels. With a CGM, you immediately discover that a bowl of "healthy" oatmeal might spike your glucose higher than eggs and avocado—or that a brisk 10-minute walk immediately flattens a post-meal spike!

---

## 2. Skeletal Muscle: Your Body's Biggest Glucose Sink

Your muscles are not just for lifting weights; they are your primary metabolic sink. Over 80% of post-meal glucose is absorbed directly into muscle tissue.

- **Preserving Muscle on GLP-1s:** If you are using modern GLP-1 medications (like Semaglutide or Tirzepatide), you must actively prioritize dietary protein and resistance training to avoid losing lean skeletal muscle mass and developing "Ozempic Face."
- **The 10-Minute Movement Miracle:** Contracting large muscle groups (like the quads and glutes) activates glucose transporters independently of insulin, soaking up excess sugar effortlessly.

---

## 3. Curated Metabolic Optimization Stack

Maintain strict glycemic stability with metabolic biosensors from our Sovereign Store:

${p3_cards}

---

## 4. Next-Level Conversion & Diagnostic Next Steps

Audit your glycemic response and build a metabolic meal plan:

👉 **[Take the Free 5-Minute Metabolic Nutrition Diagnostic Quiz](https://123thenextlevel.com/health-quiz)**

📘 **[Download the Full Clinical Longevity Protocol & GP Consultation Workbook](https://123thenextlevel.com/premium-guides)**
`.trim();


// --- ARTICLE 4: AUTONOMIC ENGINEERING & SOMATICS ---
const p4_svg1 = generateSvgInfographic({
  title: 'The Autonomic Nervous System: Gas vs. Brake Pedals',
  subtitle: 'Balancing sympathetic fight-or-flight acceleration with parasympathetic vagal recovery brakes.',
  svgInner: `
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>
    <g transform="translate(60, 40)">
      <rect width="320" height="190" rx="12" fill="url(#grad-dark-box)" stroke="#f43f5e" stroke-width="2"/>
      <rect x="0" y="0" width="320" height="35" rx="12" fill="url(#grad-rose)"/>
      <text x="160" y="22" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">THE GAS PEDAL (SYMPATHETIC)</text>
      <text x="25" y="70" fill="#fb7185" font-size="12" font-weight="700">• Adrenaline & Cortisol Release</text>
      <text x="25" y="95" fill="#f8fafc" font-size="11">• Heart rate spikes; blood vessels constrict</text>
      <text x="25" y="120" fill="#f8fafc" font-size="11">• Digestion & cellular repair shut down</text>
      <text x="25" y="145" fill="#f8fafc" font-size="11">• Vital for short-term survival</text>
      <text x="25" y="170" fill="#fb7185" font-size="11" font-weight="700">CHRONIC OVERUSE = BURNOUT & LOW HRV</text>
    </g>
    <g transform="translate(420, 40)">
      <rect width="320" height="190" rx="12" fill="url(#grad-dark-box)" stroke="#10b981" stroke-width="2"/>
      <rect x="0" y="0" width="320" height="35" rx="12" fill="url(#grad-emerald)"/>
      <text x="160" y="22" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">THE BRAKE PEDAL (PARASYMPATHETIC)</text>
      <text x="25" y="70" fill="#34d399" font-size="12" font-weight="700">• Vagus Nerve Activation</text>
      <text x="25" y="95" fill="#f8fafc" font-size="11">• Heart rate slows; HRV rebounds</text>
      <text x="25" y="120" fill="#f8fafc" font-size="11">• Deep sleep & immune healing turn ON</text>
      <text x="25" y="145" fill="#f8fafc" font-size="11">• Glymphatic brain washing engaged</text>
      <text x="25" y="170" fill="#34d399" font-size="11" font-weight="700">RESULT = CELLULAR REJUVENATION</text>
    </g>
  `,
  viewBox: '0 0 800 280'
});

const p4_cards = [
  generateDynamicAndFallbackProductCard({
    id: 'sleep-analyzer-us',
    title: 'Withings Sleep Analyzer Under-Mattress Pad',
    subtitle: 'Contact-free ballistocardiography tracking sleep cycles, nocturnal heart rate, and sleep apnea silently.',
    price: '$129.95',
    priceSecondary: '£119.99 / 129,95€',
    badgeText: 'Touch-Free Sleep Science',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sleep-analyzer.png',
    productType: 'Zero-Wearable Sleep Sensor',
    dealUrl: 'https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20',
    dealBtnText: 'Order Sleep Analyzer'
  }),
  generateDynamicAndFallbackProductCard({
    id: 'stethoscope-us',
    title: 'Eko CORE 500™ Digital AI Stethoscope',
    subtitle: 'Clinical 3-lead ECG and electronic stethoscope detecting cardiac murmurs and rhythm variations in 15 seconds.',
    price: '$429.00',
    priceSecondary: '£379.00 / 429,00€',
    badgeText: 'FDA Cleared AI Auscultation',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/core-500.png',
    productType: 'Clinical 3-Lead AI Sensor',
    dealUrl: 'https://www.ekohealth.com/products/core-500-digital-stethoscope',
    dealBtnText: 'View Eko CORE 500'
  }),
  generateDynamicAndFallbackProductCard({
    id: 'blood-pressure-cuff-us',
    title: 'Withings BPM Connect Wi-Fi Cuff',
    subtitle: 'Instant clinical blood pressure and pulse tracking syncing directly to your cardiovascular history.',
    price: '$99.95',
    priceSecondary: '£89.99 / 99,95€',
    badgeText: 'FDA Cleared Medical Device',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/bpm-connect.png',
    productType: 'Autonomic Cardiovascular Sensor',
    dealUrl: 'https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20',
    dealBtnText: 'Order BPM Connect'
  })
].join('\n\n');

const p4_content = `# Autonomic Engineering: Mastering Your Nervous System's Gas & Brake Pedals

## The Stuck Accelerator: Why You Can't "Just Relax"

If you feel constantly wired yet exhausted, irritable under minor stress, or wake up at 3:00 AM with a racing mind, your nervous system's **gas pedal is stuck to the floorboard**.

Your autonomic nervous system is divided into two branches: the **Sympathetic** (the gas pedal: fight or flight) and the **Parasympathetic** (the brake pedal: rest, digest, and repair). Modern life—with endless notifications, tight deadlines, and artificial light—keeps the gas pedal pinned down 24 hours a day.

${p4_svg1}

---

## 1. The Vagus Nerve: Stepping on the Biological Brake

You cannot simply "think" your way out of physical stress; you have to use bottom-up physiological brakes:

> **The Everyday Analogy: Anti-Lock Ceramic Brakes**
> The **Vagus Nerve** is the main brake cable connecting your brainstem to your heart, lungs, and gut. When you perform a "Physiological Sigh" (two quick inhales through the nose followed by a long, slow exhale through the mouth), you instantly stimulate the vagus nerve, sending a direct command to slow the heart down within seconds.

---

## 2. The Nightly Brain Dishwasher (Glymphatic Wash)

Why is deep slow-wave sleep mandatory for preventing brain fog and cognitive decline?

During Stage 3 delta sleep, your brain cells shrink in size by about 60%. This creates wide channels that allow cerebrospinal fluid to rush through like a **nightly biological dishwasher**, power-washing away metabolic byproducts, tau proteins, and amyloid plaques.

If your sleep is fragmented by ambient light, late alcohol, or noise, the dishwasher cycle gets cancelled—leaving you with chronic morning brain fog.

---

## 3. Curated Neuromodulation & Autonomic Hardware

Systematically modulate vagal tone with clinical hardware from our Sovereign Store:

${p4_cards}

---

## 4. Next-Level Conversion & Diagnostic Next Steps

Audit your nervous system balance and calculate your HRV recovery baseline:

👉 **[Take the Free 5-Minute Nervous System Diagnostic Quiz](https://123thenextlevel.com/health-quiz)**

📘 **[Download the Full Clinical Longevity Protocol & GP Consultation Workbook](https://123thenextlevel.com/premium-guides)**
`.trim();


// --- ARTICLE 5: WOMEN'S HEALTH & HORMONAL VITALITY ---
const p5_svg1 = generateSvgInfographic({
  title: 'The 28-Day Infradian Symphony: 4 Biological Seasons',
  subtitle: 'Matching training, nutrition, and recovery to the natural follicular and luteal phases.',
  svgInner: `
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>
    <g transform="translate(40, 40)">
      <rect width="160" height="190" rx="10" fill="url(#grad-dark-box)" stroke="#06b6d4" stroke-width="1.5"/>
      <text x="80" y="30" fill="#38bdf8" font-size="12" font-weight="900" text-anchor="middle">1. FOLLICULAR</text>
      <text x="80" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">(Spring Energy)</text>
      <text x="15" y="90" fill="#94a3b8" font-size="10">• Estrogen rising</text>
      <text x="15" y="115" fill="#94a3b8" font-size="10">• High insulin sensitivity</text>
      <text x="15" y="140" fill="#94a3b8" font-size="10">• Peak mental clarity</text>
      <text x="15" y="165" fill="#34d399" font-size="10" font-weight="700">Action: Heavy lifting PRs</text>
    </g>
    <g transform="translate(220, 40)">
      <rect width="160" height="190" rx="10" fill="url(#grad-dark-box)" stroke="#10b981" stroke-width="1.5"/>
      <text x="80" y="30" fill="#34d399" font-size="12" font-weight="900" text-anchor="middle">2. OVULATORY</text>
      <text x="80" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">(Summer Peak)</text>
      <text x="15" y="90" fill="#94a3b8" font-size="10">• Peak testosterone & E2</text>
      <text x="15" y="115" fill="#94a3b8" font-size="10">• Max power output</text>
      <text x="15" y="140" fill="#94a3b8" font-size="10">• Maximum sociability</text>
      <text x="15" y="165" fill="#34d399" font-size="10" font-weight="700">Action: Max sprint power</text>
    </g>
    <g transform="translate(400, 40)">
      <rect width="160" height="190" rx="10" fill="url(#grad-dark-box)" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="80" y="30" fill="#fbbf24" font-size="12" font-weight="900" text-anchor="middle">3. LUTEAL</text>
      <text x="80" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">(Autumn Wind-Down)</text>
      <text x="15" y="90" fill="#94a3b8" font-size="10">• Progesterone dominant</text>
      <text x="15" y="115" fill="#94a3b8" font-size="10">• BMR burns +250 kcal</text>
      <text x="15" y="140" fill="#94a3b8" font-size="10">• Lower carb tolerance</text>
      <text x="15" y="165" fill="#fbbf24" font-size="10" font-weight="700">Action: Strength & fat fuels</text>
    </g>
    <g transform="translate(580, 40)">
      <rect width="160" height="190" rx="10" fill="url(#grad-dark-box)" stroke="#f43f5e" stroke-width="1.5"/>
      <text x="80" y="30" fill="#fb7185" font-size="12" font-weight="900" text-anchor="middle">4. MENSTRUAL</text>
      <text x="80" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">(Winter Restoration)</text>
      <text x="15" y="90" fill="#94a3b8" font-size="10">• Hormones at baseline</text>
      <text x="15" y="115" fill="#94a3b8" font-size="10">• Deep restorative sleep</text>
      <text x="15" y="140" fill="#94a3b8" font-size="10">• Left/Right brain sync</text>
      <text x="15" y="165" fill="#fb7185" font-size="10" font-weight="700">Action: Gentle flow & rest</text>
    </g>
  `,
  viewBox: '0 0 800 280'
});

const p5_cards = [
  generateDynamicAndFallbackProductCard({
    id: 'cgm-us',
    title: 'Continuous Glucose Monitor (Abbott Lingo / Dexcom)',
    subtitle: 'Maps progesterone-driven insulin sensitivity changes throughout your 28-day cycle in real time.',
    price: '$89.00 / month',
    priceSecondary: '£79.00 / 79,00€',
    badgeText: 'FDA Cleared Continuous Sensor',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/cgm.png',
    productType: 'Infradian Metabolic Biosensor',
    dealUrl: 'https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20',
    dealBtnText: 'View Live Deal'
  }),
  generateDynamicAndFallbackProductCard({
    id: 'segmental-scale-us',
    title: 'Withings Body Scan Segmental Composition Scale',
    subtitle: 'Measures segmental lean muscle mass, visceral fat, and bone mineral density trends.',
    price: '$399.95',
    priceSecondary: '£349.99 / 399,95€',
    badgeText: 'FDA Cleared 6-Lead ECG',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/body-scan.png',
    productType: 'Segmental Bone & Lean Scale',
    dealUrl: 'https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20',
    dealBtnText: 'Check Live Deal'
  }),
  generateDynamicAndFallbackProductCard({
    id: 'sirtuin-stack-us',
    title: 'Momentous Sirtuin Activation & Cell Recovery Stack',
    subtitle: 'Mitochondrial antioxidant support preserving ovarian resilience and cellular energy production.',
    price: '$89.95',
    priceSecondary: '£79.99 / 89,95€',
    badgeText: 'NSF Certified for Sport',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sirtuin-stack.png',
    productType: 'Mitochondrial Cellular Stack',
    dealUrl: 'https://livemomentous.com/modernwisdom?code=modernwisdom',
    dealBtnText: 'Get Sirtuin Stack'
  })
].join('\n\n');

const p5_content = `# Women's Hormonal Vitality: Infradian Clock Sync, Metabolic Stability & Bone Architecture

## Women Are Not "Small Men": The 28-Day Infradian Symphony

For nearly a century, mainstream exercise science and dietary protocols were designed almost exclusively around young male biology. Men operate primarily on a 24-hour circadian clock; their testosterone peaks every morning and resets daily.

Women, by contrast, operate on a dual biological rhythm: the 24-hour Circadian Clock and the **28-Day Infradian Symphony**.

Trying to force a female body into a rigid, identical daily routine ignores the natural hormonal seasons that govern metabolism, insulin sensitivity, brain chemistry, and muscle recovery.

${p5_svg1}

---

## 1. The 4 Biological Seasons of the Infradian Cycle

> **The Everyday Analogy: The Four Seasons**
> Just as you would not plant spring seeds in the dead of winter, you should not push for personal records or do extreme carbohydrate restriction when your body is preparing for restorative repair.

- **Spring (Follicular Phase):** Estrogen rises. Insulin sensitivity is high, creativity surges, and your body can handle intense strength training and intermittent fasting with ease.
- **Summer (Ovulatory Phase):** Estrogen and testosterone reach their monthly zenith. You have maximum strength and social energy.
- **Autumn (Luteal Phase):** Progesterone takes the wheel. Your resting metabolic rate increases by 150–250 kcal/day, but insulin sensitivity drops. Your body requires complex carbohydrates (sweet potatoes, squash) and magnesium to prevent sleep disruption.
- **Winter (Menstrual Phase):** Hormones drop to baseline. The hemispheres of the brain communicate with maximum synchronization, making it the ideal window for strategic planning, rest, and gentle movement.

---

## 2. Ovarian Health: The Master Clock of Long-Term Longevity

Your ovaries are not just reproductive organs; they are the metabolic pacemakers of female longevity. Ovaries age up to four times faster than any other tissue in the human body.

When ovarian output declines, cardiovascular risk, bone demineralization, and insulin resistance rise significantly. By safeguarding mitochondrial health with targeted sirtuin precursors and tracking segmental lean mass, women can safeguard bone density and cardiovascular youth for decades.

---

## 3. Curated Infradian & Ovarian Longevity Arsenal

Optimize infradian phases and ovarian longevity with hardware from our Sovereign Store:

${p5_cards}

---

## 4. Next-Level Conversion & Diagnostic Next Steps

Align your training with your infradian rhythm and audit your hormonal baseline:

👉 **[Take the Free 5-Minute Women's Health & Hormonal Diagnostic Quiz](https://123thenextlevel.com/health-quiz)**

📘 **[Download the Full Clinical Longevity Protocol & GP Consultation Workbook](https://123thenextlevel.com/premium-guides)**
`.trim();


// --- ARTICLE 6: SOCIO-ARCHITECTURE & BIO-NETWORKS ---
const p6_svg1 = generateSvgInfographic({
  title: 'The Circadian Living Sanctuary: 24-Hour Photobiology Protocol',
  subtitle: 'Aligning light wavelengths and indoor air physics with your evolutionary biological clock.',
  svgInner: `
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>
    <g transform="translate(40, 40)">
      <rect width="160" height="190" rx="10" fill="url(#grad-dark-box)" stroke="#06b6d4" stroke-width="1.5"/>
      <text x="80" y="30" fill="#38bdf8" font-size="12" font-weight="900" text-anchor="middle">DAWN (06:30 - 08:30)</text>
      <text x="80" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Direct Sunlight</text>
      <text x="15" y="90" fill="#94a3b8" font-size="10">• 10,000+ Lux photons</text>
      <text x="15" y="115" fill="#94a3b8" font-size="10">• SCN clock reset</text>
      <text x="15" y="140" fill="#94a3b8" font-size="10">• Sets 14hr sleep timer</text>
      <text x="15" y="165" fill="#34d399" font-size="10" font-weight="700">Suppresses Melatonin</text>
    </g>
    <g transform="translate(220, 40)">
      <rect width="160" height="190" rx="10" fill="url(#grad-dark-box)" stroke="#10b981" stroke-width="1.5"/>
      <text x="80" y="30" fill="#34d399" font-size="12" font-weight="900" text-anchor="middle">DAY (09:00 - 17:00)</text>
      <text x="80" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">High Focus Work</text>
      <text x="15" y="90" fill="#94a3b8" font-size="10">• 5000K bright lighting</text>
      <text x="15" y="115" fill="#94a3b8" font-size="10">• CO2 &lt; 600 PPM fresh air</text>
      <text x="15" y="140" fill="#94a3b8" font-size="10">• Biophilic plants active</text>
      <text x="15" y="165" fill="#34d399" font-size="10" font-weight="700">Peak Executive Focus</text>
    </g>
    <g transform="translate(400, 40)">
      <rect width="160" height="190" rx="10" fill="url(#grad-dark-box)" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="80" y="30" fill="#fbbf24" font-size="12" font-weight="900" text-anchor="middle">DUSK (18:00 - 21:00)</text>
      <text x="80" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Amber Downregulation</text>
      <text x="15" y="90" fill="#94a3b8" font-size="10">• 2200K zero-blue light</text>
      <text x="15" y="115" fill="#94a3b8" font-size="10">• Far-infrared recovery</text>
      <text x="15" y="140" fill="#94a3b8" font-size="10">• Acoustic noise defense</text>
      <text x="15" y="165" fill="#fbbf24" font-size="10" font-weight="700">Vagal Tone Rebound</text>
    </g>
    <g transform="translate(580, 40)">
      <rect width="160" height="190" rx="10" fill="url(#grad-dark-box)" stroke="#f43f5e" stroke-width="1.5"/>
      <text x="80" y="30" fill="#fb7185" font-size="12" font-weight="900" text-anchor="middle">NIGHT (22:00 - 06:30)</text>
      <text x="80" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Zero-Lux Sanctuary</text>
      <text x="15" y="90" fill="#94a3b8" font-size="10">• 100% Blackout (0 Lux)</text>
      <text x="15" y="115" fill="#94a3b8" font-size="10">• 18°C ambient cool</text>
      <text x="15" y="140" fill="#94a3b8" font-size="10">• Zero-wearable mattress</text>
      <text x="15" y="165" fill="#fb7185" font-size="10" font-weight="700">Deep Glymphatic Wash</text>
    </g>
  `,
  viewBox: '0 0 800 280'
});

const p6_cards = [
  generateDynamicAndFallbackProductCard({
    id: 'sleep-analyzer-us',
    title: 'Withings Sleep Analyzer Under-Mattress Pad',
    subtitle: 'Zero-wearable contact-free pad logging sleep architecture, resting heart rate, and sleep apnea without wearing devices in bed.',
    price: '$129.95',
    priceSecondary: '£119.99 / 129,95€',
    badgeText: 'Touch-Free Sleep Science',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sleep-analyzer.png',
    productType: 'Zero-Contact Sleep Biosensor',
    dealUrl: 'https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20',
    dealBtnText: 'Order Sleep Analyzer'
  }),
  generateDynamicAndFallbackProductCard({
    id: 'sauna-us',
    title: 'LifePro RejuvaWrap Far-Infrared Sauna Blanket',
    subtitle: 'Far-infrared thermal sanctuary engineered for cellular recovery, deep detoxification, and parasympathetic calm.',
    price: '$228.46',
    priceSecondary: '£254.99 / 289,99€',
    badgeText: 'Low EMF Thermal Recovery Sanctuary',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sauna.png',
    productType: 'Biophilic Thermal Ecosystem',
    dealUrl: 'https://www.amazon.com/dp/B09PSKN6X3?tag=123znl0e-20',
    dealBtnText: 'Check Sauna Deal'
  }),
  generateDynamicAndFallbackProductCard({
    id: 'headphones-us',
    title: 'Soundcore by Anker Q20i Hybrid Active Noise Cancelling Headphones',
    subtitle: 'Acoustic isolation headset allowing complete control over personal sonic environments and auditory resets.',
    price: '$37.98',
    priceSecondary: '£28.40 / 49,99€',
    badgeText: 'Acoustic Sanctuary & Noise Defense',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sony-headphones.png',
    productType: 'Acoustic Sanctuary & Noise Defense',
    dealUrl: 'https://www.amazon.com/dp/B0C3HCD34R?tag=123znl0e-20',
    dealBtnText: 'Buy on Amazon'
  })
].join('\n\n');

const p6_content = `# Socio-Architecture: Turning Your Home into a Recovery Sanctuary & Circadian Haven

## The Built Environment: An Evolutionary Mismatch

Modern humans spend approximately 90% of their lives inside built structures. Yet, contemporary residential and office architecture has evolved around cost and aesthetic minimalism, largely ignoring human evolutionary biology.

The typical modern home is an evolutionary mismatch: flooded with continuous artificial blue light (480nm), devoid of natural circadian solar cues, filled with stagnant carbon dioxide, and isolated from nature.

**Socio-Architecture** is the clinical science of turning built spaces into continuous biological rejuvenation sanctuaries.

${p6_svg1}

---

## 1. The Home as a Biological Charging Dock

> **The Everyday Analogy: Charging Your Phone vs. Charging Your Biology**
> If you plugged your smartphone into a damaged, flickering wall outlet with power surges, the battery would degrade in months. Yet, we sleep in rooms with electromagnetic noise, elevated carbon dioxide, and blue standby LEDs—and wonder why our biological battery never reaches 100%.

By engineering three foundational elements, you can transform your home into an active health-generating space:

### A. Circadian Lighting & Photobiology
- **Morning Sunlight:** Viewing 10,000+ lux of natural dawn sunlight suppresses melatonin, spikes morning cortisol cleanly, and sets a 14-hour countdown timer for deep nocturnal sleep.
- **Evening Amber Sanctuary:** Switching to 2200K zero-blue amber illumination after sundown allows your pineal gland to release natural melatonin unimpeded.

### B. Indoor Aerobiology & Fresh Air Scrubbing
Indoor air is frequently 2 to 5 times more stagnant than outdoor air. High bedroom carbon dioxide ($CO_2 > 1,200$ ppm) causes morning headaches and grogginess. Using true HEPA and activated carbon filtration scrubs volatile organic compounds and fine particulates from your sleeping quarters.

### C. Acoustic Sanctuary & Parasympathetic Co-Regulation
Urban environments generate constant sub-audible low-frequency hums that keep the nervous system in a state of low-grade vigilance. Employing active acoustic defense and far-infrared thermal recovery allows heart rate variability to rebound.

---

## 2. Curated Socio-Architectural & Environmental Hardware

Transform your physical living space into a high-performance wellness sanctuary with hardware from our Sovereign Store:

${p6_cards}

---

## 3. Next-Level Conversion & Diagnostic Next Steps

Audit your home environment and calculate your living sanctuary score:

👉 **[Take the Free 5-Minute Living Sanctuary Diagnostic Quiz](https://123thenextlevel.com/health-quiz)**

📘 **[Download the Full Clinical Longevity Protocol & GP Consultation Workbook](https://123thenextlevel.com/premium-guides)**
`.trim();


// ==============================================================================
// 4. PREPARE THE COMPLETE ARTICLE OBJECTS
// ==============================================================================
const ARTICLES_V5 = [
  {
    slug: 'performance-biodata-protocols',
    title: "Performance & Biodata: Reading Your Body's Dashboard, Lactate Gears & Smarter Recovery",
    excerpt: "A layman-friendly masterclass on reading your body's biometric dashboard, using lactate as high-octane rocket fuel, and training smarter with precision telemetry.",
    content: p1_content,
    cover_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/performance_biodata_cover.png',
    category: 'fitness',
    author: '123TheNextLevel Clinical Advisory Board',
    tags: ['Biodata', 'Lactate Threshold', 'Zone 2', 'Recovery', 'Smart Wearables', 'VO2 Max'],
    reading_time_minutes: 12,
    featured: true,
    status: 'draft',
    published_at: null,
    meta_title: 'Performance & Biodata Masterclass | 123TheNextLevel',
    meta_description: "Learn how to read your body's dashboard, master Zone 2 and lactate thresholds, and recover faster with precision biosensors.",
    og_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/performance_biodata_cover.png'
  },
  {
    slug: 'healthspan-longevity-epigenetic-optimization',
    title: 'Healthspan & Longevity: Upgrading Your Cellular Software, Clearing Cellular Junk & Arterial Health',
    excerpt: 'How cleaning cellular zombie cells, upgrading DNA software, and managing ApoB delivery trucks slows biological aging and extends your active healthspan.',
    content: p2_content,
    cover_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/healthspan_longevity_cover.png',
    category: 'health',
    author: '123TheNextLevel Clinical Advisory Board',
    tags: ['Healthspan', 'ApoB', 'Epigenetics', 'Sirtuins', 'Senescent Cells', 'Arterial Health'],
    reading_time_minutes: 12,
    featured: true,
    status: 'draft',
    published_at: null,
    meta_title: 'Healthspan & Longevity Masterclass | 123TheNextLevel',
    meta_description: 'Discover how ApoB delivery trucks and senescent zombie cells influence aging, and how to upgrade your cellular software for lifelong vitality.',
    og_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/healthspan_longevity_cover.png'
  },
  {
    slug: 'metabolic-nutrition-glycemic-mastery',
    title: 'Metabolic Nutrition: Your Real-Time Fuel Gauge, Steady Energy & Glycemic Freedom',
    excerpt: 'Stop the 3:00 PM energy crash. Learn how to use a continuous glucose monitor like a live fuel gauge and use skeletal muscle as your main metabolic sink.',
    content: p3_content,
    cover_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/metabolic_nutrition_cover.png',
    category: 'nutrition',
    author: '123TheNextLevel Clinical Advisory Board',
    tags: ['Metabolic Health', 'CGM', 'GLP-1', 'Glucose Spikes', 'Insulin Sensitivity', 'Muscle Mass'],
    reading_time_minutes: 11,
    featured: true,
    status: 'draft',
    published_at: null,
    meta_title: 'Metabolic Nutrition & Glycemic Mastery | 123TheNextLevel',
    meta_description: 'Master your blood sugar, stop afternoon energy crashes, and discover how skeletal muscle acts as your body’s primary glucose sink.',
    og_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/metabolic_nutrition_cover.png'
  },
  {
    slug: 'autonomic-engineering-neuro-regulation',
    title: "Autonomic Engineering: Mastering Your Nervous System's Gas & Brake Pedals",
    excerpt: 'Discover why your stress accelerator is stuck down, how the vagus nerve acts as your biological brake, and how nightly brain washing cleans your mind.',
    content: p4_content,
    cover_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/autonomic_engineering_cover.png',
    category: 'wellness',
    author: '123TheNextLevel Clinical Advisory Board',
    tags: ['Nervous System', 'Vagus Nerve', 'HRV', 'Sleep Quality', 'Glymphatic Wash', 'Stress Relief'],
    reading_time_minutes: 12,
    featured: true,
    status: 'draft',
    published_at: null,
    meta_title: 'Autonomic Engineering & Nervous System Reset | 123TheNextLevel',
    meta_description: 'Master your nervous system gas and brake pedals, boost heart rate variability (HRV), and unlock restorative delta sleep.',
    og_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/autonomic_engineering_cover.png'
  },
  {
    slug: 'womens-health-hormonal-vitality',
    title: "Women's Hormonal Vitality: Infradian Clock Sync, Metabolic Stability & Bone Architecture",
    excerpt: 'Women are not small men. Learn how to synchronize your workouts, meals, and recovery with the four seasons of your 28-day infradian rhythm.',
    content: p5_content,
    cover_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/womens_health_cover.png',
    category: 'womens-health',
    author: '123TheNextLevel Clinical Advisory Board',
    tags: ["Women's Health", 'Infradian Rhythm', 'Hormone Balance', 'Ovarian Health', 'Bone Density', 'Metabolism'],
    reading_time_minutes: 13,
    featured: true,
    status: 'draft',
    published_at: null,
    meta_title: "Women's Hormonal Vitality Masterclass | 123TheNextLevel",
    meta_description: 'Understand the 4 seasons of your 28-day infradian cycle, optimize strength and nutrition, and safeguard ovarian and bone health.',
    og_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/womens_health_cover.png'
  },
  {
    slug: 'socio-architecture-bio-networks',
    title: 'Socio-Architecture: Turning Your Home into a Recovery Sanctuary & Circadian Haven',
    excerpt: 'Turn your living space into a biological charging dock with 24-hour solar lighting, indoor air purification, and far-infrared recovery ecosystems.',
    content: p6_content,
    cover_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/socio_architecture_cover.png',
    category: 'social-fitness',
    author: '123TheNextLevel Clinical Advisory Board',
    tags: ['Socio-Architecture', 'Circadian Lighting', 'Air Quality', 'Sauna Recovery', 'Noise Defense', 'Sanctuary'],
    reading_time_minutes: 12,
    featured: true,
    status: 'draft',
    published_at: null,
    meta_title: 'Socio-Architecture & Home Sanctuary | 123TheNextLevel',
    meta_description: 'Learn how to engineer your home environment with circadian light, pure air, and acoustic calm to turn living spaces into recovery sanctuaries.',
    og_image_url: 'https://seoaictzhmqdwnkfymxt.supabase.co/storage/v1/object/public/blog-covers/socio_architecture_cover.png'
  }
];

// ==============================================================================
// 5. GENERATE SQL SCRIPT (VERSION 5)
// ==============================================================================
function escapeSql(str) {
  if (!str) return "''";
  return "'" + str.replace(/'/g, "''") + "'";
}

function generateSqlScript() {
  let sql = `-- ==============================================================================
-- SUPABASE BLOGS SCHEMA & SEED MIGRATION SCRIPT (VERSION 5 - ENGAGING ANALOGIES & DYNAMIC PRODUCTS)
-- Table: public.blogs & public.blog_posts
-- Description: Creates public.blogs schema with RLS, performance indexes, triggers,
--              and seeds all 6 engaging layman-friendly masterclass articles featuring everyday
--              medical analogies (ApoB delivery trucks, cellular software, fuel gauges, gas vs brake),
--              High-Definition Vector SVG Infographics, Dynamic Product Cards (<ProductCard id="..." />),
--              and Funnel CTAs. All seeded with status = 'draft'.
-- ==============================================================================

-- 1. Create the blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT NOT NULL DEFAULT 'wellness',
  author TEXT NOT NULL DEFAULT '123TheNextLevel Clinical Advisory Board',
  tags TEXT[] DEFAULT '{}',
  reading_time_minutes INTEGER DEFAULT 12,
  featured BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Also ensure public.blog_posts table exists for dual-table backward compatibility
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  cover_image_url TEXT,
  category TEXT NOT NULL DEFAULT 'wellness',
  author TEXT NOT NULL DEFAULT '123TheNextLevel Clinical Advisory Board',
  tags TEXT[] DEFAULT '{}',
  reading_time_minutes INTEGER DEFAULT 12,
  featured BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status_published_at ON public.blogs(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);

-- 3. Automatic updated_at Timestamp Trigger
CREATE OR REPLACE FUNCTION public.handle_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_blogs_updated_at ON public.blogs;
CREATE TRIGGER trigger_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.handle_blogs_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 4a. Public Read Policy:
DROP POLICY IF EXISTS "Public can view published blogs only" ON public.blogs;
CREATE POLICY "Public can view published blogs only"
ON public.blogs
FOR SELECT
USING (
  status = 'published'
  AND published_at IS NOT NULL
  AND published_at <= timezone('utc'::text, now())
);

DROP POLICY IF EXISTS "Public can view published blog_posts only" ON public.blog_posts;
CREATE POLICY "Public can view published blog_posts only"
ON public.blog_posts
FOR SELECT
USING (
  status = 'published'
  AND published_at IS NOT NULL
  AND published_at <= timezone('utc'::text, now())
);

-- 4b. Authenticated / Service Role Policy:
DROP POLICY IF EXISTS "Service role and authenticated users full access" ON public.blogs;
CREATE POLICY "Service role and authenticated users full access"
ON public.blogs
FOR ALL
USING (
  auth.role() = 'service_role' OR auth.role() = 'authenticated'
)
WITH CHECK (
  auth.role() = 'service_role' OR auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Service role and authenticated users full access blog_posts" ON public.blog_posts;
CREATE POLICY "Service role and authenticated users full access blog_posts"
ON public.blog_posts
FOR ALL
USING (
  auth.role() = 'service_role' OR auth.role() = 'authenticated'
)
WITH CHECK (
  auth.role() = 'service_role' OR auth.role() = 'authenticated'
);

-- 5. Enable Realtime Replication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
      AND schemaname = 'public' 
      AND tablename = 'blogs'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.blogs;
  END IF;
END $$;

-- 6. Clean up legacy triggers to prevent bulk insert false alarms
DROP TRIGGER IF EXISTS trigger_queue_empty_blogs ON public.blogs;
DROP TRIGGER IF EXISTS trigger_queue_empty_blog_posts ON public.blog_posts;
DROP FUNCTION IF EXISTS public.notify_blog_queue_empty_check();

-- 7. Seed 6 Layman-Friendly Masterclasses to public.blogs (All status = 'draft', published_at = NULL)
`;

  ARTICLES_V5.forEach((article) => {
    sql += `
INSERT INTO public.blogs (
  slug,
  title,
  excerpt,
  content,
  cover_image_url,
  category,
  author,
  tags,
  reading_time_minutes,
  featured,
  status,
  published_at,
  meta_title,
  meta_description,
  og_image_url
) VALUES (
  ${escapeSql(article.slug)},
  ${escapeSql(article.title)},
  ${escapeSql(article.excerpt)},
  ${escapeSql(article.content)},
  ${escapeSql(article.cover_image_url)},
  ${escapeSql(article.category)},
  ${escapeSql(article.author)},
  ARRAY[${article.tags.map(t => escapeSql(t)).join(', ')}],
  ${article.reading_time_minutes},
  ${article.featured},
  'draft',
  NULL,
  ${escapeSql(article.meta_title)},
  ${escapeSql(article.meta_description)},
  ${escapeSql(article.og_image_url)}
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  cover_image_url = EXCLUDED.cover_image_url,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  tags = EXCLUDED.tags,
  reading_time_minutes = EXCLUDED.reading_time_minutes,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  og_image_url = EXCLUDED.og_image_url,
  updated_at = timezone('utc'::text, now());
`;
  });

  sql += `
-- 8. Also seed to public.blog_posts for dual-table compatibility
`;

  ARTICLES_V5.forEach((article) => {
    sql += `
INSERT INTO public.blog_posts (
  slug,
  title,
  excerpt,
  content,
  image_url,
  cover_image_url,
  category,
  author,
  tags,
  reading_time_minutes,
  featured,
  status,
  published_at
) VALUES (
  ${escapeSql(article.slug)},
  ${escapeSql(article.title)},
  ${escapeSql(article.excerpt)},
  ${escapeSql(article.content)},
  ${escapeSql(article.cover_image_url)},
  ${escapeSql(article.cover_image_url)},
  ${escapeSql(article.category)},
  ${escapeSql(article.author)},
  ARRAY[${article.tags.map(t => escapeSql(t)).join(', ')}],
  ${article.reading_time_minutes},
  ${article.featured},
  'draft',
  NULL
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  image_url = EXCLUDED.image_url,
  cover_image_url = EXCLUDED.cover_image_url,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  tags = EXCLUDED.tags,
  reading_time_minutes = EXCLUDED.reading_time_minutes,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  updated_at = timezone('utc'::text, now());
`;
  });

  return sql;
}

// ==============================================================================
// 6. EXECUTE SCRIPT & SEED DATABASE
// ==============================================================================
async function main() {
  console.log('================================================================');
  console.log('🚀 GENERATING & SEEDING V5 LAYMAN-FRIENDLY MASTERCLASSES');
  console.log('================================================================\n');

  // 1. Generate SQL File
  const sql = generateSqlScript();
  const sqlFilePath = './supabase-blogs-schema-and-seed-v5.sql';
  fs.writeFileSync(sqlFilePath, sql, 'utf8');
  console.log(`✅ Generated "${sqlFilePath}" (${(sql.length / 1024).toFixed(1)} KB)`);

  // 2. Direct Database Seeding
  console.log('\n2. Seeding articles directly into Supabase database (blog_posts & blogs)...');

  for (const article of ARTICLES_V5) {
    console.log(`\n📄 Seeding: "${article.title}" (${article.slug})...`);

    // Upsert to blog_posts
    const { error: bpErr } = await supabase
      .from('blog_posts')
      .upsert({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        image_url: article.cover_image_url,
        category: article.category,
        author: article.author,
        tags: article.tags,
        featured: article.featured,
        status: 'draft'
      }, { onConflict: 'slug' });

    if (bpErr) {
      console.warn(`  ⚠️ blog_posts upsert note for ${article.slug}:`, bpErr.message);
    } else {
      console.log(`  ✅ blog_posts: Successfully updated draft.`);
    }

    // Upsert to blogs
    try {
      const { error: bErr } = await supabase
        .from('blogs')
        .upsert({
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          cover_image_url: article.cover_image_url,
          category: article.category,
          author: article.author,
          tags: article.tags,
          reading_time_minutes: article.reading_time_minutes,
          featured: article.featured,
          status: 'draft',
          published_at: null,
          meta_title: article.meta_title,
          meta_description: article.meta_description,
          og_image_url: article.og_image_url,
          updated_at: new Date().toISOString()
        }, { onConflict: 'slug' });

      if (bErr) {
        console.warn(`  ⚠️ blogs table note for ${article.slug}:`, bErr.message);
      } else {
        console.log(`  ✅ blogs: Successfully updated draft.`);
      }
    } catch {}
  }

  console.log('\n================================================================');
  console.log('🎉 ALL 6 V5 MASTERCLASSES SEEDED SUCCESSFULLY!');
  console.log('================================================================');
}

main().catch(console.error);
