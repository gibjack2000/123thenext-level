import fs from 'fs';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
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
  viewBox = '0 0 800 300'
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
// 2. HELPER: MIRRORED AFFILIATE PRODUCT CARD GENERATOR (V4)
// ==============================================================================
function generateProductCardV4({
  title,
  subtitle,
  price,
  priceSecondary,
  badgeText,
  imageUrl,
  productType = 'Clinical Grade Hardware',
  dealUrl,
  dealBtnText = 'Direct Live Deal',
  storeUrl = 'https://123thenextlevel.com/store'
}) {
  return `
<div class="product-card-box my-8 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-cyan-500/50" style="margin: 2.25rem 0; padding: 1.5rem; border-radius: 1.25rem; border: 1px solid rgba(255, 255, 255, 0.09); background: rgba(13, 17, 23, 0.85); box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08); backdrop-filter: blur(16px);">
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
// 3. PILLAR 1: PERFORMANCE & BIODATA (SVG + PRODUCTS)
// ==============================================================================
const p1_svg1 = generateSvgInfographic({
  title: 'Continuous Biometric Telemetry Architecture',
  subtitle: 'Multi-stream sensor pipeline mapping real-time internal load vs external wattage output.',
  svgInner: `
    <!-- Background Grid -->
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>
    <line x1="20" y1="70" x2="780" y2="70" stroke="#1e293b" stroke-dasharray="4 4"/>
    <line x1="20" y1="140" x2="780" y2="140" stroke="#1e293b" stroke-dasharray="4 4"/>
    <line x1="20" y1="210" x2="780" y2="210" stroke="#1e293b" stroke-dasharray="4 4"/>

    <!-- Column 1: Sensors -->
    <g transform="translate(40, 30)">
      <rect width="200" height="50" rx="8" fill="url(#grad-dark-box)" stroke="#06b6d4" stroke-width="1.5"/>
      <circle cx="20" cy="25" r="5" fill="#06b6d4"/>
      <text x="35" y="24" fill="#f8fafc" font-size="12" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700">Optical PPG Sensor</text>
      <text x="35" y="38" fill="#94a3b8" font-size="10" font-family="monospace">R-R Intervals & RMSSD</text>
    </g>
    <g transform="translate(40, 90)">
      <rect width="200" height="50" rx="8" fill="url(#grad-dark-box)" stroke="#10b981" stroke-width="1.5"/>
      <circle cx="20" cy="25" r="5" fill="#10b981"/>
      <text x="35" y="24" fill="#f8fafc" font-size="12" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700">NIRS Muscle Biosensor</text>
      <text x="35" y="38" fill="#94a3b8" font-size="10" font-family="monospace">SmO2 & Desaturation %</text>
    </g>
    <g transform="translate(40, 150)">
      <rect width="200" height="50" rx="8" fill="url(#grad-dark-box)" stroke="#f59e0b" stroke-width="1.5"/>
      <circle cx="20" cy="25" r="5" fill="#f59e0b"/>
      <text x="35" y="24" fill="#f8fafc" font-size="12" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700">6-Axis Kinematic IMU</text>
      <text x="35" y="38" fill="#94a3b8" font-size="10" font-family="monospace">Braking Impulse & GCT</text>
    </g>
    <g transform="translate(40, 210)">
      <rect width="200" height="50" rx="8" fill="url(#grad-dark-box)" stroke="#f43f5e" stroke-width="1.5"/>
      <circle cx="20" cy="25" r="5" fill="#f43f5e"/>
      <text x="35" y="24" fill="#f8fafc" font-size="12" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700">Thermal Strain Sensor</text>
      <text x="35" y="38" fill="#94a3b8" font-size="10" font-family="monospace">Core Temp & Heat Flux</text>
    </g>

    <!-- Connector Lines -->
    <path d="M 240 55 L 300 140" stroke="#06b6d4" stroke-width="2" fill="none"/>
    <path d="M 240 115 L 300 140" stroke="#10b981" stroke-width="2" fill="none"/>
    <path d="M 240 175 L 300 140" stroke="#f59e0b" stroke-width="2" fill="none"/>
    <path d="M 240 235 L 300 140" stroke="#f43f5e" stroke-width="2" fill="none"/>

    <!-- Column 2: Edge Processing -->
    <g transform="translate(300, 70)">
      <rect width="200" height="140" rx="12" fill="url(#grad-dark-box)" stroke="#38bdf8" stroke-width="2" filter="url(#glow)"/>
      <text x="100" y="30" fill="#38bdf8" font-size="13" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" text-anchor="middle">EDGE DSP CORE</text>
      <line x1="20" y1="45" x2="180" y2="45" stroke="#334155"/>
      <text x="30" y="68" fill="#cbd5e1" font-size="11" font-family="monospace">• DFA a1 Fractal Pacing</text>
      <text x="30" y="90" fill="#cbd5e1" font-size="11" font-family="monospace">• LT1 / LT2 Shift Mapping</text>
      <text x="30" y="112" fill="#cbd5e1" font-size="11" font-family="monospace">• Asymmetry Vector Decay</text>
    </g>

    <!-- Connector 2 -->
    <path d="M 500 140 L 560 140" stroke="#38bdf8" stroke-width="3" fill="none" marker-end="url(#arrow)"/>

    <!-- Column 3: Clinical Calibration -->
    <g transform="translate(560, 45)">
      <rect width="200" height="190" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
      <rect x="0" y="0" width="200" height="35" rx="12" fill="url(#grad-emerald)"/>
      <text x="100" y="22" fill="#ffffff" font-size="12" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" text-anchor="middle">CALIBRATED ACTION</text>
      <text x="20" y="65" fill="#f8fafc" font-size="11" font-weight="700">Autonomic Readiness</text>
      <text x="20" y="80" fill="#94a3b8" font-size="10">CNS Deload vs Max Velocity</text>
      <text x="20" y="110" fill="#f8fafc" font-size="11" font-weight="700">Capillary Re-Sat Speed</text>
      <text x="20" y="125" fill="#94a3b8" font-size="10">Mitochondrial Recovery Rate</text>
      <text x="20" y="155" fill="#f8fafc" font-size="11" font-weight="700">Dynamic Load Periodization</text>
      <text x="20" y="170" fill="#94a3b8" font-size="10">Prevents Overuse Tendinopathy</text>
    </g>
  `,
  viewBox: '0 0 800 280'
});

const p1_svg2 = generateSvgInfographic({
  title: 'Lactate Dynamics & Physiological Zones Waveform',
  subtitle: 'Biochemical lactate kinetics identifying the exact LT1 aerobic threshold and LT2 anaerobic threshold.',
  svgInner: `
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>
    
    <!-- Axes -->
    <line x1="60" y1="240" x2="740" y2="240" stroke="#475569" stroke-width="2"/>
    <line x1="60" y1="240" x2="60" y2="30" stroke="#475569" stroke-width="2"/>

    <!-- Y-Axis Labels -->
    <text x="50" y="240" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">0</text>
    <text x="50" y="190" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">2 mmol</text>
    <text x="50" y="130" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">4 mmol</text>
    <text x="50" y="60" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">8 mmol</text>

    <!-- Zone Background Bands -->
    <rect x="60" y="30" width="220" height="210" fill="#06b6d4" fill-opacity="0.05"/>
    <rect x="280" y="30" width="220" height="210" fill="#10b981" fill-opacity="0.05"/>
    <rect x="500" y="30" width="240" height="210" fill="#f43f5e" fill-opacity="0.05"/>

    <!-- Zone Labels -->
    <text x="170" y="260" fill="#38bdf8" font-size="11" font-family="monospace" font-weight="700" text-anchor="middle">ZONE 1-2 (Base Aerobic)</text>
    <text x="390" y="260" fill="#34d399" font-size="11" font-family="monospace" font-weight="700" text-anchor="middle">ZONE 3-4 (Threshold)</text>
    <text x="620" y="260" fill="#fb7185" font-size="11" font-family="monospace" font-weight="700" text-anchor="middle">ZONE 5 (VO2 Max)</text>

    <!-- Lactate Curve -->
    <path d="M 60 220 Q 200 215 280 195 T 500 130 T 720 40" fill="none" stroke="#22d3ee" stroke-width="4" filter="url(#glow)"/>

    <!-- Threshold Points -->
    <!-- LT1 -->
    <circle cx="280" cy="195" r="7" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
    <line x1="280" y1="195" x2="280" y2="90" stroke="#10b981" stroke-dasharray="3 3"/>
    <rect x="200" y="60" width="160" height="30" rx="6" fill="#064e3b" stroke="#34d399"/>
    <text x="280" y="80" fill="#34d399" font-size="11" font-weight="800" text-anchor="middle">LT1 (1.8 mmol/L) FatMax</text>

    <!-- LT2 -->
    <circle cx="500" cy="130" r="7" fill="#f43f5e" stroke="#ffffff" stroke-width="2"/>
    <line x1="500" y1="130" x2="500" y2="50" stroke="#f43f5e" stroke-dasharray="3 3"/>
    <rect x="420" y="20" width="160" height="30" rx="6" fill="#881337" stroke="#fb7185"/>
    <text x="500" y="40" fill="#fb7185" font-size="11" font-weight="800" text-anchor="middle">LT2 (4.0 mmol/L) MLSS</text>
  `,
  viewBox: '0 0 800 280'
});

const p1_cards_v4 = [
  generateProductCardV4({
    title: 'Concept2 Remo Indoor Model D Rower',
    subtitle: 'Gold-standard aerobic power, low-impact lactate intervals, and stroke-by-stroke power telemetry for high-output physical longevity.',
    price: '$990.00',
    priceSecondary: '£850.00 / 950€',
    badgeText: 'Clinical Standard PM5 Monitor',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/rower.png',
    productType: 'Precision Ergometer Hardware',
    dealUrl: 'https://www.amazon.com/dp/B099KBD9X8?tag=123znl0e-20',
    dealBtnText: 'View on Amazon Prime',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'Apple Watch Series 10 (GPS 46mm)',
    subtitle: 'Multispectral wrist telemetry capturing continuous HRV RMSSD, ECG rhythm confirmation, wrist temperature fluctuations, and sleep architecture.',
    price: '$399.00',
    priceSecondary: '£379.00 / 399€',
    badgeText: 'FDA Approved Heart Notifications',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/apple-watch.png',
    productType: 'Multispectral Biosensing Wearable',
    dealUrl: 'https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20',
    dealBtnText: 'Buy on Amazon',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'ALLTEST 10-Parameter Urinary Reagent Strips',
    subtitle: 'Instant 2-minute biochemical screen tracking hydration status, specific gravity, urine ketones, and renal micro-albuminuria during heavy training.',
    price: '$14.99',
    priceSecondary: '£12.99 / 14,99€',
    badgeText: 'FDA Cleared & CLIA Waived',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/reagent-strips.png',
    productType: 'Rapid Biochemical Diagnostic',
    dealUrl: 'https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20',
    dealBtnText: 'Order Reagent Strips',
    storeUrl: 'https://123thenextlevel.com/store'
  })
].join('\n\n');

// ==============================================================================
// 4. PILLAR 2: HEALTHSPAN & LONGEVITY (SVG + PRODUCTS)
// ==============================================================================
const p2_svg1 = generateSvgInfographic({
  title: 'Cellular Longevity & Epigenetic Transduction Cascade',
  subtitle: 'Upstream hormetic triggers driving enzymatic longevity switches and systemic rejuvenation phenotypes.',
  svgInner: `
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>

    <!-- Section 1: Stressors -->
    <g transform="translate(40, 35)">
      <rect width="200" height="210" rx="10" fill="url(#grad-dark-box)" stroke="#f59e0b" stroke-width="1.5"/>
      <rect x="0" y="0" width="200" height="32" rx="10" fill="url(#grad-amber)"/>
      <text x="100" y="21" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">HORMETIC STRESSORS</text>
      <text x="20" y="60" fill="#fde68a" font-size="11" font-weight="700">• Caloric Restriction / Fasting</text>
      <text x="20" y="78" fill="#94a3b8" font-size="10">AMP/ATP Ratio Elevation</text>
      <text x="20" y="110" fill="#fde68a" font-size="11" font-weight="700">• Thermal Contrast (Sauna/Cold)</text>
      <text x="20" y="128" fill="#94a3b8" font-size="10">Heat-Shock & Cold-Shock HSPs</text>
      <text x="20" y="160" fill="#fde68a" font-size="11" font-weight="700">• Zone 2 Hypoxic Metabolic Flux</text>
      <text x="20" y="178" fill="#94a3b8" font-size="10">Intracellular NAD+ Demand</text>
    </g>

    <!-- Arrow 1 -->
    <path d="M 240 140 L 300 140" stroke="#f59e0b" stroke-width="3" fill="none"/>

    <!-- Section 2: Pathways -->
    <g transform="translate(300, 35)">
      <rect width="200" height="210" rx="10" fill="url(#grad-dark-box)" stroke="#38bdf8" stroke-width="1.5"/>
      <rect x="0" y="0" width="200" height="32" rx="10" fill="url(#grad-cyan)"/>
      <text x="100" y="21" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">SIGNAL TRANSDUCTION</text>
      <text x="20" y="60" fill="#7dd3fc" font-size="11" font-weight="700">• AMPK Activation</text>
      <text x="20" y="78" fill="#94a3b8" font-size="10">mTORC1 Downregulation</text>
      <text x="20" y="110" fill="#7dd3fc" font-size="11" font-weight="700">• Sirtuin Deacetylation (SIRT1-7)</text>
      <text x="20" y="128" fill="#94a3b8" font-size="10">FOXO3 & P53 Modulation</text>
      <text x="20" y="160" fill="#7dd3fc" font-size="11" font-weight="700">• PGC-1alpha Co-Activation</text>
      <text x="20" y="178" fill="#94a3b8" font-size="10">Nuclear/mtDNA Transcription</text>
    </g>

    <!-- Arrow 2 -->
    <path d="M 500 140 L 560 140" stroke="#38bdf8" stroke-width="3" fill="none"/>

    <!-- Section 3: Phenotypes -->
    <g transform="translate(560, 35)">
      <rect width="200" height="210" rx="10" fill="url(#grad-dark-box)" stroke="#10b981" stroke-width="1.5"/>
      <rect x="0" y="0" width="200" height="32" rx="10" fill="url(#grad-emerald)"/>
      <text x="100" y="21" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">LONGEVITY PHENOTYPE</text>
      <text x="20" y="60" fill="#a7f3d0" font-size="11" font-weight="700">• Autophagy & Senophagy</text>
      <text x="20" y="78" fill="#94a3b8" font-size="10">SASP Clearance (IL-6 / TNF-a)</text>
      <text x="20" y="110" fill="#a7f3d0" font-size="11" font-weight="700">• PARP DNA Repair Flux</text>
      <text x="20" y="128" fill="#94a3b8" font-size="10">Base Excision & Telomere Shield</text>
      <text x="20" y="160" fill="#a7f3d0" font-size="11" font-weight="700">• Cristae Mitochondrial Density</text>
      <text x="20" y="178" fill="#94a3b8" font-size="10">Suppressed ROS Electron Leak</text>
    </g>
  `,
  viewBox: '0 0 800 280'
});

const p2_cards_v4 = [
  generateProductCardV4({
    title: 'Personalized Cellular Biomarker Map (56 Biomarkers)',
    subtitle: 'Comprehensive 56-biomarker diagnostic blood panel measuring hs-CRP, ApoB, fasting insulin, HbA1c, homocysteine, and metabolic longevity.',
    price: '$299.00',
    priceSecondary: '£149.00 / 149€',
    badgeText: 'CLIA Certified & CAP Accredited',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/blood-panel.png',
    productType: 'Direct-To-Consumer Clinical Diagnostics',
    dealUrl: 'https://www.healthlabs.com/?affiliate=123znl',
    dealBtnText: 'Order Biomarker Panel',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'Momentous Sirtuin Activation Stack',
    subtitle: 'Cellular resilience complex formulated with NAD+ precursors, trans-resveratrol, quercetin, and apigenin for mitochondrial biogenesis.',
    price: '$89.95',
    priceSecondary: '£79.99 / 89,95€',
    badgeText: 'NSF Certified for Sport',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sirtuin-stack.png',
    productType: 'Cellular Longevity Formulation',
    dealUrl: 'https://livemomentous.com/modernwisdom?code=modernwisdom',
    dealBtnText: 'Get Momentous Stack',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'Withings Body Scan Segmental Composition Scale',
    subtitle: 'Clinical-grade bioelectrical impedance analysis segmentally measuring visceral fat, muscle mass per limb, and vascular age.',
    price: '$399.95',
    priceSecondary: '£349.99 / 399,95€',
    badgeText: 'FDA Cleared 8-Electrode BIA',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/body-scan.png',
    productType: 'Clinical Bio-Impedance Telemetry',
    dealUrl: 'https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20',
    dealBtnText: 'View on Amazon',
    storeUrl: 'https://123thenextlevel.com/store'
  })
].join('\n\n');

// ==============================================================================
// 5. PILLAR 3: METABOLIC NUTRITION (SVG + PRODUCTS)
// ==============================================================================
const p3_svg1 = generateSvgInfographic({
  title: 'Glycemic Dynamics & Postprandial Excursions',
  subtitle: 'Comparison between isolated refined carbohydrates vs clinical meal-sequenced metabolic curves.',
  svgInner: `
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>

    <!-- Axes -->
    <line x1="60" y1="230" x2="740" y2="230" stroke="#475569" stroke-width="2"/>
    <line x1="60" y1="230" x2="60" y2="30" stroke="#475569" stroke-width="2"/>

    <!-- Y-Axis Labels -->
    <text x="50" y="230" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">60 mg/dL</text>
    <text x="50" y="170" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">90 mg/dL</text>
    <text x="50" y="110" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">140 mg/dL</text>
    <text x="50" y="50" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="end">180 mg/dL</text>

    <!-- Optimal Green Corridor (75-105 mg/dL) -->
    <rect x="60" y="140" width="680" height="55" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-dasharray="3 3"/>
    <text x="730" y="170" fill="#34d399" font-size="10" font-family="monospace" font-weight="700" text-anchor="end">OPTIMAL METABOLIC CORRIDOR</text>

    <!-- Spike Curve (Unbuffered Carbs) -->
    <path d="M 60 170 Q 180 30 280 45 T 450 225 T 700 170" fill="none" stroke="#f43f5e" stroke-width="3.5" filter="url(#glow)"/>
    <circle cx="230" cy="38" r="6" fill="#f43f5e" stroke="#ffffff" stroke-width="2"/>
    <text x="230" y="24" fill="#fb7185" font-size="10" font-weight="800" text-anchor="middle">Endothelial ROS Spike (180+ mg/dL)</text>
    <circle cx="450" cy="225" r="6" fill="#f43f5e" stroke="#ffffff" stroke-width="2"/>
    <text x="450" y="245" fill="#fb7185" font-size="10" font-weight="800" text-anchor="middle">Reactive Hypoglycemia (Crash & Brain Fog)</text>

    <!-- Sequenced Meal Curve -->
    <path d="M 60 170 Q 200 150 320 145 T 520 160 T 700 170" fill="none" stroke="#22d3ee" stroke-width="4" filter="url(#glow)"/>
    <circle cx="320" cy="145" r="6" fill="#22d3ee" stroke="#ffffff" stroke-width="2"/>
    <text x="320" y="130" fill="#38bdf8" font-size="10" font-weight="800" text-anchor="middle">Sequenced Meal: Max 115 mg/dL (Smooth Satiety)</text>
  `,
  viewBox: '0 0 800 280'
});

const p3_cards_v4 = [
  generateProductCardV4({
    title: 'Continuous Glucose Monitor (Abbott Lingo / Dexcom ONE+)',
    subtitle: 'Real-time interstitial glucose telemetry mapping glycemic spikes, insulin sensitivity, and postprandial excursions with millisecond precision.',
    price: '$89.00/mo',
    priceSecondary: '£79.00 / 79€/mo',
    badgeText: 'FDA Cleared / OTC Eligible',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/cgm.png',
    productType: 'Real-Time Metabolic Biosensor',
    dealUrl: 'https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20',
    dealBtnText: 'Get CGM Monitor',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'Zebora Marine Collagen Peptides Powder',
    subtitle: 'Enzymatically hydrolyzed marine collagen peptides fortified with hyaluronic acid and biotin for gut mucosa integrity and joint repair.',
    price: '$28.99',
    priceSecondary: '£24.99 / 27,99€',
    badgeText: 'Type I & III Hydrolyzed Wild-Caught',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/marine-collagen.png',
    productType: 'Gut Barrier & Structural Matrix',
    dealUrl: 'https://www.amazon.com/dp/B07T8H5N1M?tag=123znl0e-20',
    dealBtnText: 'Order Collagen',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'Owala FreeSip Insulated Water Bottle',
    subtitle: 'Patented FreeSip 24-hour temperature-retaining hydration system for optimal cellular electrolyte delivery and fluid volume balance.',
    price: '$27.99',
    priceSecondary: '£22.99 / 26,99€',
    badgeText: 'Triple-Layer Vacuum Insulated',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/water-bottle.png',
    productType: 'Cellular Hydration Delivery System',
    dealUrl: 'https://www.amazon.com/dp/B08524B5C6?tag=123znl0e-20',
    dealBtnText: 'Buy on Amazon',
    storeUrl: 'https://123thenextlevel.com/store'
  })
].join('\n\n');

// ==============================================================================
// 6. PILLAR 4: AUTONOMIC ENGINEERING (SVG + PRODUCTS)
// ==============================================================================
const p4_svg1 = generateSvgInfographic({
  title: 'Autonomic Nervous System Polyvagal Modulation Loop',
  subtitle: 'Bi-directional somato-visceral neural circuits regulating vagal deceleration and systemic anti-inflammatory cascades.',
  svgInner: `
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>

    <!-- 4 Segmented Interactive Flow Boxes -->
    <g transform="translate(30, 45)">
      <rect width="165" height="190" rx="10" fill="url(#grad-dark-box)" stroke="#06b6d4" stroke-width="1.5"/>
      <rect x="0" y="0" width="165" height="30" rx="10" fill="url(#grad-cyan)"/>
      <text x="82" y="20" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">1. SOMATIC INPUT</text>
      <text x="15" y="60" fill="#7dd3fc" font-size="11" font-weight="700">• Physiological Sigh</text>
      <text x="15" y="75" fill="#94a3b8" font-size="10">2x Inhale + Slow Exhale</text>
      <text x="15" y="105" fill="#7dd3fc" font-size="11" font-weight="700">• Trigeminal Dive Rfx</text>
      <text x="15" y="120" fill="#94a3b8" font-size="10">10°C Facial Splash</text>
      <text x="15" y="150" fill="#7dd3fc" font-size="11" font-weight="700">• Auricular tVNS</text>
      <text x="15" y="165" fill="#94a3b8" font-size="10">25 Hz Cymba Concha</text>
    </g>

    <path d="M 195 140 L 225 140" stroke="#06b6d4" stroke-width="3" fill="none"/>

    <g transform="translate(225, 45)">
      <rect width="165" height="190" rx="10" fill="url(#grad-dark-box)" stroke="#3b82f6" stroke-width="1.5"/>
      <rect x="0" y="0" width="165" height="30" rx="10" fill="#1e3a8a"/>
      <text x="82" y="20" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">2. NEURAL RELAY</text>
      <text x="15" y="60" fill="#93c5fd" font-size="11" font-weight="700">• NTS Nucleus</text>
      <text x="15" y="75" fill="#94a3b8" font-size="10">Baroreceptor Afferents</text>
      <text x="15" y="105" fill="#93c5fd" font-size="11" font-weight="700">• Nucleus Ambiguus</text>
      <text x="15" y="120" fill="#94a3b8" font-size="10">Ventral Vagal Outflow</text>
      <text x="15" y="150" fill="#93c5fd" font-size="11" font-weight="700">• Insular Cortex</text>
      <text x="15" y="165" fill="#94a3b8" font-size="10">Interoceptive Tuning</text>
    </g>

    <path d="M 390 140 L 420 140" stroke="#3b82f6" stroke-width="3" fill="none"/>

    <g transform="translate(420, 45)">
      <rect width="165" height="190" rx="10" fill="url(#grad-dark-box)" stroke="#10b981" stroke-width="1.5"/>
      <rect x="0" y="0" width="165" height="30" rx="10" fill="url(#grad-emerald)"/>
      <text x="82" y="20" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">3. CHOLINERGIC REFLEX</text>
      <text x="15" y="60" fill="#6ee7b7" font-size="11" font-weight="700">• Acetylcholine Release</text>
      <text x="15" y="75" fill="#94a3b8" font-size="10">Sinoatrial Node Pacing</text>
      <text x="15" y="105" fill="#6ee7b7" font-size="11" font-weight="700">• alpha-7 nAChR Binding</text>
      <text x="15" y="120" fill="#94a3b8" font-size="10">Splenic Macrophages</text>
      <text x="15" y="150" fill="#6ee7b7" font-size="11" font-weight="700">• Endothelial Nitric Oxide</text>
      <text x="15" y="165" fill="#94a3b8" font-size="10">Microvascular Dilatation</text>
    </g>

    <path d="M 585 140 L 615 140" stroke="#10b981" stroke-width="3" fill="none"/>

    <g transform="translate(615, 45)">
      <rect width="155" height="190" rx="10" fill="url(#grad-dark-box)" stroke="#f59e0b" stroke-width="1.5"/>
      <rect x="0" y="0" width="155" height="30" rx="10" fill="url(#grad-amber)"/>
      <text x="77" y="20" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">4. SYSTEMIC GAIN</text>
      <text x="15" y="60" fill="#fde68a" font-size="11" font-weight="700">• Heart Deceleration</text>
      <text x="15" y="75" fill="#94a3b8" font-size="10">-15 to 20 bpm in 60s</text>
      <text x="15" y="105" fill="#fde68a" font-size="11" font-weight="700">• Cortisol Blunting</text>
      <text x="15" y="120" fill="#94a3b8" font-size="10">Suppressed Amygdala</text>
      <text x="15" y="150" fill="#fde68a" font-size="11" font-weight="700">• Glymphatic Clearance</text>
      <text x="15" y="165" fill="#94a3b8" font-size="10">Stage 3 Delta Restoration</text>
    </g>
  `,
  viewBox: '0 0 800 280'
});

const p4_cards_v4 = [
  generateProductCardV4({
    title: 'Withings BPM Connect Wi-Fi Blood Pressure Cuff',
    subtitle: 'Medically validated Wi-Fi blood pressure and heart rate monitor instantly synchronizing cardiovascular tone trends and baroreflex response.',
    price: '$99.95',
    priceSecondary: '£89.99 / 99,95€',
    badgeText: 'FDA Cleared & CE Medical Class IIa',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/bpm-connect.png',
    productType: 'Vascular Tone & Hemodynamic Monitor',
    dealUrl: 'https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20',
    dealBtnText: 'Buy on Amazon',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'Sony WH-CH720N Noise-Canceling Headphones',
    subtitle: 'Active acoustic isolation engineered for vagal sensory resets, binaural beat entrainment, and parasympathetic neuromodulation.',
    price: '$149.99',
    priceSecondary: '£119.00 / 129€',
    badgeText: 'Dual Noise Sensor V1 Processor',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sony-headphones.png',
    productType: 'Acoustic Neuromodulation Hardware',
    dealUrl: 'https://www.amazon.com/dp/B0BTY3Y6PP?tag=123znl0e-20',
    dealBtnText: 'View on Amazon',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'Portable Full-Body Infrared Sauna Tent',
    subtitle: 'Deep far-infrared thermal hyperthermia sanctuary triggering heat-shock protein expression and parasympathetic autonomic rebound.',
    price: '$249.00',
    priceSecondary: '£199.99 / 229€',
    badgeText: 'Ultra-Low EMF Carbon Heating Panels',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sauna.png',
    productType: 'Thermal Hyperthermia Recovery Sanctuary',
    dealUrl: 'https://www.amazon.com/dp/B08H23V7S5?tag=123znl0e-20',
    dealBtnText: 'Check Sauna Deal',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'basaho Classic Zafu Meditation Cushion',
    subtitle: 'Ergonomic buckwheat-filled zafu cushion aligning the spine to facilitate unconstrained diaphragmatic excursion and vagal tone.',
    price: '$35.00',
    priceSecondary: '£29.99 / 34,99€',
    badgeText: '100% GOTS Certified Organic Cotton',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/meditation-cushion.png',
    productType: 'Postural & Somatic Alignment Gear',
    dealUrl: 'https://www.amazon.com/dp/B01697W160?tag=123znl0e-20',
    dealBtnText: 'Order Meditation Cushion',
    storeUrl: 'https://123thenextlevel.com/store'
  })
].join('\n\n');

// ==============================================================================
// 7. PILLAR 5: WOMEN'S HEALTH (SVG + PRODUCTS)
// ==============================================================================
const p5_svg1 = generateSvgInfographic({
  title: '28-Day Infradian Hormonal Waveform & Biomarker Peaks',
  subtitle: 'Estradiol, Luteinizing Hormone (LH), and Progesterone fluctuations across the four infradian biological phases.',
  svgInner: `
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>

    <!-- Phase Background Columns -->
    <rect x="60" y="30" width="130" height="210" fill="#f43f5e" fill-opacity="0.06"/>
    <rect x="190" y="30" width="220" height="210" fill="#06b6d4" fill-opacity="0.06"/>
    <rect x="410" y="30" width="70" height="210" fill="#f59e0b" fill-opacity="0.08"/>
    <rect x="480" y="30" width="260" height="210" fill="#8b5cf6" fill-opacity="0.06"/>

    <!-- Phase Labels -->
    <text x="125" y="260" fill="#fda4af" font-size="11" font-family="monospace" font-weight="700" text-anchor="middle">MENSTRUAL (1-5)</text>
    <text x="300" y="260" fill="#67e8f9" font-size="11" font-family="monospace" font-weight="700" text-anchor="middle">FOLLICULAR (6-13)</text>
    <text x="445" y="260" fill="#fde68a" font-size="11" font-family="monospace" font-weight="700" text-anchor="middle">OVUL (14)</text>
    <text x="610" y="260" fill="#c4b5fd" font-size="11" font-family="monospace" font-weight="700" text-anchor="middle">LUTEAL PHASE (15-28)</text>

    <!-- Axes -->
    <line x1="60" y1="240" x2="740" y2="240" stroke="#475569" stroke-width="2"/>
    <line x1="60" y1="240" x2="60" y2="30" stroke="#475569" stroke-width="2"/>

    <!-- Estrogen Curve (Cyan) -->
    <path d="M 60 220 Q 240 210 360 80 T 445 60 T 560 160 T 740 220" fill="none" stroke="#22d3ee" stroke-width="3.5" filter="url(#glow)"/>
    <text x="380" y="55" fill="#38bdf8" font-size="10" font-weight="800">Estradiol Peak (E2)</text>

    <!-- Progesterone Curve (Violet) -->
    <path d="M 60 230 Q 380 230 450 210 T 600 70 T 740 230" fill="none" stroke="#a855f7" stroke-width="3.5" filter="url(#glow)"/>
    <text x="610" y="60" fill="#c084fc" font-size="10" font-weight="800">Progesterone Peak</text>

    <!-- LH Surge Spike (Amber) -->
    <path d="M 420 230 L 445 40 L 470 230" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="3 3"/>
    <text x="445" y="30" fill="#fbbf24" font-size="10" font-weight="800" text-anchor="middle">LH Surge</text>
  `,
  viewBox: '0 0 800 280'
});

const p5_cards_v4 = [
  generateProductCardV4({
    title: 'Ovarian Reserve Female Hormone Test Kit',
    subtitle: 'At-home fingerprick endocrine assessment quantifying Anti-Müllerian Hormone (AMH), FSH, and estradiol to map reproductive and ovarian biological reserve.',
    price: '$49.00',
    priceSecondary: '£39.00 / 45€',
    badgeText: 'CLIA Certified & UKAS Accredited Labs',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/ovarian-test.png',
    productType: 'Endocrine & Reproductive Diagnostic',
    dealUrl: 'https://www.amazon.com/dp/B08H7V69F7?tag=123znl0e-20',
    dealBtnText: 'Order Hormone Test',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'Withings Sleep Analyzer Under-Mattress Pad',
    subtitle: 'Contactless pneumatometric sleep sensor placed beneath the mattress to track sleep cycles, continuous heart rate, and hormonal phase sleep efficiency.',
    price: '$129.95',
    priceSecondary: '£119.99 / 129,95€',
    badgeText: 'CE Medically Validated (Sleep Apnea)',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sleep-analyzer.png',
    productType: 'Contactless Nocturnal Sleep Lab',
    dealUrl: 'https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20',
    dealBtnText: 'Buy on Amazon',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'Zebora Marine Collagen Peptides Powder',
    subtitle: 'Bioactive collagen peptides targeting pelvic floor elasticity, dermis matrix thickness, and joint recovery across luteal and follicular cycles.',
    price: '$28.99',
    priceSecondary: '£24.99 / 27,99€',
    badgeText: 'Non-GMO, Wild-Caught & Gluten-Free',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/marine-collagen.png',
    productType: 'Connective Tissue & Dermis Matrix',
    dealUrl: 'https://www.amazon.com/dp/B07T8H5N1M?tag=123znl0e-20',
    dealBtnText: 'Order Marine Collagen',
    storeUrl: 'https://123thenextlevel.com/store'
  })
].join('\n\n');

// ==============================================================================
// 8. PILLAR 6: SOCIO-ARCHITECTURE (SVG + PRODUCTS)
// ==============================================================================
const p6_svg1 = generateSvgInfographic({
  title: 'Environmental Epigenetic Transduction Architecture',
  subtitle: 'Calibrating indoor photons, aerobiology, biophilic acoustics, and thermal radiation for biological regeneration.',
  svgInner: `
    <rect x="0" y="0" width="800" height="280" rx="12" fill="#0b0f17" stroke="#1e293b" stroke-width="1"/>

    <!-- 4 Nodes -->
    <g transform="translate(40, 35)">
      <rect width="160" height="210" rx="10" fill="url(#grad-dark-box)" stroke="#06b6d4" stroke-width="1.5"/>
      <rect x="0" y="0" width="160" height="30" rx="10" fill="url(#grad-cyan)"/>
      <text x="80" y="20" fill="#ffffff" font-size="10" font-weight="800" text-anchor="middle">PHOTOBIOLOGY</text>
      <text x="15" y="60" fill="#7dd3fc" font-size="11" font-weight="700">480nm Photons</text>
      <text x="15" y="75" fill="#94a3b8" font-size="10">ipRGCs Melanopsin</text>
      <text x="15" y="105" fill="#7dd3fc" font-size="11" font-weight="700">SCN Master Clock</text>
      <text x="15" y="120" fill="#94a3b8" font-size="10">Daytime Alertness</text>
      <text x="15" y="150" fill="#7dd3fc" font-size="11" font-weight="700">2200K Zero-Blue</text>
      <text x="15" y="165" fill="#94a3b8" font-size="10">Melatonin Trigger</text>
    </g>

    <g transform="translate(225, 35)">
      <rect width="160" height="210" rx="10" fill="url(#grad-dark-box)" stroke="#10b981" stroke-width="1.5"/>
      <rect x="0" y="0" width="160" height="30" rx="10" fill="url(#grad-emerald)"/>
      <text x="80" y="20" fill="#ffffff" font-size="10" font-weight="800" text-anchor="middle">AEROBIOLOGY</text>
      <text x="15" y="60" fill="#6ee7b7" font-size="11" font-weight="700">H14 True HEPA</text>
      <text x="15" y="75" fill="#94a3b8" font-size="10">PM2.5 Soot Clearance</text>
      <text x="15" y="105" fill="#6ee7b7" font-size="11" font-weight="700">Activated Carbon</text>
      <text x="15" y="120" fill="#94a3b8" font-size="10">VOC Gas Adsorption</text>
      <text x="15" y="150" fill="#6ee7b7" font-size="11" font-weight="700">Positive Pressure</text>
      <text x="15" y="165" fill="#94a3b8" font-size="10">CO2 &lt; 650 PPM</text>
    </g>

    <g transform="translate(410, 35)">
      <rect width="160" height="210" rx="10" fill="url(#grad-dark-box)" stroke="#f59e0b" stroke-width="1.5"/>
      <rect x="0" y="0" width="160" height="30" rx="10" fill="url(#grad-amber)"/>
      <text x="80" y="20" fill="#ffffff" font-size="10" font-weight="800" text-anchor="middle">BIOPHILIC SOUND</text>
      <text x="15" y="60" fill="#fde68a" font-size="11" font-weight="700">432 Hz Acoustics</text>
      <text x="15" y="75" fill="#94a3b8" font-size="10">Thalamic Pacing</text>
      <text x="15" y="105" fill="#fde68a" font-size="11" font-weight="700">Natural Fractals</text>
      <text x="15" y="120" fill="#94a3b8" font-size="10">Frontal Beta Relief</text>
      <text x="15" y="150" fill="#fde68a" font-size="11" font-weight="700">Plant Phytoncides</text>
      <text x="15" y="165" fill="#94a3b8" font-size="10">NK Immune Priming</text>
    </g>

    <g transform="translate(595, 35)">
      <rect width="165" height="210" rx="10" fill="url(#grad-dark-box)" stroke="#8b5cf6" stroke-width="1.5"/>
      <rect x="0" y="0" width="165" height="30" rx="10" fill="#6d28d9"/>
      <text x="82" y="20" fill="#ffffff" font-size="10" font-weight="800" text-anchor="middle">THERMAL & EMF</text>
      <text x="15" y="60" fill="#c4b5fd" font-size="11" font-weight="700">Far-Infrared (850nm)</text>
      <text x="15" y="75" fill="#94a3b8" font-size="10">Cytochrome c Oxidase</text>
      <text x="15" y="105" fill="#c4b5fd" font-size="11" font-weight="700">EZ Water Shield</text>
      <text x="15" y="120" fill="#94a3b8" font-size="10">Capillary Perfusion</text>
      <text x="15" y="150" fill="#c4b5fd" font-size="11" font-weight="700">Zero-EMF Sleep</text>
      <text x="15" y="165" fill="#94a3b8" font-size="10">VGCC Inactivation</text>
    </g>
  `,
  viewBox: '0 0 800 280'
});

const p6_cards_v4 = [
  generateProductCardV4({
    title: 'Eko CORE 500™ Digital AI Stethoscope',
    subtitle: 'Next-generation digital stethoscope with real-time acoustic amplification and simultaneous 3-lead electrocardiogram for familial health screening.',
    price: '$429.00',
    priceSecondary: '£379.00 / 429€',
    badgeText: 'FDA Cleared 3-Lead ECG & AI Auscultation',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/core-500.png',
    productType: 'Clinical Cardiovascular Telemetry',
    dealUrl: 'https://www.ekohealth.com/products/core-500-digital-stethoscope',
    dealBtnText: 'View Eko CORE 500',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'Portable Full-Body Infrared Sauna Tent',
    subtitle: 'Far-infrared thermal sanctuary engineered for social bio-resonance, shared recovery routines, and home microclimate optimization.',
    price: '$249.00',
    priceSecondary: '£199.99 / 229€',
    badgeText: 'Low EMF Thermal Recovery Sanctuary',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sauna.png',
    productType: 'Biophilic Thermal Ecosystem',
    dealUrl: 'https://www.amazon.com/dp/B08H23V7S5?tag=123znl0e-20',
    dealBtnText: 'Check Sauna Deal',
    storeUrl: 'https://123thenextlevel.com/store'
  }),
  generateProductCardV4({
    title: 'Sony WH-CH720N Noise-Canceling Headphones',
    subtitle: 'Acoustic isolation headset allowing complete control over personal sonic environments and auditory resets in dense urban settings.',
    price: '$149.99',
    priceSecondary: '£119.00 / 129€',
    badgeText: '35-Hour Battery Life & Ultra-Lightweight',
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sony-headphones.png',
    productType: 'Acoustic Sanctuary & Noise Defense',
    dealUrl: 'https://www.amazon.com/dp/B0BTY3Y6PP?tag=123znl0e-20',
    dealBtnText: 'Buy on Amazon',
    storeUrl: 'https://123thenextlevel.com/store'
  })
].join('\n\n');

// ==============================================================================
// 9. COMPILE FULL MASTERCLASSES WITH SVG & V4 PRODUCT CARDS
// ==============================================================================
import {
  p1_content,
  p2_content,
  p3_content,
  p4_content,
  p5_content,
  p6_content
} from './build-v3-masterclasses.js';

// Build updated content with SVG vector diagrams and V4 affiliate product cards
function injectSvgAndV4Cards(content, svg1, svg2, cardsV4) {
  let updated = content;

  // Replace ASCII telemetry with SVG 1
  updated = updated.replace(/```\s*={10,}[\s\S]*?CONTINUOUS BIOMETRIC TELEMETRY ARCHITECTURE[\s\S]*?={10,}\s*```/, svg1);
  updated = updated.replace(/```\s*={10,}[\s\S]*?CELLULAR LONGEVITY & EPIGENETIC CASCADE[\s\S]*?={10,}\s*```/, svg1);
  updated = updated.replace(/```\s*={10,}[\s\S]*?GLYCEMIC DYNAMICS & CELLULAR IMPACT[\s\S]*?={10,}\s*```/, svg1);
  updated = updated.replace(/```\s*={10,}[\s\S]*?AUTONOMIC NERVOUS SYSTEM MODULATION LOOP[\s\S]*?={10,}\s*```/, svg1);
  updated = updated.replace(/```\s*={10,}[\s\S]*?THE 28-DAY INFRADIAN HORMONAL WAVEFORM[\s\S]*?={10,}\s*```/, svg1);
  updated = updated.replace(/```\s*={10,}[\s\S]*?ENVIRONMENTAL EPIGENETIC TRANSDUCTION ARCHITECTURE[\s\S]*?={10,}\s*```/, svg1);

  // Replace second ASCII diagram with SVG 2 if present
  if (svg2) {
    updated = updated.replace(/```\s*={10,}[\s\S]*?LACTATE DYNAMICS & PHYSIOLOGICAL ZONES[\s\S]*?={10,}\s*```/, svg2);
  }

  // Replace product cards section cleanly with V4 cards
  const firstCardIdx = updated.indexOf('<div class="product-card-box');
  if (firstCardIdx !== -1) {
    const afterCardsIdx = updated.indexOf('\n\n---', firstCardIdx);
    if (afterCardsIdx !== -1) {
      updated = updated.slice(0, firstCardIdx) + cardsV4 + updated.slice(afterCardsIdx);
    }
  }

  return updated;
}



const c1 = injectSvgAndV4Cards(p1_content, p1_svg1, p1_svg2, p1_cards_v4);
const c2 = injectSvgAndV4Cards(p2_content, p2_svg1, null, p2_cards_v4);
const c3 = injectSvgAndV4Cards(p3_content, p3_svg1, null, p3_cards_v4);
const c4 = injectSvgAndV4Cards(p4_content, p4_svg1, null, p4_cards_v4);
const c5 = injectSvgAndV4Cards(p5_content, p5_svg1, null, p5_cards_v4);
const c6 = injectSvgAndV4Cards(p6_content, p6_svg1, null, p6_cards_v4);


const articlesV4 = [
  {
    slug: 'performance-biodata-protocols',
    title: 'Performance & Biodata: Telemetry Protocols, Lactate Dynamics & Biomechanical Analytics for High-Output Longevity',
    excerpt: 'A comprehensive clinical masterclass on continuous biometric telemetry, calculating precise lactate thresholds (LT1/LT2), detrended fluctuation analysis (DFA a1), muscle oxygenation (SmO2), and autonomic readiness-based training periodization.',
    content: c1,
    category: 'performance',
    author: '123TheNextLevel Clinical Advisory Board',
    tags: ['Biometrics', 'Lactate Testing', 'HRV Telemetry', 'Zone 2', 'NIRS', 'Biomechanics'],
    reading_time_minutes: 20,
    featured: true,
    status: 'draft',
    cover_image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/performance_biodata_cover.png',
    image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/performance_biodata_cover.png',
    meta_title: 'Performance & Biodata Masterclass | Telemetry, Lactate & Biomechanics',
    meta_description: 'Clinical guide to biometric telemetry, lactate threshold testing, muscle oxygenation analytics, and dynamic training periodization.',
    og_image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/performance_biodata_cover.png'
  },
  {
    slug: 'healthspan-longevity-epigenetic-optimization',
    title: 'Healthspan & Longevity: Epigenetic Reprogramming, NAD+ Dynamics, Senophagy & Mitochondrial Biogenesis',
    excerpt: 'The clinical architecture of human longevity. Explore the nine hallmarks of aging, DNA methylation clocks (Horvath, GrimAge, DunedinPACE), CD38 NAD+ salvage pathways, hit-and-run senolytics, and mitochondrial biogenesis protocols.',
    content: c2,
    category: 'longevity',
    author: '123TheNextLevel Clinical Advisory Board',
    tags: ['Longevity', 'Epigenetic Clocks', 'NAD+', 'Senolytics', 'Autophagy', 'Mitochondria'],
    reading_time_minutes: 21,
    featured: true,
    status: 'draft',
    cover_image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/healthspan_longevity_cover.png',
    image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/healthspan_longevity_cover.png',
    meta_title: 'Healthspan & Longevity Masterclass | Epigenetics, NAD+ & Senolytics',
    meta_description: 'Clinical blueprint for compressing morbidity, reprogramming DNA methylation, restoring cellular NAD+, and inducing targeted senophagy.',
    og_image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/healthspan_longevity_cover.png'
  },
  {
    slug: 'metabolic-nutrition-glycemic-mastery',
    title: 'Metabolic Nutrition: Precision Fueling, Glycemic Mastery & Circadian Nutrient Partitioning',
    excerpt: 'Mastering metabolic flexibility and glycemic stability. An exhaustive guide to clinical meal sequencing, avoiding mitochondrial electron leakage, de novo lipogenesis, early time-restricted feeding, and microbiome short-chain fatty acid metabolomics.',
    content: c3,
    category: 'nutrition',
    author: '123TheNextLevel Clinical Advisory Board',
    tags: ['Metabolic Health', 'Glycemic Control', 'CGM Analytics', 'Insulin Sensitivity', 'Chrono-Nutrition', 'Microbiome'],
    reading_time_minutes: 20,
    featured: true,
    status: 'draft',
    cover_image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/metabolic_nutrition_cover.png',
    image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/metabolic_nutrition_cover.png',
    meta_title: 'Metabolic Nutrition Masterclass | Glycemic Mastery & Chrono-Nutrition',
    meta_description: 'Clinical protocols for glycemic control, meal sequencing, metabolic flexibility, and circadian nutrient partitioning.',
    og_image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/metabolic_nutrition_cover.png'
  },
  {
    slug: 'autonomic-engineering-neuro-regulation',
    title: 'Autonomic Engineering: Neuro-Somatic Protocols, Polyvagal Modulation & Glymphatic Optimization',
    excerpt: 'The science of autonomic regulation. Learn polyvagal nervous system modulation, baroreflex sensitivity conditioning, real-time somatic resets (Physiological Sigh, Trigeminal Dive Reflex), and astrocyte-mediated glymphatic clearance during deep sleep.',
    content: c4,
    category: 'nervous_system',
    author: '123TheNextLevel Clinical Advisory Board',
    tags: ['Autonomic Nervous System', 'Polyvagal Theory', 'Vagus Nerve', 'Sleep Architecture', 'Glymphatics', 'HRV'],
    reading_time_minutes: 20,
    featured: true,
    status: 'draft',
    cover_image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/autonomic_engineering_cover.png',
    image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/autonomic_engineering_cover.png',
    meta_title: 'Autonomic Engineering Masterclass | Polyvagal & Glymphatic Science',
    meta_description: 'Clinical protocols for vagus nerve stimulation, autonomic balance, somatic stress resets, and nocturnal glymphatic sleep optimization.',
    og_image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/autonomic_engineering_cover.png'
  },
  {
    slug: 'womens-health-hormonal-vitality',
    title: 'Women\'s Health: Infradian Synchronization, Ovarian Longevity, Neuro-Endocrine Balancing & Metabolic Precision',
    excerpt: 'An authoritative clinical guide to the 28-day Infradian Rhythm. Discover phase-locked nutrition, seed cycling protocols, steroidogenic enzyme cascades, hepatic estrogen detoxification (CYP1A1 vs CYP1B1), ovarian reserve preservation, and perimenopausal support.',
    content: c5,
    category: 'womens_health',
    author: '123TheNextLevel Clinical Advisory Board',
    tags: ['Infradian Rhythm', 'Hormonal Health', 'Ovarian Reserve', 'Seed Cycling', 'Estrogen Clearance', 'Perimenopause'],
    reading_time_minutes: 20,
    featured: true,
    status: 'draft',
    cover_image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/womens_health_cover.png',
    image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/womens_health_cover.png',
    meta_title: 'Women\'s Health Masterclass | Infradian Rhythms & Ovarian Longevity',
    meta_description: 'Clinical guide to female infradian synchronization, steroidogenesis, ovarian longevity, and metabolic periodization.',
    og_image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/womens_health_cover.png'
  },
  {
    slug: 'socio-architecture-bio-networks',
    title: 'Socio-Architecture: Environmental Neuro-Design, Circadian Photobiology, Biophilic Engineering & Bio-Resonant Ecosystems',
    excerpt: 'Transforming the built environment into an epigenetic enhancer. Explore non-visual retinal photobiology (ipRGCs 480nm melanopsin), aerobiology and VOC clearance, statistical biophilic fractals, non-ionizing EMF mitigation, and interpersonal co-regulation.',
    content: c6,
    category: 'social',
    author: '123TheNextLevel Clinical Advisory Board',
    tags: ['Socio-Architecture', 'Circadian Lighting', 'Biophilic Design', 'Indoor Aerobiology', 'EMF Mitigation', 'Co-Regulation'],
    reading_time_minutes: 20,
    featured: true,
    status: 'draft',
    cover_image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/socio_architecture_cover.png',
    image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/socio_architecture_cover.png',
    meta_title: 'Socio-Architecture Masterclass | Environmental Neuro-Design & Photobiology',
    meta_description: 'Clinical architectural guide to circadian photobiology, indoor aerobiology, biophilic fractals, and restorative sanctuaries.',
    og_image_url: 'https://vvdgsqblhplvubvjndbe.supabase.co/storage/v1/object/public/blog-covers/socio_architecture_cover.png'
  }
];

// Audit Word Counts & SVG
console.log('==================================================================');
console.log(' V4 MASTERCLASS CLINICAL ARTICLES AUDIT (SVG + AFFILIATE CARDS)');
console.log('==================================================================');
for (const a of articlesV4) {
  const wordCount = a.content.trim().split(/\s+/).length;
  const svgCount = (a.content.match(/clinical-svg-infographic/g) || []).length;
  const cardCount = (a.content.match(/product-card-box/g) || []).length;
  console.log(`Pillar [${a.slug}]: ~${wordCount} words | ${svgCount} SVG Diagrams | ${cardCount} Product Cards ✅`);
}

// Write to SQL
function escapeSqlString(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

let sqlOutput = `-- ==============================================================================
-- SUPABASE BLOGS SCHEMA & SEED MIGRATION SCRIPT (VERSION 4 - SVG INFOGRAPHICS & AFFILIATE CARDS)
-- Table: public.blogs & public.blog_posts
-- Description: Creates public.blogs schema with RLS, performance indexes, triggers,
--              and seeds all 6 clinical masterclass articles (3,000+ words each) with
--              embedded SVG vector diagnostic infographics, mirrored affiliate product cards
--              (<div class="product-card-box">...</div>) featuring official store images,
--              live prices, compliance badges, direct affiliate tracking links (deal_url),
--              and Sovereign Store buttons. All seeded with status = 'draft'.
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
  reading_time_minutes INTEGER DEFAULT 20,
  featured BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  affiliate_product_1 UUID REFERENCES public.amazon_affiliate_products(id) ON DELETE SET NULL,
  affiliate_product_2 UUID REFERENCES public.amazon_affiliate_products(id) ON DELETE SET NULL,
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
  reading_time_minutes INTEGER DEFAULT 20,
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

-- 7. Seed 6 Clinical Masterclasses to public.blogs (All status = 'draft', published_at = NULL)
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
) VALUES
`;

const valueRows = articlesV4.map(a => {
  const tagsArray = `ARRAY[${a.tags.map(t => `'${t}'`).join(', ')}]`;
  return `(
  '${a.slug}',
  '${escapeSqlString(a.title)}',
  '${escapeSqlString(a.excerpt)}',
  '${escapeSqlString(a.content)}',
  '${a.cover_image_url}',
  '${a.category}',
  '${escapeSqlString(a.author)}',
  ${tagsArray},
  ${a.reading_time_minutes},
  ${a.featured},
  '${a.status}',
  NULL,
  '${escapeSqlString(a.meta_title)}',
  '${escapeSqlString(a.meta_description)}',
  '${a.og_image_url}'
)`;
});

sqlOutput += valueRows.join(',\n') + `
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
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  og_image_url = EXCLUDED.og_image_url,
  updated_at = timezone('utc'::text, now());

