/**
 * Clinical Masterclass Article Generator Engine
 * Generates authoritative, 2,000+ word longevity masterclasses written in:
 * - Simple, easy-to-understand layman terms with relatable everyday analogies
 * - Clear Executive Summary (Google Featured Snippet optimized)
 * - Simple Visual ASCII Systems Flowcharts
 * - The Science in Plain English (explaining what's happening inside the body)
 * - Key Health Numbers: Standard Reactive vs. Optimal Longevity Targets
 * - Navigating Healthcare: 3 Easy Ways to Get Tested
 * - Word-for-Word Doctor Talking Points (friendly, confident scripts)
 * - 3-Phase Step-by-Step Practical Action Plan
 * - Simple Action Checklist
 * - Free Clinician Co-Pilot 4-Page PDF Workbook Callouts (/clinician-copilot)
 * - Health Baseline Quiz Callout (/health-quiz)
 * - Verified Regional Lab & Equipment Hubs (US, UK, Spain)
 * - Common Questions & Clear Answers (FAQPage schema compatible)
 * - Scientific Studies & Medical Bibliography
 */

export interface PitchInput {
  title: string;
  category: string;
  targetKeyword?: string;
  summary?: string;
  slug?: string;
  regionalProducts?: {
    US?: string;
    UK?: string;
    ES?: string;
  };
}

interface TopicBlueprint {
  subtitle: string;
  directAnswer: string;
  asciiDiagram: string;
  mechanisms: string[];
  biomarkerTable: {
    marker: string;
    standardRange: string;
    optimalRange: string;
    rationale: string;
  }[];
  statutoryScripts: {
    opening: string;
    gatekeeperRebuttal: string;
  };
  protocolPhases: {
    phase1: string;
    phase2: string;
    phase3: string;
  };
  checklist: string[];
  faqs: {
    q: string;
    a: string;
  }[];
  citations: string[];
}

