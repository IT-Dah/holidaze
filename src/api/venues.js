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

  // ✅ This is the correct structure for this endpoint
  // It returns an array directly
  console.log("📤 Full venue list (raw):", data);

  return Array.isArray(data) ? data : []; // ✅ NOT data.data
}
