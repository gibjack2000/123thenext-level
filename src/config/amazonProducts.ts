export interface HubAmazonProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  url: string;
  image_url: string;
  description: string;
}

export const hubAmazonProducts: HubAmazonProduct[] = [
  {
    id: "hub-blood-pressure-cuff",
    name: "Withings BPM Connect Wi-Fi Cuff",
    category: "Tech Gadgets & Wearables",
    price: "$99.95",
    url: "https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20",
    image_url: "/assets/images/shop/bpm-connect.png",
    description: "Smart Wi-Fi blood pressure cuff. Automatically logs systolic, diastolic, and pulse trends, classifying cardiovascular data against JNC-8 guidelines without spot-check anxiety."
  },
  {
    id: "hub-sleep-analyzer",
    name: "Withings Sleep Analyzer Under-Mattress Pad",
    category: "Tech Gadgets & Wearables",
    price: "$129.95",
    url: "https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20",
    image_url: "/assets/images/shop/sleep-analyzer.png",
    description: "A contact-free sleep tracker placed under your mattress. Automatically logs sleeping heart rate, sleep cycles, and passive breathing disturbances."
  },
  {
    id: "hub-segmental-scale",
    name: "Withings Body Scan Segmental Composition Scale",
    category: "Tech Gadgets & Wearables",
    price: "$399.95",
    url: "https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20",
    image_url: "/assets/images/shop/body-scan.png",
    description: "FDA-cleared 8-electrode bioelectrical impedance scale. Segmentally maps skeletal muscle mass, fat percentage by limb, and visceral fat index surrounding organs."
  },
  {
    id: "hub-apple-watch",
    name: "Apple Watch Series 10 (GPS 46mm)",
    category: "Tech Gadgets & Wearables",
    price: "$399.00",
    url: "https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20",
    image_url: "/assets/images/shop/apple-watch.png",
    description: "Advanced multispectral wearable capturing sleep architecture, resting heart rate, sleep apnea flags, and Heart Rate Variability (HRV)."
  }
];

export const amazonProducts = hubAmazonProducts;
export default hubAmazonProducts;
