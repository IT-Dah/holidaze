const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Registers a new user as a venue manager by default
 */
export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({
      ...userData,
      venueManager: true, // ✅ You can force this if needed for testing
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Registration failed");
  }

  return await response.json();
}

/**
 * Logs in an existing user
 */
export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Login failed");
  }

  return await response.json(); // Includes user info + accessToken
}
