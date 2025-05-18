const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Register new user
 * Required: name, email, password
 * Optional: venueManager (defaults to false)
 */
export async function registerUser({ name, email, password, venueManager = false }) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({
      name,
      email,
      password,
      venueManager,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Registration failed");
  }

  return await response.json();
}

/**
 * Login existing user
 */
export async function loginUser({ email, password }) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Login failed");
  }

  return await response.json(); // Includes user info + token
}