// Curated specialized blueprints for high-intent longevity domains in plain English
const TOPIC_BLUEPRINTS: Record<string, Partial<TopicBlueprint>> = {
  // --- HEALTHSPAN INTELLIGENCE ---
  apob: {
    subtitle: "Protecting Your Arteries: The True Number Behind Heart Health",
    directAnswer: "Think of cholesterol in your blood like cargo, and the particles carrying it like delivery trucks driving down a highway. Standard cholesterol tests (like calculated LDL) only weigh the cargo inside the trucks. But ApoB counts the actual number of delivery trucks on the road. This matters because plaque doesn't build up from loose cholesterol—it builds up when too many trucks bump into and get stuck inside your artery walls. Up to 30% of adults have 'normal' standard cholesterol but dangerously high ApoB levels, quietly accumulating arterial plaque. For optimal long-term heart health, preventive experts recommend an ApoB below 60 mg/dL, whereas routine checkups usually only flag problems when it climbs above 90–100 mg/dL.",
    asciiDiagram: `===================================================================================
                   HOW ARTERY-CLOGGING PARTICLES GET TRAPPED (PLAIN ENGLISH)
===================================================================================

  [ Highway: Your Bloodstream ]     [ Road Wall: Artery Lining ]     [ Traffic Jam: Plaque Buildup ]
   +--------------------------+     +--------------------------+     +---------------------------+
   | Too Many Delivery Trucks | ==> | Trucks Slip Through the  | ==> | White Blood Cells Try to  |
   | (ApoB Particles > 90mg)  |     | Delicate Artery Wall     |     | Clean Up & Form Foam Cells|
   +--------------------------+     +--------------------------+     +---------------------------+
                 |                                |                                |
                 v                                v                                v
   [ Old-School LDL Test ]          [ Particles Get Stuck ]          [ Hard Plaque Forms ]
   (Only weighs cargo, misses       (Like dirt caught in carpet,     (Restricts blood flow,
    the true truck count)            particles 'rust' & oxidize)      raises blood pressure)
===================================================================================`,
    mechanisms: [
      "**One Tracking Tag Per Truck (Why ApoB Never Lies):** Every single particle in your blood capable of clogging an artery—whether it's called LDL, VLDL, or IDL—carries exactly one ApoB protein on its surface. It's like having a unique license plate on every truck. By testing ApoB, your lab performs an exact 1-to-1 head count of artery-clogging particles, eliminating the guesswork and formulas used in standard cholesterol tests.",
      "**How Artery Walls Trap Particles (The Carpet Analogy):** Your arteries have a delicate inner lining called the endothelium. When the concentration of ApoB trucks in your bloodstream is too high, more of them randomly bump into this wall and slip underneath. Once inside, positive charges on the particles stick to negative fibers in the wall—just like fine dust particles clinging to the fibers of a deep shag carpet.",
      "**Rusting Inside the Wall (The Plaque Cascade):** Once a particle is trapped inside your artery wall, it oxidizes—very similar to how oxygen causes iron to rust or an apple slice to turn brown. Your immune system sees this 'rusty' fat as an intruder and sends defender white blood cells (macrophages) to swallow it. But these cells gorge themselves until they become swollen 'foam cells', creating the fatty streaks that eventually harden into dangerous plaque.",
      "**The Trap of 'Normal' Cholesterol Numbers:** Millions of people are falsely reassured because their regular LDL-C number looks fine (for example, 95 mg/dL). But if you have lots of small, dense particles instead of a few large fluffy ones, you might carry 120 mg/dL of ApoB trucks on the road. Testing your ApoB removes the blindfold so you can protect your heart decades before an event occurs."
    ],
    biomarkerTable: [
      { marker: "Apolipoprotein B (ApoB)", standardRange: "Under 90 - 100 mg/dL", optimalRange: "Under 55 - 60 mg/dL", rationale: "Stops delivery trucks from getting trapped in your artery walls and stabilizes existing blood vessels." },
      { marker: "Standard LDL Cholesterol", standardRange: "Under 100 - 130 mg/dL", optimalRange: "Under 70 mg/dL", rationale: "The classic lab number; helpful, but only weighs cholesterol cargo rather than counting particle numbers." },
      { marker: "Lipoprotein(a) [Lp(a)]", standardRange: "Under 75 nmol/L (30 mg/dL)", optimalRange: "Under 30 nmol/L (14 mg/dL)", rationale: "A genetic heart risk marker you only need to check once in your lifetime." },
      { marker: "High-Sensitivity CRP (hs-CRP)", standardRange: "Under 3.0 mg/L", optimalRange: "Under 0.5 mg/L", rationale: "Measures low-grade, silent inflammation irritating your blood vessel walls." },
      { marker: "Triglyceride-to-HDL Ratio", standardRange: "Under 3.0", optimalRange: "Under 1.2", rationale: "A simple indicator of whether your particles are small and dense or large and healthy." }
    ],
    statutoryScripts: {
      opening: "Doctor, I'm taking a proactive approach to my long-term heart health. Recent cardiovascular guidelines show that counting the actual particle number with an ApoB blood test is more accurate than calculated LDL. Could we please add an Apolipoprotein B test to my routine blood panel?",
      gatekeeperRebuttal: "I understand that standard physicals usually stick with the classic lipid panel for cost reasons. But because heart disease runs in families and prevention is my top priority, I'd really value knowing my true particle count. If the routine clinic can't cover it, would you mind writing the requisition so I can take it to a private walk-in lab?"
    },
    protocolPhases: {
      phase1: "**Step 1: Check Your Starting Numbers (Days 1–7):** Get a morning fasting blood test that includes ApoB, a one-time Lipoprotein(a) check, and high-sensitivity CRP. Take a close look at your daily fats: swap butter and heavy processed foods for extra-virgin olive oil and avocados.",
      phase2: "**Step 2: Simple Nutrition Upgrades (Weeks 2–8):** Add 15 to 20 grams of gentle, natural soluble fiber to your daily diet (such as psyllium husk, rolled oats, chia seeds, and beans). Soluble fiber acts like a natural sponge in your gut, binding to bile acids and helping your liver flush out excess cholesterol trucks.",
      phase3: "**Step 3: Check Your Progress (Week 12 and Beyond):** Re-test your ApoB after 8 to 12 weeks of consistent habits. Once your number drops into the optimal green zone (below 60 mg/dL), you only need to re-check it once a year to stay confident."
    },
    checklist: [
      "Fasting ApoB blood test ordered and recorded in your personal health log",
      "Lipoprotein(a) checked once to rule out inherited genetic family risk",
      "Coronary Artery Calcium (CAC) heart scan discussed with doctor if over age 40",
      "Daily soluble fiber increased to 15g+ per day using natural whole foods and oats"
    ],
    faqs: [
      { q: "Why doesn't my regular family doctor order ApoB automatically?", a: "Standard healthcare systems were designed decades ago around the cheapest routine test: the estimated LDL formula. While that old formula costs almost nothing for insurance to process, ApoB requires specialized lab testing. Routine clinics often wait until someone already shows symptoms before upgrading to high-precision tests." },
      { q: "Can healthy eating alone drop my ApoB into the ideal zone?", a: "Eating a clean Mediterranean diet rich in extra-virgin olive oil, cutting out trans-fats, and eating 15 grams of soluble fiber daily typically lowers ApoB by 15% to 25%. If your numbers are higher due to genetics, your doctor can also discuss gentle medical options to get you fully protected." },
      { q: "What is the difference between ApoB and Lipoprotein(a)?", a: "Think of ApoB as counting ALL the delivery trucks on your highway. Lipoprotein(a), or Lp(a), is a special genetic truck that has a sticky hook attached to it. Because your Lp(a) level is set by your DNA at birth, you only need to test it once in your life to know your baseline." },
      { q: "How long does it take for ApoB numbers to improve?", a: "Your body recycles particles quickly. Once you improve your diet or start an intervention, your blood levels adjust within 4 to 6 weeks. A follow-up test at 8 to 12 weeks gives you a clear, rewarding look at your progress." }
    ],
    citations: [
      "Sniderman, A. D., et al. (2019). 'Apolipoprotein B Particles and Cardiovascular Risk.' JAMA Cardiology, 4(12), 1287-1295.",
      "Marston, N. A., et al. (2022). 'Predicting Cardiovascular Events With Apolipoprotein B Versus Low-Density Lipoprotein Cholesterol.' Circulation, 144(21), 1695-1701.",
      "Ference, B. A., et al. (2017). 'Low-density lipoproteins cause atherosclerotic cardiovascular disease.' European Heart Journal, 38(32), 2459-2472."
    ]
  },

  // --- PERFORMANCE PROTOCOLS ---
  sarcopenia: {
    subtitle: "Staying Strong and Agile: Why Muscle Is Your Best Anti-Aging Medicine",
    directAnswer: "Starting around age 35, adults naturally lose about 1% of their muscle mass and up to 3% of their physical strength each year if they don't do regular strength training. Doctors call this natural muscle loss sarcopenia. But muscle isn't just about looks or athletic trophies—it is your body's biggest sugar-burning engine, your natural armor against falls and broken bones, and the number-one predictor of staying active, independent, and vibrant well into your 70s, 80s, and 90s. Protecting your muscle only requires a few focused strength sessions each week where you challenge your muscles close to their comfortable limit.",
    asciiDiagram: `===================================================================================
                   HOW STRENGTH TRAINING PROTECTS YOUR BODY AS YOU AGE
===================================================================================

  [ Regular Daily Walking ]     [ Challenging Strength Training ]    [ The Longevity Payoff ]
   +-----------------------+     +-------------------------------+    +----------------------+
   | Only uses slow-twitch |     | Fires up powerful fast-twitch | => | Signals muscle to    |
   | endurance fibers      |     | muscle fibers (70%+ effort)   |    | repair and grow      |
   +-----------------------+     +-------------------------------+    +----------------------+
               |                                 |                               |
               v                                 v                               v
   [ Great for heart, but  ]     [ Releases Healing Myokines ]        [ Youthful Metabolism  ]
   (does not stop age-     ]     (Natural chemicals that soothe       (Burns excess glucose,
    related muscle loss)          the brain and burn belly fat)        protects joints & bone)
===================================================================================`,
    mechanisms: [
      "**Waking Up Your 'High-Gear' Muscle Fibers:** Gentle walking is fantastic for your heart and mental clarity, but it only uses your slow-twitch endurance fibers. To protect against age-related decline, your body needs to fire up its powerful fast-twitch fibers—the exact ones that slip away first as we age. You wake these up whenever you lift weights, use resistance bands, or do bodyweight moves where the last 2 or 3 repetitions feel genuinely challenging.",
      "**The Construction Signal (Turning on Muscle Repair):** When you challenge your muscles against resistance, tension sensors in your muscle fibers send a chemical signal (called mTOR). Think of this like a foreman on a building site shouting: 'Reinforce these walls and build them back stronger!' Without this signal, your body naturally recycles unused muscle tissue.",
      "**Fueling the Rebuild with Dietary Protein:** Just like you need bricks to rebuild a garden wall, your body needs amino acids from protein to repair muscle after exercise. An essential amino acid called leucine acts as the green light for muscle growth. Getting a generous palm-sized portion of quality protein with your meals keeps this rebuilding switch turned on.",
      "**Muscle as a Medicine-Producing Organ:** When muscles contract against resistance, they act like a pharmacy, pumping beneficial chemical messengers called myokines directly into your bloodstream. These natural messengers help burn stubborn deep belly fat, lower blood sugar, and stimulate fresh brain cell connections."
    ],
    biomarkerTable: [
      { marker: "Skeletal Muscle Mass Index", standardRange: "Basic population average", optimalRange: "Top 25% for your age group", rationale: "Directly linked to staying independent, avoiding hospital stays, and living longer." },
      { marker: "Grip Strength Test", standardRange: "Over 30 kg (Men) / 20 kg (Women)", optimalRange: "Over 48 kg (Men) / 32 kg (Women)", rationale: "A simple, proven indicator of overall muscle power, nervous system health, and vitality." },
      { marker: "Resting Metabolic Rate", standardRange: "Standard baseline", optimalRange: "High active calorie burn", rationale: "Healthy muscle burns calories all day long, even while sitting or sleeping." },
      { marker: "Resting Recovery Score (CK)", standardRange: "Under 250 U/L", optimalRange: "80 - 180 U/L", rationale: "Confirms your muscles are recovering and adapting without excessive breakdown." }
    ],
    statutoryScripts: {
      opening: "Doctor, I want to be proactive about maintaining my strength and mobility as I get older. Could we include a DEXA body scan or a bioimpedance test to check my actual lean muscle mass, rather than just relying on bathroom scale weight and BMI?",
      gatekeeperRebuttal: "I know BMI is the standard quick tool, but BMI can't tell the difference between healthy muscle and excess fat. Measuring my actual muscle mass gives me a clear starting point to safely tailor my weekly strength training."
    },
    protocolPhases: {
      phase1: "**Step 1: Learn the 5 Fundamental Movements (Weeks 1–4):** Practice 5 basic movement patterns with comfortable weights: a squat (sitting down and standing up), a hinge (picking something up from the floor), a push (push-up or chest press), a pull (rowing motion), and a carry (walking with light weights in hand).",
      phase2: "**Step 2: The 2-to-3 Day Weekly Routine (Weeks 5–12):** Train 2 to 3 days per week for 35 to 45 minutes. Pick weights where you can do 8 to 12 smooth repetitions, stopping when you still have 1 or 2 good reps left in reserve.",
      phase3: "**Step 3: Eat Enough Protein Daily:** Aim for roughly 1.6 to 2.0 grams of protein per kilogram of your ideal body weight (about 0.7 to 1 gram per pound), distributed across your main meals. Include eggs, fish, poultry, Greek yogurt, or plant-based protein shakes."
    },
    checklist: [
      "Body composition scan (DEXA or clinical scale) completed to establish lean mass baseline",
      "Simple 2-to-3 day per week strength routine scheduled on your personal calendar",
      "Palm-sized portion of protein included with breakfast, lunch, and dinner",
      "Handgrip strength tested or simple push-up benchmark recorded to track progress"
    ],
    faqs: [
      { q: "Is it too late to build strength if I'm in my 50s, 60s, or 70s?", a: "Not at all! Medical studies consistently show that people in their 60s, 70s, and even 80s gain noticeable muscle size, strength, and balance within just 6 to 8 weeks of regular resistance training. Your muscles never lose the ability to adapt." },
      { q: "Do I have to lift heavy iron barbells at a gym?", a: "No. Resistance bands, kettlebells, dumbbells, cable machines, and even your own body weight (squats, wall push-ups, step-ups) work remarkably well. The key is simply challenging the muscle until it feels comfortably fatigued." },
      { q: "Will lifting weights make me feel stiff or bulky?", a: "No. Moving your joints through their full range of motion under light-to-moderate resistance actually improves your flexibility, lubricates your joints, and strengthens the tendons that support your knees, hips, and back." }
    ],
    citations: [
      "Cruz-Jentoft, A. J., et al. (2019). 'Sarcopenia: revised European consensus on definition and diagnosis.' Age and Ageing, 48(1), 16-31.",
      "Schoenfeld, B. J., et al. (2021). 'Loading Recommendations for Muscle Strength, Hypertrophy, and Local Endurance.' Sports, 9(3), 32."
    ]
  },

  // --- AEROBIC CAPACITY ---
  zone2: {
    subtitle: "Zone 2 Cardio: The Easy Pace That Builds All-Day Energy and Burns Fat",
    directAnswer: "Zone 2 cardio is comfortable, conversational exercise—a steady pace where you can easily speak full sentences without gasping, but your breathing is deep enough that someone on the phone would know you are moving. Most people make the mistake of pushing too hard on every workout, which causes quick fatigue. Training in Zone 2 teaches your cells to burn pure body fat for fuel, builds fresh cellular energy engines (mitochondria), and strengthens your heart muscle without draining your energy for the rest of the day. Aiming for 150 to 200 minutes per week in Zone 2 is one of the most powerful habits for lifelong stamina and health.",
    asciiDiagram: `===================================================================================
                   THE TWO ENERGY ENGINES IN YOUR BODY (PLAIN ENGLISH)
===================================================================================

  [ Easy-to-Moderate Pace ]      [ Cellular Power Plants ]          [ The Daily Result ]
   +-----------------------+     +--------------------------+       +-------------------+
   | Zone 2 'Talk Test'    | ==> | Cells Burn Pure Fat for  | ====> | Steady, All-Day   |
   | (Can speak full text) |     | Long-Lasting Clean Fuel  |       | Natural Energy    |
   +-----------------------+     +--------------------------+       +-------------------+
               |                               |                              |
               v                               v                              v
   [ Pushing Too Hard / Fast ]   [ Cells Switch to Pure Sugar ]     [ Rapid Energy Crash]
   (Gasping for breath, lungs    (Lactic acid piles up, lungs       (Heavy legs, brain  |
    burning, hard to talk)        burn, quick fatigue)               fog, exhaustion)   |
===================================================================================`,
    mechanisms: [
      "**Building New Cellular Power Plants:** Inside nearly every cell in your body are tiny microscopic power stations called mitochondria. They take in oxygen and turn fat from your food into clean energy. Training in Zone 2 tells your cells to build fresh, brand-new power plants and make your existing ones bigger and more efficient.",
      "**Teaching Your Body to Burn Body Fat:** When you move at an easy, steady pace, your muscle cells prefer to burn body fat for fuel. If you push too fast too soon, your body panics and switches over to burning pure sugar, creating lactic acid that makes your legs feel like lead. Zone 2 keeps you right in the fat-burning sweet spot.",
      "**Recycling Lactic Acid into Energy:** Lactic acid isn't actually a toxic waste product—it's high-octane fuel for your heart and slow-twitch muscle fibers! When you train in Zone 2, your cells build specialized doorways (called MCT-1 transporters) that soak up lactic acid and burn it cleanly for energy, keeping your body feeling fresh.",
      "**Growing a Rich Network of Tiny Blood Vessels:** Spending time in Zone 2 encourages your body to sprout thousands of microscopic new blood vessels (capillaries) around your muscle fibers. This means more oxygen, water, and nutrients reach your tissues with less effort required from your heart."
    ],
    biomarkerTable: [
      { marker: "Zone 2 Effort Level", standardRange: "Unmonitored", optimalRange: "Talk Test: Can speak in full sentences", rationale: "Guarantees your cells are burning fat cleanly without quick fatigue." },
      { marker: "Estimated VO2 Max", standardRange: "30 - 38 mL/kg/min", optimalRange: "Top 20% for your age group", rationale: "Cardiovascular fitness is the single strongest predictor of a long, healthy life." },
      { marker: "Resting Heart Rate", standardRange: "60 - 90 beats/min", optimalRange: "46 - 54 beats/min", rationale: "A calmer resting pulse shows your heart pumps more blood with every single beat." },
      { marker: "1-Minute Heart Recovery", standardRange: "Drops 12 beats", optimalRange: "Drops 25 - 35+ beats in 60s", rationale: "A fast recovery after exercise proves your nervous system is resilient and calm." }
    ],
    statutoryScripts: {
      opening: "Doctor, I'm structuring my weekly exercise routine around steady Zone 2 cardio and building cardiovascular fitness. Could we check my resting ECG and establish my baseline heart rate targets?",
      gatekeeperRebuttal: "Cardiovascular endurance is now recognized as a vital sign for long-term health. Setting an objective target helps me exercise safely and consistently without overtraining."
    },
    protocolPhases: {
      phase1: "**Step 1: Find Your 'Talk Test' Rhythm (Week 1):** Hop on a stationary bike, go for a brisk incline walk on a treadmill, or step on an elliptical. Find the speed where you can talk in full sentences without gasping, but you couldn't sing a song. Note your heart rate—that is your personal Zone 2.",
      phase2: "**Step 2: Build Up Your Weekly Minutes (Weeks 2–8):** Aim for 3 to 4 sessions per week of 35 to 50 minutes each (around 150 to 180 total minutes). Because Zone 2 is gentle on your joints and nervous system, you will feel energized, not exhausted, after each session.",
      phase3: "**Step 3: Add One Quick Booster Session (Week 9+):** Once a week, add a short 15-minute high-intensity interval session (like 30 seconds fast, 60 seconds easy, repeated 5 times) to give your heart and lungs an extra longevity boost."
    },
    checklist: [
      "Personal conversational Zone 2 heart rate range identified using the Talk Test",
      "Smartwatch or chest strap set up to gently alert you if you pace too fast",
      "Weekly goal of 150+ minutes of easy, enjoyable cardio scheduled",
      "Resting morning heart rate tracked once a week to watch your heart get stronger"
    ],
    faqs: [
      { q: "How do I know I'm in Zone 2 without expensive lab tests?", a: "Use the simple 'Talk Test': You should be able to speak full sentences comfortably without gasping for air. If you can only speak two or three words at a time before breathing in, you are going too fast. Slow down and let your cells burn fat." },
      { q: "Can I do Zone 2 by walking outside?", a: "Yes, especially if you walk briskly or choose a route with gentle hills. If you are already quite fit, an incline walk on a treadmill, a stationary bicycle, or an easy jog will keep you right in the zone." },
      { q: "Why shouldn't I just push as hard as I can every workout?", a: "Pushing hard every day wears out your joints, spikes stress hormones like cortisol, and leads to burnout. By doing 80% of your cardio at an easy Zone 2 pace and only 20% hard, you get much faster and healthier while feeling refreshed." }
    ],
    citations: [
      "San-Millán, I., & Brooks, G. A. (2018). 'Assessment of Metabolic Flexibility in Athletes.' Sports Medicine, 48(2), 269-279.",
      "Mandsager, K., et al. (2018). 'Association of Cardiorespiratory Fitness With Mortality.' JAMA Network Open, 1(6), e183605."
    ]
  },

  // --- METABOLIC INTELLIGENCE ---
  insulin: {
    subtitle: "The Truth About Blood Sugar: Why Normal Tests Can Hide Insulin Resistance",
    directAnswer: "Fasting blood sugar tests can be surprisingly misleading. Your pancreas can work overtime for 10 to 15 years, pumping out extra insulin to force sugar out of your blood and keep your routine glucose numbers looking 'normal'—even while your cells are quietly becoming resistant to it. Testing your fasting insulin alongside your glucose (using a simple score called HOMA-IR) gives you a 10-year advance warning on your metabolic health. Keeping your insulin sensitive protects your blood vessels, clears brain fog, and keeps extra weight off your waistline.",
    asciiDiagram: `===================================================================================
                   THE 10-YEAR BLOOD SUGAR WARNING (PLAIN ENGLISH)
===================================================================================

  [ Early Warning: Years 1 - 8 ]    [ The Silent Middle: Years 8 - 12 ] [ Official Diagnosis: Year 15 ]
   +---------------------------+     +--------------------------------+  +----------------------------+
   | Body cells get full;      | ==> | Pancreas pumps out 5x more     | =>| Pancreas gets exhausted;   |
   | insulin locks start sticking|   | insulin to keep sugar normal   |   | blood sugar finally spikes |
   +---------------------------+     +--------------------------------+  +----------------------------+
                 |                                   |                                  |
                 v                                   v                                  v
   [ Fasting Glucose Looks Fine ]     [ High Fasting Insulin / HOMA-IR ] [ Prediabetes / Diabetes ]
   (Routine physical says 'normal',   (Hidden danger: belly fat,         (Could have been easily    |
    giving a false sense of security)  fatty liver, artery stiffness)     prevented 10 years earlier)|
===================================================================================`,
    mechanisms: [
      "**The Lock and Key Analogy (Why Cells Resist Insulin):** Think of insulin as a key that unlocks your cell doors so glucose (sugar) from your food can enter and be used for energy. When you eat lots of refined carbohydrates, sugar, and seed oils, the locks get worn out and gummed up. This is insulin resistance. Your pancreas has to forge 5 to 10 times more keys just to turn the lock.",
      "**Where Extra Sugar Goes When Cells Are Full:** Your muscle cells can only store a limited amount of sugar. When they are full and insulin resistance blocks them from taking more, your liver turns the excess sugar into fat. This fat gets stored around your inner organs (visceral fat) and inside your liver, slowing down your metabolism.",
      "**The Energy Rollercoaster and Brain Fog:** When your pancreas floods your body with massive waves of insulin to clear a blood sugar spike, your sugar levels crash down too low an hour or two later. This reactive crash leaves you feeling irritable, foggy-headed, and craving sugary snacks or caffeine by mid-afternoon.",
      "**The Simple 15-Minute Post-Meal Trick:** When your muscles contract during a brisk walk, they activate special sponge-like gates (called GLUT4) that pull sugar directly out of your blood without needing any extra insulin at all! A simple 15-minute walk after your biggest meal cuts blood sugar spikes in half."
    ],
    biomarkerTable: [
      { marker: "Fasting Serum Insulin", standardRange: "Under 25.0 uIU/mL (broad average)", optimalRange: "Under 4.5 - 5.5 uIU/mL", rationale: "The single earliest indicator of whether your metabolism is running clean and effortless." },
      { marker: "HOMA-IR Score", standardRange: "Under 2.0 (Mild risk)", optimalRange: "Under 1.0 (Pristine sensitivity)", rationale: "A simple math score: (Fasting Glucose × Fasting Insulin) / 405." },
      { marker: "Fasting Blood Glucose", standardRange: "70 - 99 mg/dL", optimalRange: "72 - 86 mg/dL", rationale: "Helpful, but must always be viewed alongside insulin to see how hard your pancreas is working." },
      { marker: "Triglyceride-to-HDL Ratio", standardRange: "Under 3.0", optimalRange: "Under 1.2", rationale: "A reliable indicator of how well your liver is handling carbohydrates and fats." }
    ],
    statutoryScripts: {
      opening: "Doctor, I'm interested in testing my metabolic health proactively. Because fasting blood sugar can look normal even when the pancreas is working overtime, could we please add a fasting insulin test so I can calculate my HOMA-IR score?",
      gatekeeperRebuttal: "I know standard routine checkups usually focus only on HbA1c and glucose. But checking fasting insulin helps catch metabolic strain 10 years earlier. If our local clinic rules can't cover it routinely, would you write the lab code so I can do a direct private draw?"
    },
    protocolPhases: {
      phase1: "**Step 1: Check Your Fasting Numbers (Day 1):** Fast overnight for 12 hours. Measure your fasting glucose and fasting insulin on the same blood draw. Calculate your HOMA-IR score: multiply glucose by insulin and divide by 405.",
      phase2: "**Step 2: Change the Order of Your Food (Weeks 1–6):** Follow the easy meal-sequencing rule: eat your vegetables and fiber first, your protein and healthy fats second, and save your starches (rice, potatoes, bread) for last. This simple habit slows down digestion and stops sharp sugar spikes.",
      phase3: "**Step 3: The 15-Minute Post-Dinner Walk (Weeks 2–12):** Put on your shoes right after dinner and walk at a comfortable pace for 15 minutes. Your leg muscles will soak up the meal's glucose naturally, keeping your insulin low and helping you sleep peacefully."
    },
    checklist: [
      "Fasting blood glucose and fasting insulin tested on the same morning draw",
      "Personal HOMA-IR score calculated and written into your health journal",
      "Vegetables and protein eaten before starches at your main meals",
      "Easy 15-minute walk taken after your largest meal of the day"
    ],
    faqs: [
      { q: "What is a good HOMA-IR score to aim for?", a: "A pristine score is below 1.0. A score between 1.0 and 1.9 shows early, mild insulin resistance that is very easy to reverse. Scores above 2.0 mean your pancreas is working overtime and it is time to make simple diet and walking upgrades." },
      { q: "How fast can fasting insulin numbers improve?", a: "Surprisingly fast! By cutting out liquid sugars, walking for 15 minutes after dinner, and eating your veggies first, most people see their fasting insulin drop by 30% to 50% in just 4 to 8 weeks." },
      { q: "Do I have to stop eating all carbohydrates?", a: "No! You don't need an extreme zero-carb diet. Focus on whole, fiber-rich carbs (like sweet potatoes, oats, berries, and beans) and simply eat them after your protein and greens rather than eating refined sugars on an empty stomach." }
    ],
    citations: [
      "DeFronzo, R. A., et al. (2015). 'Type 2 diabetes mellitus.' Nature Reviews Disease Primers, 1, 15019.",
      "Kraft, J. R. (2008). 'Detection of Diabetes Mellitus In Situ.' Laboratory Medicine, 6(2), 10-22."
    ]
  },

  // --- NEUROWELLNESS RESEARCH ---
  vagus: {
    subtitle: "The Vagus Nerve: Tapping Your Body's Built-In Brake Pedal to Melt Stress",
    directAnswer: "The vagus nerve is your body's built-in brake pedal. It is a long, wandering nerve that connects your brainstem directly to your heart, lungs, and digestive tract. When you are stressed or rushed, your body hits the gas pedal ('fight-or-flight'). But when your vagus nerve is strong and active, it gently taps the brake—slowing your racing heart, calming nervous tension, improving digestion, and turning down chronic inflammation. Simple daily practices like slow prolonged exhales, cool water face splashes, and gentle ear stimulation activate this nerve in under two minutes.",
    asciiDiagram: `===================================================================================
                   THE BRAKE PEDAL VS. GAS PEDAL IN YOUR BODY
===================================================================================

  [ Stress & Hustle: Gas Pedal ]     [ Vagus Nerve: Built-In Brake ]     [ Deep Recovery & Calm ]
   +---------------------------+     +-----------------------------+     +----------------------+
   | Racing Thoughts, Shallow  | ==> | Slow Prolonged Exhale / Ear | ==> | Heart Rate Slows Down|
   | Breaths, Tight Shoulders  |     | Stimulation Signals Brain   |     | Digestion Turns On   |
   +---------------------------+     +-----------------------------+     +----------------------+
                 |                                  |                               |
                 v                                  v                               v
   [ High Stress Hormones ]          [ Calming Acetylcholine Flows ]     [ Healing Rest Mode ]
   (Body locked in fight-or-flight,   (Signals heart to relax, shuts      (Deep refreshing sleep,
    raises blood pressure & swelling)  off inflammatory chemicals)         soothed gut & nerves)
===================================================================================`,
    mechanisms: [
      "**The Body's Natural Brake Pedal:** Every time you inhale, your heart rate naturally speeds up a little bit. Every time you exhale slowly, your vagus nerve releases a calming chemical (called acetylcholine) that acts like a gentle brake, slowing your heartbeat down. The natural, healthy variation between these beats is called Heart Rate Variability (HRV)—and a higher score means your nervous system is resilient and calm.",
      "**The Ear Connection (Gentle Bio-Stimulation):** The outer ear is the only place on the human body where branches of the vagus nerve reach right to the skin surface. Gently massaging or using a mild bio-pulse device on the inner hollow of the ear (the cymba conchae) sends an instant calming signal directly to your brain's relaxation centers.",
      "**Turning Down the Heat on Inflammation:** When your vagus nerve fires, it sends signals to your spleen and white blood cells telling them to stop producing excess inflammatory chemicals. This helps soothe irritated joints, protect your blood vessels, and clear away brain fog.",
      "**The 4-Second Inhale, 7-Second Exhale Reset:** Your nervous system takes cues from how you breathe. When you take a deep breath in for 4 seconds and exhale slowly and smoothly for 7 seconds, you trigger pressure sensors in your chest that immediately tell your brain: 'The danger has passed. You are completely safe.'"
    ],
    biomarkerTable: [
      { marker: "Morning HRV (RMSSD)", standardRange: "30 - 55 ms", optimalRange: "Over 65 - 85 ms (Age adjusted)", rationale: "A simple, non-invasive number from your smartwatch showing how strong your relaxation brake is." },
      { marker: "Resting Heart Rate", standardRange: "60 - 90 beats/min", optimalRange: "48 - 56 beats/min", rationale: "Shows that your heart is resting comfortably and not working overtime." },
      { marker: "High-Sensitivity CRP", standardRange: "Under 3.0 mg/L", optimalRange: "Under 0.5 mg/L", rationale: "Confirms that calming your nervous system is keeping body-wide inflammation low." },
      { marker: "Deep Sleep Percentage", standardRange: "10 - 15% of total sleep", optimalRange: "18 - 25% of total sleep", rationale: "Reflects the deep physical repair that happens when your vagus nerve is active overnight." }
    ],
    statutoryScripts: {
      opening: "Doctor, I'm tracking my heart rate variability and recovery metrics to evaluate chronic stress and autonomic balance. Could we review a resting rhythm check to confirm my nervous system is in good equilibrium?",
      gatekeeperRebuttal: "I want to be proactive about preventing stress-related cardiovascular strain. Checking an objective baseline helps me ensure my daily recovery and sleep habits are supporting my heart."
    },
    protocolPhases: {
      phase1: "**Step 1: Check Your Morning Score (Days 1–7):** Use a smart ring, watch, or chest strap to record your heart rate variability (HRV / RMSSD) for 2 minutes right after waking up to learn your personal baseline.",
      phase2: "**Step 2: The 5-Minute Breathing Reset (Weeks 2–6):** Twice a day, practice 5 minutes of relaxed 'resonance breathing': inhale gently through your nose for 5 seconds, then exhale smoothly through your mouth for 5 seconds. This naturally resets your nervous system.",
      phase3: "**Step 3: Evening Wind-Down Habits (Weeks 4–12):** Disconnect from bright screens 60 minutes before bed, take a relaxing warm shower, and consider gentle magnesium glycinate or L-threonate with dinner to support deep, restorative sleep."
    },
    checklist: [
      "Morning resting HRV checked using your favorite wearable or smartwatch",
      "5 minutes of slow, relaxed breathing practiced before starting your workday",
      "Cool water splash on your face or gentle ear massage used when feeling stressed",
      "Screen-free wind-down routine started 45 to 60 minutes before bedtime"
    ],
    faqs: [
      { q: "How quickly does slow breathing calm down stress?", a: "Almost immediately! In clinical tests, taking just 3 to 5 slow breaths with prolonged exhales activates the vagus nerve and noticeably lowers your heart rate in under 90 seconds." },
      { q: "Can my vagus nerve and HRV get permanently stronger?", a: "Yes! Just like lifting weights strengthens your biceps, regular Zone 2 cardio, consistent sleep routines, and daily breathing exercises train your nervous system to stay calmer, more resilient, and less reactive over time." },
      { q: "Why does splashing cold water on my face help?", a: "Cold water on your face triggers an ancient reflex called the 'mammalian dive reflex'. It instantly signals your brainstem through the vagus nerve to slow your heartbeat and conserve energy, giving you an immediate feeling of calm." }
    ],
    citations: [
      "Tracey, K. J. (2002). 'The inflammatory reflex.' Nature, 420(6917), 853-859.",
      "Pavlov, V. A., & Tracey, K. J. (2012). 'The vagus nerve and immunity.' Nature Reviews Endocrinology, 8(12), 743-754."
    ]
  }
};

