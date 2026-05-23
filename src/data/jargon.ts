export interface JargonTerm {
  term: string;
  simpleDefinition: string;
  detailedExplanation: string;
  category: 'Autonomic' | 'Cellular' | 'Metabolic' | 'Epigenetics';
  practicalTip: string;
}

export const jargonDatabase: Record<string, JargonTerm> = {
  endocrine: {
    term: "Endocrine",
    simpleDefinition: "A network of glands and organs that release chemical messages (hormones) directly into the blood to instruct your body's systems.",
    detailedExplanation: "Traditionally, organs like muscles or fat were thought to be inert. Today we know they act as endocrine organs, manufacturing hormones (such as myokines) that flow through the blood to coordinate activity in distant organs like the brain, liver, and heart.",
    category: "Metabolic",
    practicalTip: "Skeletal muscle is your body's largest endocrine organ. Keep it active to maintain hormone balance and cellular sensitivity."
  },
  epigenetics: {
    term: "Epigenetics",
    simpleDefinition: "The layer of chemical switches on top of your DNA that turns specific genes on or off without altering the genetic code itself.",
    detailedExplanation: "While your genetic sequence (DNA) is fixed from birth, epigenetics determines which parts of that manual are actually read. Environmental factors like sleep, exercise, nutrition, and stress write chemical markers (like methyl tags) onto your DNA, controlling gene activity.",
    category: "Epigenetics",
    practicalTip: "Your habits are active signals rewriting your biology. Consistent good sleep and exercise actively toggle longevity genes to the 'on' state."
  },
  autophagy: {
    term: "Autophagy",
    simpleDefinition: "Your body's cellular recycling program that sweeps up damaged parts and converts them into fresh energy.",
    detailedExplanation: "When cells run low on external nutrients (like during a fast), they activate autophagy. Specialized membranes wrap around worn-out proteins, broken mitochondria, and cellular debris, digesting them back into raw amino acids to rebuild healthy cellular structures.",
    category: "Cellular",
    practicalTip: "Aim for a 16-hour fasting window 2-3 times a week, or combine workouts with calorie restriction to stimulate cellular cleanup."
  },
  vasoconstriction: {
    term: "Vasoconstriction",
    simpleDefinition: "The temporary narrowing of blood vessels, which shunts blood flow away from limbs and back to vital core organs.",
    detailedExplanation: "Under acute cold exposure or stress, smooth muscles surrounding your blood vessels contract. This reduces blood circulation in your fingers and toes, trapping warm blood around your brain, heart, and lungs to maintain core body temperature.",
    category: "Autonomic",
    practicalTip: "Triggering controlled vasoconstriction via cold plunging forces a rapid vascular exercise cycle, improving general blood pressure regulation."
  },
  vasodilation: {
    term: "Vasodilation",
    simpleDefinition: "The widening of blood vessels, which increases blood flow and carries more oxygen and nutrients to tissues.",
    detailedExplanation: "When your body heats up (such as in a sauna) or during exercise, blood vessels expand to release excess heat and deliver energy. Dilation lowers your blood pressure temporarily and floods muscles with oxygenated blood, accelerating recovery.",
    category: "Autonomic",
    practicalTip: "Use heat therapy (like infrared saunas) to trigger vasodilation, easing joint stiffness and washing away metabolic muscular waste."
  },
  norepinephrine: {
    term: "Norepinephrine",
    simpleDefinition: "A chemical messenger that acts as both a stress hormone and a neurotransmitter to boost mental focus and suppress body inflammation.",
    detailedExplanation: "Norepinephrine is released rapidly in response to cold exposure or physical strain. It constricts blood vessels, speeds up your breathing and heartbeat, enhances visual focus, and acts as a molecular switch that dampens systemic inflammatory pathways.",
    category: "Autonomic",
    practicalTip: "A 2-minute cold plunge can trigger a 500% increase in norepinephrine, keeping you mentally alert and reducing joint inflammation for hours."
  },
  myokines: {
    term: "Myokines",
    simpleDefinition: "Hormone-like signaling proteins created and released by skeletal muscle fibers when they contract.",
    detailedExplanation: "Myokines are the molecular words your muscles use to speak to other organs. They leave muscle tissue, enter the blood, and travel to the brain, liver, fat tissues, and bones, coordinating immune function, tissue repair, and energy metabolism.",
    category: "Metabolic",
    practicalTip: "Lifting weights or performing bodyweight squats releases a surge of myokines, helping to clear fat and protect brain health."
  },
  bdnf: {
    term: "BDNF",
    simpleDefinition: "Brain-Derived Neurotrophic Factor. A vital protein that acts as 'miracle-grow' to repair, protect, and build new brain cells.",
    detailedExplanation: "BDNF supports the survival of existing neurons and encourages the growth of new ones (neurogenesis) in the hippocampus—the learning and memory hub. It is the molecular key required to translate physical exercise into actual cognitive growth.",
    category: "Metabolic",
    practicalTip: "Get moving: muscle-derived Irisin crosses into the brainstem to stimulate the production of BDNF, actively keeping your brain young."
  },
  hrv: {
    term: "Heart Rate Variability (HRV)",
    simpleDefinition: "The subtle difference in time intervals between consecutive heartbeats, signaling your nervous system's resilience.",
    detailedExplanation: "A heart beating at 60bpm does not beat exactly once per second. If the intervals fluctuate (e.g. 0.9s, 1.1s), your HRV is high, signaling that your autonomic nervous system is relaxed and adaptable. A rigid interval signals stress and fatigue.",
    category: "Autonomic",
    practicalTip: "Track your HRV baseline using wearables. If your score drops below your average, prioritize recovery, sleep, and low-intensity movement."
  },
  vagal: {
    term: "Vagal Tone",
    simpleDefinition: "The strength and responsiveness of your vagus nerve, which dictates how quickly your body can calm down after stress.",
    detailedExplanation: "Higher vagal tone acts like a brake on your heart rate and respiration. When the vagus nerve is highly active, it sends signals to slow down your pulse, lower cortisol levels, and activate healthy rest-and-digest stomach contractions.",
    category: "Autonomic",
    practicalTip: "Engage in double-inhale breathing (Physiological Sigh) or use Transcutaneous Vagus Nerve Stimulation (tVNS) to actively strengthen vagal tone."
  },
  homa: {
    term: "HOMA-IR",
    simpleDefinition: "A clinical score representing insulin resistance, calculating how hard your pancreas works to maintain normal blood sugar.",
    detailedExplanation: "HOMA-IR combines fasting glucose and fasting insulin measurements. A high score means your body's cells are ignoring insulin, forcing your pancreas to pump out excess amounts to get glucose inside cells. This eventually leads to metabolic fatigue.",
    category: "Metabolic",
    practicalTip: "Aim to keep your HOMA-IR score below 1.0. You can achieve this by pairing protein with fiber, lifting weights, and avoiding late-night sugar."
  },
  titration: {
    term: "Titration",
    simpleDefinition: "Slowly and carefully adjusting the dose of a supplement or medication to find the sweet spot of benefit without negative side effects.",
    detailedExplanation: "In therapies like GLP-1 companion programs or cold therapy, jumping straight to high doses can overwhelm the body. Titration starts at a tiny threshold, giving your liver, receptors, or nervous system time to adapt before stepping up.",
    category: "Metabolic",
    practicalTip: "Always follow a progressive roadmap—whether stepping down water temperatures or stepping up amino acid saturation—to prevent injury."
  },
  mitochondria: {
    term: "Mitochondria",
    simpleDefinition: "The microscopic energy powerplants inside your cells that turn food nutrients and oxygen into energy fuel (ATP).",
    detailedExplanation: "Every cell houses hundreds of mitochondria. They act like internal combustion engines, taking electrons from your food and oxygen from your lungs to spin microscopic turbines that generate Adenosine Triphosphate (ATP), the primary energy currency of life.",
    category: "Cellular",
    practicalTip: "Perform long, steady-state Zone-2 cardio to increase mitochondrial efficiency, so you can burn fat for fuel instead of relying on sugars."
  },
  senescent: {
    term: "Senescent Cells",
    simpleDefinition: "Damaged cells that refuse to divide or die, hovering in tissues and releasing toxic chemicals (zombie cells).",
    detailedExplanation: "Normally, damaged cells self-destruct via apoptosis. Senescent cells disable this switch, entering a 'zombie' state. They accumulate in skin, joints, and organs, secreting a cocktail of inflammatory chemicals (the SASP) that ages and damages neighboring cells.",
    category: "Cellular",
    practicalTip: "Consume foods rich in natural senolytic antioxidants (like Quercetin from apples and Fisetin from strawberries) to flush out zombie cells."
  },
  biogenesis: {
    term: "Mitochondrial Biogenesis",
    simpleDefinition: "The cellular process of growing brand-new mitochondrial powerplants to multiply your energy reserves.",
    detailedExplanation: "When your cells experience an energy crunch (like during running or cold stress), they activate a master switch called PGC-1α. This tells your DNA to synthesize new proteins and split existing mitochondria, expanding your overall engine size.",
    category: "Cellular",
    practicalTip: "Combine consistent cold exposure with Zone-2 aerobic workouts to force your cells to grow new powerplants, doubling your energy baseline."
  },
  sirtuins: {
    term: "Sirtuins",
    simpleDefinition: "A family of seven protective enzymes that act as cellular antivirus software to repair DNA and regulate metabolism.",
    detailedExplanation: "Sirtuins act as key guardians of the genome. They repair broken DNA stands, wind genes tightly to prevent unwanted mutations, and switch on fat-burning pathways. Crucially, they require the coenzyme NAD+ to operate.",
    category: "Cellular",
    practicalTip: "Support your sirtuins by supplementing with NAD+ precursors (like NMN) and consuming dark grapes, blueberries, and green tea."
  },
  nad: {
    term: "NAD+",
    simpleDefinition: "A vital helper molecule found in every cell that carries energy and powers your DNA repair enzymes.",
    detailedExplanation: "Nicotinamide Adenine Dinucleotide (NAD+) is the cellular battery fluid. It acts as an electron carrier, transferring energy to make ATP. As we age, our NAD+ levels drop by 50% every 20 years, causing sirtuins to stall and cell damage to accumulate.",
    category: "Cellular",
    practicalTip: "Increase cellular NAD+ by engaging in hot/cold thermal therapy, taking NMN/NR precursors, and prioritizing restorative deep sleep."
  },
  hsp: {
    term: "Heat Shock Proteins (HSPs)",
    simpleDefinition: "Special helper proteins made by cells to repair and refold degraded or damaged cellular protein structures during heat stress.",
    detailedExplanation: "When your body is exposed to heat (like a sauna), your proteins begin to deform and lose shape. Heat Shock Proteins act as molecular chaperones, binding to these deformed proteins and refolding them back into their optimal shapes to protect the cell.",
    category: "Cellular",
    practicalTip: "Regular infrared sauna sessions at 160-180°F stimulate a robust HSP response, which protects cells from age-related breakdown."
  },
  irisin: {
    term: "Irisin",
    simpleDefinition: "An exercise-induced hormone (myokine) released by contracting muscles that crosses into the brainstem to stimulate brain cell growth.",
    detailedExplanation: "Irisin acts as a chemical bridge between body movement and brain function. When you exercise, skeletal muscle secretes Irisin into the blood. It crosses the blood-brain barrier and triggers the production of BDNF, keeping neurons active and adaptable.",
    category: "Metabolic",
    practicalTip: "Large skeletal muscle groups (like glutes and quads) synthesize the largest amounts of Irisin during contraction."
  }
};
