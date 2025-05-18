const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";

/**
 * Fetches venues owned by a specific user (profileName),
 * and includes the `owner` field in the response.
 */
export async function getVenuesByProfile(profileName, accessToken) {
  const res = await fetch(`${BASE_URL}/profiles/${profileName}/venues?_owner=true`, {
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

  console.log("📤 Full venue list (with owners):", data);

  return Array.isArray(data) ? data : [];
}
