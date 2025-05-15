const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";

/**
 * Fetch all venues for a specific profile
 * @param {string} profileName
 * @returns {Promise<Array>} List of venues
 */
export async function getVenuesByProfile(profileName) {
  const res = await fetch(`${BASE_URL}/profiles/${profileName}/venues`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.errors?.[0]?.message || "Failed to fetch venues");
  }

  const data = await res.json();
  return data.data;
}
