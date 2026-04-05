import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function verify() {
  console.log("--- API Verification ---");

  // 1. Supabase
  console.log("\n1. Testing Supabase Connection...");
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const { data: productData, error: productError } = await supabase.from('amazon_affiliate_products').select('id, title').limit(1);
  if (productError) {
    console.error("❌ Supabase table access failed:", productError.message);
  } else {
    console.log("✅ Supabase table access successful. Found product:", productData[0]?.title || "None");
  }

  // 2. RPC
  console.log("\n2. Testing get_random_amazon_product RPC...");
  const { data: rpcData, error: rpcError } = await supabase.rpc('get_random_amazon_product', { 
    p_market: 'US', 
    p_category: 'Health & Household' 
  });
  if (rpcError) {
    console.error("❌ RPC function failed:", rpcError.message);
  } else {
    const count = Array.isArray(rpcData) ? rpcData.length : (rpcData ? 1 : 0);
    console.log("✅ RPC function successful. Returned product count:", count);
    if (count > 0) {
      const p = Array.isArray(rpcData) ? rpcData[0] : rpcData;
      console.log("   Product:", p.title || p.product_name);
    }
  }

  // 3. Gemini
  console.log("\n3. Testing Gemini API (gemini-2.5-flash)...");
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: 'user', parts: [{ text: "Respond with 'Connected' only." }] }]
    });
    console.log("✅ Gemini API successful. Response:", result.text);
  } catch (err) {
    console.error("❌ Gemini API failed:", err.message);
  }

  console.log("\n--- Verification Complete ---");
}

verify();
