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

export async function getPackages() {
  const data = await sheetFetch(`${BASE}?sheet=packages`);
  
  // Transform the data to match the expected format
  return data.map(pkg => ({
    id: pkg.id,
    destination: pkg.destination, // e.g., "swiss-paris", "thailand"
    title: pkg.packageName,
    image: pkg.heroImage,
    days: parseInt(pkg.days) || 0,
    nights: parseInt(pkg.nights) || 0,
    rating: parseInt(pkg.hotel) || 4,
    price: parseInt(pkg.price) || 0,
    overview: pkg.overview || ""
  }));
}

export async function getItinerary() {
  const data = await sheetFetch(`${BASE}?sheet=itinerary`);
  return data.map(item => ({
    packageId: item.packageId,
    day: item.day,
    title: item.title,
    bullets: item.bullets
  }));
}

export async function getInclusions() {
  const data = await sheetFetch(`${BASE}?sheet=inclusions`);
  return data.map(item => ({
    packageId: item.packageId,
    item: item.item
  }));
}

export async function getExclusions() {
  const data = await sheetFetch(`${BASE}?sheet=exclusions`);
  return data.map(item => ({
    packageId: item.packageId,
    item: item.item
  }));
}

export async function getPolicies() {
  const data = await sheetFetch(`${BASE}?sheet=policies`);
  return data.map(item => ({
    packageId: item.packageId,
    type: item.type,
    text: item.text
  }));
}

export async function getDestinations() {
  return sheetFetch(`${BASE}?sheet=destinations`);
}

export async function submitContactForm(formData) {
  try {
    const response = await fetch(BASE, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [{
          packageId: formData.destination || "",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || "",
          date: new Date().toISOString()
        }],
        sheet: "leads"
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, error: error.message };
  }
}

export async function getDestinationBySlug(slug) {
  const destinations = await sheetFetch(`${BASE}?sheet=destinations`);

  return destinations.find((d) => {
    if (!d) return false;

    const rowSlug = d.slug?.toString().toLowerCase();
    const rowName = d.name?.toString().toLowerCase();

    return rowSlug === slug.toLowerCase() || rowName === slug.toLowerCase();
  });
}