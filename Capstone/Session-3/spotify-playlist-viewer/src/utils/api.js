/**
 * Zomato API Helper Utility
 * Reads Zomato API environment variables and prints configuration to the console.
 */

export function printZomatoApiConfig() {
  // Read variables from process.env (Next.js server/client) or import.meta.env (Vite)
  const apiKey = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_ZOMATO_API_KEY)
    || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ZOMATO_API_KEY)
    || "zomato_sec_994827164";

  const apiUrl = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_ZOMATO_API_URL)
    || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ZOMATO_API_URL)
    || "https://api.zomato.com/v2.1";

  const timestamp = new Date().toISOString();

  console.log("=========================================");
  console.log("🍽️ ZOMATO API CONFIGURATION LOGGED AT:", timestamp);
  console.log("🔑 NEXT_PUBLIC_ZOMATO_API_KEY:", apiKey);
  console.log("🌐 NEXT_PUBLIC_ZOMATO_API_URL:", apiUrl);
  console.log("=========================================");

  return {
    apiKey,
    apiUrl,
    timestamp,
    status: "Config successfully loaded from environment"
  };
}

// Automatically print to console when imported or executed if in browser/Node
if (typeof window !== 'undefined' || typeof process !== 'undefined') {
  try {
    printZomatoApiConfig();
  } catch (e) {
    // Silent fail if initial environment load occurs before setup
  }
}

export default printZomatoApiConfig;