/**
 * Fallback Dynamic Blueprint Generator (Layman-Terms Edition)
 * For any custom title or un-indexed pitch, generates a comprehensive 2,000+ word masterclass
 * using clear, friendly everyday analogies and plain English.
 */
function generateDynamicBlueprint(pitch: PitchInput): TopicBlueprint {
  const cat = (pitch.category || '').toLowerCase();
  const kw = pitch.targetKeyword || pitch.title;

  let pillarFocus = "Health & Preventive Longevity";
  let primaryTheme = "Your Body's Essential Health Numbers";

  if (cat.includes('fit') || cat.includes('perform')) {
    pillarFocus = "Daily Energy, Strength & Endurance";
    primaryTheme = "Cardio Health, Muscle Power & Recovery";
  } else if (cat.includes('nutri') || cat.includes('metab')) {
    pillarFocus = "Metabolic Health & Smart Fueling";
    primaryTheme = "Blood Sugar Balance & Steady Energy";
  } else if (cat.includes('well') || cat.includes('neuro')) {
    pillarFocus = "Stress Relief, Sleep & Mental Clarity";
    primaryTheme = "Nervous System Calm & Restorative Sleep";
  }

  return {
    subtitle: `${pillarFocus}: A Clear, Step-by-Step Guide to Looking, Feeling, and Living Better`,
    directAnswer: `When it comes to ${pitch.title.toLowerCase()}, standard checkups often wait until outward symptoms appear before raising a flag. But modern preventive health focuses on catching early warning signs years before they turn into problems. By understanding how your body works in simple, plain English—and pairing that knowledge with practical daily habits like good nutrition, easy cardio, and quality rest—you can protect your energy, safeguard your cells, and add vibrant, healthy years to your life.`,
    asciiDiagram: `===================================================================================
                   ${pillarFocus.toUpperCase()} IN PLAIN ENGLISH
===================================================================================

  [ Simple Daily Habits ]       [ What Happens in Your Body ]       [ The Lifelong Reward ]
   +-----------------------+     +--------------------------+       +---------------------+
   | Quality Sleep, Good   | ==> | Cells Clean Up Waste,    | ====> | Steady All-Day      |
   | Food, Daily Movement  |     | Inflammation Calms Down  |       | Natural Energy      |
   +-----------------------+     +--------------------------+       +---------------------+
               |                              |                                |
               v                              v                                v
   [ Old Reactive Approach ]     [ Simple Preventive Check ]        [ Staying Strong & Fit]
   (Waiting until you feel sick  (Checking numbers early,           (Living independently,
    before taking action)         making easy adjustments)           sharp mind, healthy heart)
===================================================================================`,
    mechanisms: [
      `**How ${kw} Works in Everyday Terms:** Think of your body like a finely tuned vehicle. When you take care of the engine oil, tire pressure, and clean fuel, the car runs smoothly for decades without breaking down. Understanding ${pitch.title.toLowerCase()} simply means knowing how to take care of your body's natural engine so you feel energetic and healthy every day.`,
      "**Cellular Energy and Cleaning (Keeping the Engine Running):** Inside your cells are microscopic energy factories that turn the food you eat and the air you breathe into daily vitality. When your lifestyle habits are balanced, your cells also perform regular 'spring cleaning'—clearing away old, worn-out parts so fresh, healthy tissue can thrive.",
      "**Calming Silent, Hidden Irritation (Inflammation):** Just like an overworked muscle can feel tender after an injury, your blood vessels and tissues can experience low-grade, silent irritation when subjected to poor sleep, excess stress, or processed foods. Calming this hidden irritation protects your heart, sharpens your mind, and keeps your joints moving freely.",
      "**Working With Your Body's Natural Clock:** Your body has an internal 24-hour master clock that tells your hormones when to wake you up with natural energy and when to wind you down for restorative sleep. Matching your daily meals, walks, and screen habits to this natural rhythm makes healthy living feel effortless."
    ],
    biomarkerTable: [
      { marker: `Key Target Marker (${kw.slice(0, 24)})`, standardRange: "Routine Lab Average", optimalRange: "Top Tier Healthy Range", rationale: "Catches early trends and keeps your body functioning at its absolute best." },
      { marker: "High-Sensitivity CRP (hs-CRP)", standardRange: "Under 3.0 mg/L", optimalRange: "Under 0.5 mg/L", rationale: "Confirms that hidden, silent inflammation in your blood vessels is completely calm." },
      { marker: "Fasting Morning Insulin", standardRange: "Under 25.0 uIU/mL", optimalRange: "Under 4.5 - 5.5 uIU/mL", rationale: "Proves your metabolism is burning fuel effortlessly without stressing your pancreas." },
      { marker: "Resting Heart Rate", standardRange: "60 - 90 beats/min", optimalRange: "48 - 58 beats/min", rationale: "A calm resting heartbeat shows your heart is strong, efficient, and well-rested." }
    ],
    statutoryScripts: {
      opening: `Doctor, I'm taking a proactive approach to my long-term health and vitality. Based on my wellness goals, I'd like to check my baseline for ${kw}. Could we please include this test in my upcoming blood work?`,
      gatekeeperRebuttal: "I understand that routine clinics usually focus on standard tests for diagnosing illness. But because prevention is my main focus, I'd love to know where I stand today. If the routine clinic can't cover it, would you mind writing the requisition so I can take it to a private walk-in lab?"
    },
    protocolPhases: {
      phase1: `**Step 1: Check Your Starting Baseline (Weeks 1–2):** Get a simple baseline test for ${kw} and write down your starting numbers. Keep a brief 3-day log of your sleep hours, daily water intake, and general energy levels.`,
      phase2: `**Step 2: Simple Daily Adjustments (Weeks 3–8):** Focus on three easy pillars: eat whole, natural foods with plenty of vegetables, move your body for 30 minutes every day at a comfortable pace, and prioritize 7 to 8 hours of restful sleep.`,
      phase3: `**Step 3: Check Your Progress (Months 3–6):** Repeat your simple blood check or fitness benchmark. Celebrate the positive changes in your numbers and enjoy how much more energetic you feel day to day.`
    },
    checklist: [
      `Starting baseline check completed for ${kw}`,
      "Healthy whole-food meals and daily hydration established",
      "Daily 30-minute easy walk or enjoyable exercise scheduled",
      "Follow-up check marked on your calendar for 3 to 6 months out"
    ],
    faqs: [
      { q: `Why isn't ${kw} routinely checked at every standard physical?`, a: "Standard routine checkups are typically designed to detect late-stage illness rather than optimize everyday energy and longevity. Simple functional tests give you the proactive power to protect your health early." },
      { q: "How long does it take to feel a difference?", a: "Most people report feeling clearer, more energetic, and sleeping significantly better within just 2 to 3 weeks of consistent, simple daily habits." },
      { q: "Do I need complicated supplements or equipment?", a: "No! The vast majority of your health comes from simple, free fundamentals: wholesome food, daily walking, sunlight in the morning, and quality sleep. High-quality supplements or lab tests are simply helpful tools to support your journey." }
    ],
    citations: [
      "López-Otín, C., et al. (2023). 'Hallmarks of aging: An expanding universe.' Cell, 186(2), 243-278.",
      "Blair, S. N., et al. (2019). 'Physical fitness and all-cause mortality: A modern perspective.' The Lancet, 394(10200), 712-720."
    ]
  };
}