-- 8. Also Synchronize public.blog_posts for dual-table compatibility
INSERT INTO public.blog_posts (
  slug,
  title,
  excerpt,
  content,
  image_url,
  category,
  author,
  tags,
  reading_time_minutes,
  featured,
  status
) VALUES
` + articlesV4.map(a => {
  const tagsArray = `ARRAY[${a.tags.map(t => `'${t}'`).join(', ')}]`;
  return `(
  '${a.slug}',
  '${escapeSqlString(a.title)}',
  '${escapeSqlString(a.excerpt)}',
  '${escapeSqlString(a.content)}',
  '${a.image_url}',
  '${a.category}',
  '${escapeSqlString(a.author)}',
  ${tagsArray},
  ${a.reading_time_minutes},
  ${a.featured},
  '${a.status}'
)`;
}).join(',\n') + `
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  image_url = EXCLUDED.image_url,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  tags = EXCLUDED.tags,
  reading_time_minutes = EXCLUDED.reading_time_minutes,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
`;

fs.writeFileSync('supabase-blogs-schema-and-seed-v4.sql', sqlOutput, 'utf8');
console.log('✅ Successfully wrote full V4 masterclass script to supabase-blogs-schema-and-seed-v4.sql');

async function runDirectSeed() {
  console.log('\n--- Syncing Masterclass V4 Drafts Directly to Live Supabase Database ---');
  for (const a of articlesV4) {
    const wordCount = a.content.split(/\s+/).length;
    console.log(`- ${a.title.substring(0, 45)}... (~${wordCount} words)`);
    
    // Seed to blog_posts
    const blogPostPayload = {
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      category: a.category,
      author: a.author,
      tags: a.tags,
      featured: a.featured,
      status: a.status,
      image_url: a.image_url
    };

    const { data, error } = await supabase
      .from('blog_posts')
      .upsert(blogPostPayload, { onConflict: 'slug' })
      .select('id, title, slug, status')
      .single();

    if (error) {
      console.error(`  ❌ Error seeding ${a.slug} to blog_posts:`, error.message);
    } else {
      console.log(`  ✅ blog_posts synchronized: ID ${data.id} [${data.status}]`);
    }

    // Attempt blogs if table exists
    try {
      const { error: blogsErr } = await supabase
        .from('blogs')
        .upsert(a, { onConflict: 'slug' });
      if (!blogsErr) {
        console.log(`  ✅ blogs table synchronized`);
      } else {
        console.log(`  ℹ️ blogs table note: ${blogsErr.message}`);
      }
    } catch (_) {}
  }
  console.log('\n--- Masterclass V4 Sync Complete! ---');
}

runDirectSeed();
