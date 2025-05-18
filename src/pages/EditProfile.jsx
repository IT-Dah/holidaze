// src/pages/EditProfile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://api.noroff.dev/api/v1/holidaze/profiles";

function EditProfile() {
  const { user, updateAvatar } = useAuth(); // ✅ use updateAvatar, not login
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url || "");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      // ✅ Update the avatar via API
      const updateResponse = await fetch(`${BASE_URL}/${user.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          venueManager: user.venueManager,
          avatar: {
            url: avatarUrl,
            alt: `${user.name}'s avatar`,
          },
        }),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.errors?.[0]?.message || "Failed to update avatar");
      }

      // ✅ Just update the avatar context — no need to fetch whole profile again
      updateAvatar(avatarUrl);

      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="max-w-xl mx-auto py-12 px-4 font-body text-primary">
      <h1 className="text-3xl font-heading font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center">
          <img
            src={avatarUrl || "https://placehold.co/100x100?text=User"}
            alt="Avatar preview"
            className="w-24 h-24 rounded-full mx-auto border mb-4 object-cover"
          />
        </div>

        <input
          type="url"
          placeholder="Enter new avatar image URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-cta text-white px-4 py-2 rounded shadow hover:opacity-90"
          >
            Save Avatar
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="bg-gray-300 text-primary px-4 py-2 rounded shadow hover:opacity-90"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditProfile;