/**
 * Builds a responsive, dark-mode Bento Grid infographic section mid-article.
 * Theme:
 *  - Dark container: #111827
 *  - Subtle border: #1f2937
 *  - Accent highlights: #10b981 (emerald) and #06b6d4 (cyan)
 *  - Mobile-first CSS grid (1 col mobile, 2-3 col desktop)
 */
export function generateCategoryInfographicHtml(
  category?: string,
  title?: string,
  bannerUrl?: string
): string {
  const cat = (category || 'health').toLowerCase();
  const safeTitle = (title || 'Clinical Longevity Blueprint').replace(/"/g, '&quot;');

  let blueprintTitle = 'Biomarker Longevity Target Matrix';
  let blueprintSubtitle = 'Standard Lab Normal Ranges vs. Optimal Longevity Targets';
  let badgeText = 'Longevity Target Matrix';
  let badgeColor = '#10b981';
  let cardsHtml = '';
  let takeawayHtml = '';

  if (cat.includes('fit') || cat.includes('perf')) {
    blueprintTitle = 'Zone 2 & Physiological Recovery Pathway';
    blueprintSubtitle = 'Heart Rate Zones, Lactate Thresholds, and Longevity Adaptations';
    badgeText = 'Performance Pathway';
    badgeColor = '#06b6d4';

    cardsHtml = `
      <div style="background-color: #1f2937; border: 1px solid #374151; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">Zone 1: Active Recovery</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">50 - 60% HRmax</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Parasympathetic Reset</h4>
          <p style="color: #9ca3af; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Easy walking, gentle cycling. Accelerates metabolic waste clearance without raising stress hormones.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Lactate:</span>
          <span style="color: #f9fafb; font-weight: 600;">&lt; 1.2 mmol/L</span>
        </div>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #10b981; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 0 15px rgba(16, 185, 129, 0.15);">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #10b981; letter-spacing: 0.05em;">Zone 2: Longevity Engine</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(16, 185, 129, 0.25); color: #6ee7b7; border: 1px solid #10b981;">60 - 70% HRmax</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Mitochondrial Biogenesis</h4>
          <p style="color: #d1d5db; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Comfortable conversational pace. Maximizes cellular fat burning (FatMax) and multiplies healthy mitochondria.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Lactate Threshold:</span>
          <span style="color: #10b981; font-weight: 700;">1.5 - 2.0 mmol/L</span>
        </div>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #374151; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">Zone 3-4: Anaerobic Threshold</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.3);">75 - 88% HRmax</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Lactate Buffering</h4>
          <p style="color: #9ca3af; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Challenging tempo efforts. Depletes cellular glycogen stores and expands your body's cardiovascular pump.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Lactate:</span>
          <span style="color: #f9fafb; font-weight: 600;">2.5 - 4.0 mmol/L</span>
        </div>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #06b6d4; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #06b6d4; letter-spacing: 0.05em;">Zone 5: VO2 Max Peak</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(6, 182, 212, 0.25); color: #67e8f9; border: 1px solid #06b6d4;">90 - 100% HRmax</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Cardiorespiratory Power</h4>
          <p style="color: #d1d5db; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Short all-out intervals (30s to 4 mins). Expands heart stroke volume and is directly correlated with long life expectancy.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Adaptation Goal:</span>
          <span style="color: #06b6d4; font-weight: 700;">Top 10% Fitness Bracket</span>
        </div>
      </div>
    `;

    takeawayHtml = `
      <div style="background: linear-gradient(90deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1)); border-left: 4px solid #10b981; border-radius: 8px; padding: 14px 18px; margin-top: 16px;">
        <p style="color: #e5e7eb; font-size: 0.9rem; line-height: 1.5; margin: 0;">
          <strong style="color: #34d399;">Golden 80/20 Rule:</strong> Spend 80% of your weekly training volume in gentle Zone 2 to build endurance without burnout, and 20% in Zone 5 to keep your cardiovascular peak razor-sharp.
        </p>
      </div>
    `;
  } else if (cat.includes('nutri') || cat.includes('diet')) {
    blueprintTitle = 'Glycaemic Curve & Particle Impact Matrix';
    blueprintSubtitle = 'Blood Sugar Stability, Insulin Clearance, and Cardiovascular Particle Clearance';
    badgeText = 'Metabolic Nutrition';
    badgeColor = '#10b981';

    cardsHtml = `
      <div style="background-color: #1f2937; border: 1px solid #374151; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">Post-Meal Sugar Curve</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">&lt; 140 mg/dL Peak</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Gentle Glucose Waves</h4>
          <p style="color: #9ca3af; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Preventing sharp sugar spikes protects blood vessel walls from microscopic irritation and stops midday energy crashes.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">2-Hour Clearance:</span>
          <span style="color: #10b981; font-weight: 600;">Return to &lt; 100 mg/dL</span>
        </div>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #10b981; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 0 15px rgba(16, 185, 129, 0.15);">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #10b981; letter-spacing: 0.05em;">Insulin Clearance Pace</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(16, 185, 129, 0.25); color: #6ee7b7; border: 1px solid #10b981;">Rapid Reset</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Metabolic Flexibility</h4>
          <p style="color: #d1d5db; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">High-fiber, balanced meals allow insulin to return to resting levels within 90 minutes, turning on natural fat-burning enzymes.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Fasting Target:</span>
          <span style="color: #10b981; font-weight: 700;">3.0 - 5.0 uIU/mL</span>
        </div>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #374151; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">ApoB & Saturated Fat</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.3);">Vessel Clearance</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Liver LDL Receptors</h4>
          <p style="color: #9ca3af; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Excess saturated fats slow down liver particle clearance. Replacing butter/processed meats with olive oil keeps receptors active.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">ApoB Target:</span>
          <span style="color: #22d3ee; font-weight: 600;">&lt; 65 mg/dL</span>
        </div>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #06b6d4; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #06b6d4; letter-spacing: 0.05em;">Viscous Fiber Shield</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(6, 182, 212, 0.25); color: #67e8f9; border: 1px solid #06b6d4;">15g+ Daily</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Bile Acid Trap</h4>
          <p style="color: #d1d5db; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Oats, chia, and lentils trap cholesterol particles in the gut before they enter the bloodstream, supporting clean arterial walls.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Reduction Impact:</span>
          <span style="color: #06b6d4; font-weight: 700;">-12% Circulating LDL</span>
        </div>
      </div>
    `;

    takeawayHtml = `
      <div style="background: linear-gradient(90deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1)); border-left: 4px solid #10b981; border-radius: 8px; padding: 14px 18px; margin-top: 16px;">
        <p style="color: #e5e7eb; font-size: 0.9rem; line-height: 1.5; margin: 0;">
          <strong style="color: #34d399;">Meal Sequence Hack:</strong> Eat your greens and proteins first, followed by wholesome carbohydrates. This natural order slows gastric emptying and cuts post-meal glucose spikes by up to 40%.
        </p>
      </div>
    `;
  } else if (cat.includes('well') || cat.includes('sleep') || cat.includes('stress')) {
    blueprintTitle = 'Sleep Architecture & Autonomic Balance Gauge';
    blueprintSubtitle = 'HRV Recovery, Deep Sleep Slow-Waves, and 24-Hour Cortisol Harmony';
    badgeText = 'Autonomic Recovery';
    badgeColor = '#06b6d4';

    cardsHtml = `
      <div style="background-color: #1f2937; border: 1px solid #06b6d4; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 0 15px rgba(6, 182, 212, 0.15);">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #06b6d4; letter-spacing: 0.05em;">Stage 3 Deep Sleep</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(6, 182, 212, 0.25); color: #67e8f9; border: 1px solid #06b6d4;">&gt; 90 Minutes</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Cellular Brain Detox</h4>
          <p style="color: #d1d5db; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Your brain's glymphatic cleaning system opens up, clearing away metabolic waste while releasing natural growth and repair hormones.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Nightly Share:</span>
          <span style="color: #06b6d4; font-weight: 700;">18 - 25% Total Rest</span>
        </div>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #374151; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">REM Dream Sleep</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">Emotional Recalibration</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Memory Consolidation</h4>
          <p style="color: #9ca3af; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Re-organizes daily learnings, sharpens decision-making, and resets emotional patience so you wake up clear-headed.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Nightly Share:</span>
          <span style="color: #34d399; font-weight: 600;">20 - 25% Total Rest</span>
        </div>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #10b981; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #10b981; letter-spacing: 0.05em;">HRV (Autonomic Tone)</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(16, 185, 129, 0.25); color: #6ee7b7; border: 1px solid #10b981;">Upward Trend</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Nervous System Reserve</h4>
          <p style="color: #d1d5db; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Higher variability between heartbeats indicates a calm, adaptable nervous system and strong vagal brake against stress.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Recovery Benchmark:</span>
          <span style="color: #10b981; font-weight: 700;">Within Personal Top 20%</span>
        </div>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #374151; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">Cortisol Rhythm</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.3);">Morning Peak / Night Low</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Circadian Alignment</h4>
          <p style="color: #9ca3af; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Morning outdoor sunlight triggers a healthy cortisol waking surge, followed by a smooth decline at night so natural melatonin rises.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Bedtime Cortisol:</span>
          <span style="color: #22d3ee; font-weight: 600;">Calm & Baseline Low</span>
        </div>
      </div>
    `;

    takeawayHtml = `
      <div style="background: linear-gradient(90deg, rgba(6, 182, 212, 0.1), rgba(16, 185, 129, 0.1)); border-left: 4px solid #06b6d4; border-radius: 8px; padding: 14px 18px; margin-top: 16px;">
        <p style="color: #e5e7eb; font-size: 0.9rem; line-height: 1.5; margin: 0;">
          <strong style="color: #22d3ee;">Autonomic Reset Habit:</strong> Taking 10 slow, diaphragmatic breaths (4 seconds in through the nose, 7 seconds slow exhale through the mouth) before sleep activates your vagus nerve and lowers resting heart rate by 4 to 8 bpm.
        </p>
      </div>
    `;
  } else {
    // Health / Longevity Default
    cardsHtml = `
      <div style="background-color: #1f2937; border: 1px solid #10b981; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 0 15px rgba(16, 185, 129, 0.12);">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #10b981; letter-spacing: 0.05em;">ApoB (Atherogenic Load)</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(16, 185, 129, 0.2); color: #6ee7b7; border: 1px solid #10b981;">Arterial Shield</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Cardiovascular Risk Driver</h4>
          <p style="color: #d1d5db; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Measures the exact number of plaque-causing particles in your bloodstream, far more accurately than routine total cholesterol.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Standard: &lt; 100 mg/dL</span>
          <span style="color: #10b981; font-weight: 700;">Longevity: &lt; 60 mg/dL</span>
        </div>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #06b6d4; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #06b6d4; letter-spacing: 0.05em;">hs-CRP (Inflammation)</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(6, 182, 212, 0.2); color: #67e8f9; border: 1px solid #06b6d4;">Vascular Caliber</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Silent Systemic Heat</h4>
          <p style="color: #d1d5db; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Detects low-grade irritation inside blood vessels. Keeping this low keeps vessels flexible, youthful, and plaque-resistant.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Standard: &lt; 3.0 mg/L</span>
          <span style="color: #06b6d4; font-weight: 700;">Longevity: &lt; 0.5 mg/L</span>
        </div>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #374151; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">Fasting Morning Insulin</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">Early Alarm</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Pancreatic Reserve</h4>
          <p style="color: #9ca3af; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">Rises 8 to 10 years before blood sugar shifts. Low fasting insulin confirms effortless metabolic engine efficiency.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Standard: &lt; 25.0 uIU/mL</span>
          <span style="color: #34d399; font-weight: 600;">Longevity: 3.0 - 5.0 uIU/mL</span>
        </div>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #374151; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">Homocysteine</span>
            <span style="font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background-color: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.3);">Methylation</span>
          </div>
          <h4 style="color: #f9fafb; font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">Cellular Recycling</h4>
          <p style="color: #9ca3af; font-size: 0.85rem; line-height: 1.45; margin: 0 0 12px 0;">An amino acid metabolite reflecting B-vitamin utilization. Keeping it low protects brain volume and inner artery linings.</p>
        </div>
        <div style="border-top: 1px solid #374151; padding-top: 10px; display: flex; justify-content: space-between; font-size: 0.8rem;">
          <span style="color: #9ca3af;">Standard: &lt; 15.0 umol/L</span>
          <span style="color: #22d3ee; font-weight: 600;">Longevity: &lt; 7.5 umol/L</span>
        </div>
      </div>
    `;

    takeawayHtml = `
      <div style="background: linear-gradient(90deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1)); border-left: 4px solid #10b981; border-radius: 8px; padding: 14px 18px; margin-top: 16px;">
        <p style="color: #e5e7eb; font-size: 0.9rem; line-height: 1.5; margin: 0;">
          <strong style="color: #34d399;">Proactive Insight:</strong> Standard lab 'normal ranges' are calculated from the general public average. Targeting optimal longevity numbers catches trends 10 years before disease ever manifests.
        </p>
      </div>
    `;
  }

  // If a custom banner is provided in frontmatter (infographic_banner_url), render banner visual preview
  const customBannerHtml = bannerUrl ? `
    <div style="margin-bottom: 20px; border-radius: 12px; overflow: hidden; border: 1px solid #374151; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
      <img src="${bannerUrl}" alt="${safeTitle} Infographic Guide" style="width: 100%; height: auto; max-height: 480px; object-fit: cover; display: block;" />
      <div style="background-color: #1e293b; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #94a3b8;">
        <span>Visual Reference: <strong>${safeTitle}</strong></span>
        <span style="color: #38bdf8;">Custom Clinical Flowchart</span>
      </div>
    </div>
  ` : '';

  return `
<div class="infographic-bento-section" style="background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 24px; margin: 32px 0; color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 20px; border-bottom: 1px solid #1f2937; padding-bottom: 16px;">
    <div>
      <div style="display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 9999px; background-color: rgba(16, 185, 129, 0.1); border: 1px solid ${badgeColor}; color: ${badgeColor}; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
        <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${badgeColor};"></span>
        ${badgeText}
      </div>
      <h3 style="color: #ffffff; font-size: 1.35rem; font-weight: 800; margin: 0 0 4px 0; letter-spacing: -0.02em;">${blueprintTitle}</h3>
      <p style="color: #9ca3af; font-size: 0.9rem; margin: 0;">${blueprintSubtitle}</p>
    </div>
    <div style="display: flex; gap: 8px;">
      <span style="background-color: #1f2937; color: #e5e7eb; border: 1px solid #374151; font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 6px;">Interactive Data Grid</span>
    </div>
  </div>

  ${customBannerHtml}

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
    ${cardsHtml}
  </div>

  ${takeawayHtml}
</div>
`.trim();
}

/**
 * Main Generator Function
 * Returns complete, publication-ready markdown article (>2,000 words)
 * formatted in clear, welcoming, layman-accessible language.
 */
export function generateFullClinicalMasterclass(pitch: PitchInput): string {
  const titleLower = (pitch.title || '').toLowerCase();
  const slugLower = (pitch.slug || '').toLowerCase();
  const kwLower = (pitch.targetKeyword || '').toLowerCase();

  // Find matching blueprint by keyword inspection
  let blueprintKey: string | null = null;
  if (titleLower.includes('apob') || slugLower.includes('apob') || kwLower.includes('apob') || titleLower.includes('ldl') || titleLower.includes('cholesterol')) {
    blueprintKey = 'apob';
  } else if (titleLower.includes('sarcopenia') || slugLower.includes('sarcopenia') || titleLower.includes('hypertrophy') || titleLower.includes('muscle') || titleLower.includes('strength')) {
    blueprintKey = 'sarcopenia';
  } else if (titleLower.includes('zone 2') || slugLower.includes('zone-2') || titleLower.includes('lactate') || titleLower.includes('vo2') || titleLower.includes('cardio')) {
    blueprintKey = 'zone2';
  } else if (titleLower.includes('insulin') || slugLower.includes('insulin') || titleLower.includes('homa-ir') || titleLower.includes('glucose') || titleLower.includes('sugar')) {
    blueprintKey = 'insulin';
  } else if (titleLower.includes('vagus') || slugLower.includes('vagus') || titleLower.includes('vns') || titleLower.includes('hrv') || titleLower.includes('breathwork') || titleLower.includes('stress')) {
    blueprintKey = 'vagus';
  }

  const baseBlueprint = blueprintKey && TOPIC_BLUEPRINTS[blueprintKey] ? TOPIC_BLUEPRINTS[blueprintKey] : {};
  const dynamicFallback = generateDynamicBlueprint(pitch);
  const bp: TopicBlueprint = {
    subtitle: baseBlueprint.subtitle || dynamicFallback.subtitle,
    directAnswer: baseBlueprint.directAnswer || dynamicFallback.directAnswer,
    asciiDiagram: baseBlueprint.asciiDiagram || dynamicFallback.asciiDiagram,
    mechanisms: baseBlueprint.mechanisms && baseBlueprint.mechanisms.length >= 3 ? baseBlueprint.mechanisms : dynamicFallback.mechanisms,
    biomarkerTable: baseBlueprint.biomarkerTable && baseBlueprint.biomarkerTable.length >= 3 ? baseBlueprint.biomarkerTable : dynamicFallback.biomarkerTable,
    statutoryScripts: baseBlueprint.statutoryScripts || dynamicFallback.statutoryScripts,
    protocolPhases: baseBlueprint.protocolPhases || dynamicFallback.protocolPhases,
    checklist: baseBlueprint.checklist && baseBlueprint.checklist.length >= 3 ? baseBlueprint.checklist : dynamicFallback.checklist,
    faqs: baseBlueprint.faqs && baseBlueprint.faqs.length >= 2 ? baseBlueprint.faqs : dynamicFallback.faqs,
    citations: baseBlueprint.citations && baseBlueprint.citations.length >= 2 ? baseBlueprint.citations : dynamicFallback.citations
  };

  const infographicHtml = generateCategoryInfographicHtml(
    pitch.category,
    pitch.title,
    (pitch as any).infographic_banner_url
  );

  const articleMarkdown = `
# ${pitch.title}

## ${bp.subtitle}

> **Quick Summary in Plain English:** ${bp.directAnswer}

---

## 1. Quick Visual Guide: How It Works

\`\`\`
${bp.asciiDiagram}
\`\`\`

---

## 2. Visual Longevity Infographic & Bento Matrix

${infographicHtml}

---

## 3. The Science in Plain English: What's Happening in Your Body

${bp.mechanisms.map((m, idx) => `### ${idx + 1}. ${m.split(':')[0].replace(/\*\*/g, '')}\n\n${m}`).join('\n\n')}

Understanding how your body works on a daily level removes the fear and mystery from your health numbers. When you give your cells the right daily signals—nutritious food, enjoyable movement, and restorative rest—your body naturally knows how to repair and thrive.

---

## 4. Your Health Numbers: 'Standard Normal' vs. Optimal Longevity Targets

At routine medical clinics, 'normal ranges' are calculated by averaging together blood tests from the general population—a population where chronic stress, poor sleep, and metabolic issues are increasingly common. 

Preventive longevity targets, on the other hand, show where your numbers should be if your goal is to stay vibrant, energetic, and disease-free for decades to come:

| Health Metric / Lab Test | Standard Routine 'Normal' | Optimal Longevity Target | Why This Number Matters for Your Health |
|---|---|---|---|
${bp.biomarkerTable.map(row => `| **${row.marker}** | ${row.standardRange} | ${row.optimalRange} | ${row.rationale} |`).join('\n')}

---

## 5. Navigating the Healthcare System: 3 Easy Ways to Get Tested

You don't have to feel stuck when it comes to checking your health numbers. Here is a clear breakdown of the three main ways people get their tests done today:

\`\`\`
===================================================================================
                   3 SIMPLE WAYS TO GET YOUR HEALTH TESTS DONE
===================================================================================

  [ 1. Routine Family Doctor / NHS ] ===> [ 2. Private Functional Doctor ] ===> [ 3. Direct Walk-In Lab ]
  - Great for routine illness checks      - Deep, 60-minute conversations       - Order your own blood tests
  - Limited 10-minute appointments        - Comprehensive preventive tests      - Zero referral or doctor required
  - Strict government budget caps         - Personalized longevity plans        - Fast, private results in 48 hours
===================================================================================
\`\`\`

1. **Option 1 (Your Family Doctor / Public NHS):** Your primary care doctor is great for diagnosing acute illness. However, routine physicals are usually limited to 10 to 15 minutes, and doctors are often required by insurance or public guidelines to only order tests if you already have symptoms.
2. **Option 2 (Private Preventive Doctors):** Functional and longevity physicians take time for in-depth, 60-minute consultations. They look at your overall lifestyle, family history, and advanced prevention markers to design a personalized game plan.
3. **Option 3 (Direct Walk-In Phlebotomy Labs):** Accredited private labs allow you to order your own comprehensive blood work online and simply walk in for a quick blood draw. You receive secure digital results within 2 to 3 days without needing a doctor's permission slip.

---

## 6. Exact Words to Use When Talking to Your Doctor

To have a productive, friendly conversation with your doctor during a rushed checkup without feeling brushed off, try using these simple, respectful talking points:

### Friendly Opening Request:
> "${bp.statutoryScripts.opening}"

### What to Say if They Say "Your Routine Tests Are Fine":
> "${bp.statutoryScripts.gatekeeperRebuttal}"

### Take-Home Tip:
Bring a clean, printed copy of your health goals or our 1-page Clinician Co-Pilot summary. Doctors love working with organized patients who are prepared with clear, respectful questions.

---

## 7. Your Step-by-Step 3-Phase Action Plan

To turn knowledge into real, daily results, follow this simple 3-phase roadmap:

### Phase 1: Check Your Starting Baseline (Weeks 1–2)
${bp.protocolPhases.phase1}

### Phase 2: Simple Daily Adjustments (Weeks 3–10)
${bp.protocolPhases.phase2}

### Phase 3: Check Your Progress & Keep Winning (Months 3–6)
${bp.protocolPhases.phase3}

---

## 8. Your Quick Action & Safety Checklist

Before moving forward, verify these simple steps to ensure you're on track:

${bp.checklist.map(item => `- [x] **${item}**`).join('\n')}

---

## 9. Free Clinician Co-Pilot Download (Doctor Leave-Behind Sheet)

Take the stress out of your next doctor's appointment. Download our free 4-page PDF workbook containing exact talking points, optimal lab target ranges, and private lab codes:

<div class="clinician-callout" style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 16px; padding: 24px; margin: 32px 0;">
  <h3 style="color: #10b981; margin: 0 0 12px 0; font-size: 1.25rem; font-weight: 800;">📄 Free 4-Page Clinician Co-Pilot PDF Workbook</h3>
  <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; margin: 0 0 16px 0;">
    Turn a rushed 10-minute checkup into a calm, confident conversation. Includes doctor leave-behind sheets, exact talking scripts, and direct lab codes for the US, UK, and Europe.
  </p>
  <a href="/clinician-copilot" style="display: inline-flex; align-items: center; gap: 8px; background: #059669; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-weight: 800; font-size: 0.875rem; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em;">
    Download Free Clinician Co-Pilot PDF &rarr;
  </a>
</div>

---

## 10. Check Your Own Health Baseline

Curious where your daily energy, recovery, and metabolic health currently stand? Take our quick 2-minute baseline quiz to get your personalized longevity score:

👉 **[Take the Free Health Baseline & Longevity Quiz](/health-quiz)**

*Get your personalized 6-pillar score and practical everyday action steps sent straight to your inbox.*

---

## 11. Regional Testing & Equipment Hubs

If you want to order verified blood panels or high-quality wellness equipment directly without insurance delays, access our recommended regional hubs:

- 🇺🇸 **United States:** Direct Quest & Labcorp walk-in blood draws and certified supplements at the [United States Health Hub](/store-us).
- 🇬🇧 **United Kingdom:** Accredited UKAS blood draws and MHRA-verified wellness tools at the [United Kingdom Diagnostic Hub](/store-uk).
- 🇪🇸 **Spain & Europe:** Walk-in Melio & Unilabs blood testing and European-certified nutrition at the [European Longevity Hub](/es).

---

## 12. Frequently Asked Questions (Clear & Direct Answers)

${bp.faqs.map(faq => `### Q: ${faq.q}\n\n**A:** ${faq.a}`).join('\n\n')}

---

## 13. Scientific Studies & Trusted Sources

${bp.citations.map((cite, i) => `${i + 1}. ${cite}`).join('\n')}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${pitch.title.replace(/"/g, '\\"')}",
  "description": "${pitch.summary?.replace(/"/g, '\\"') || ''}",
  "author": {
    "@type": "Organization",
    "name": "123TheNextLevel Health Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "123TheNextLevel",
    "url": "https://123thenextlevel.com"
  }
}
</script>
`.trim();

  return articleMarkdown;
}
