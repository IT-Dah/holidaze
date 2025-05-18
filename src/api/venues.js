// src/api/venues.js

const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";

export async function getVenuesByProfile(profileName, accessToken) {
  const res = await fetch(`${BASE_URL}/profiles/${profileName}/venues`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.errors?.[0]?.message || "Failed to fetch venues");
  }

  const data = await res.json();

  // Debug output for development
  console.log("📤 Response from API:", data);
  console.log("👤 profileName (used in API):", profileName);
  console.log("📦 Returned venue owners:", Array.isArray(data.data) ? data.data.map((v) => v.owner?.name) : []);

  // ✅ ALWAYS return an array (safe fallback)
  return Array.isArray(data.data) ? data.data : [];
}
