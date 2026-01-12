const BASE = "https://sheetdb.io/api/v1/kvizvbox8f7jz";
const TOKEN = process.env.SHEETDB_TOKEN;

// This helper contains the secret "Authorization" header
async function sheetFetch(url) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    // This will help you see the exact error from SheetDB in your terminal
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Error: ${res.status}`);
  }

  return res.json();
}

// Update these to use the sheetFetch function defined above
export async function getPackages() {
  return sheetFetch(BASE);
}

export async function getItinerary() {
  return sheetFetch(`${BASE}?sheet=itinerary`);
}

export async function getInclusions() {
  return sheetFetch(`${BASE}?sheet=inclusions`);
}

export async function getExclusions() {
  return sheetFetch(`${BASE}?sheet=exclusions`);
}

export async function getPolicies() {
  return sheetFetch(`${BASE}?sheet=policies`);
}