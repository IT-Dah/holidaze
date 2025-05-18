import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";

function EditProfile() {
  const { user, login } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(user.avatar?.url || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`${BASE_URL}/profiles/${user.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          avatar: {
            url: avatarUrl,
            alt: `${user.name}'s avatar`,
          },
          venueManager: user.venueManager, // ✅ REQUIRED by API
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.errors?.[0]?.message || "Failed to update profile");
      }

      const updatedUser = await res.json();

      // Update context and localStorage
      const newUser = { ...user, avatar: updatedUser.avatar };
      login(newUser);

      alert("Avatar updated!");
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6 bg-white text-primary font-body min-h-screen">
      <h1 className="text-2xl font-heading font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center">
          <img
            src={avatarUrl || "https://placehold.co/100x100?text=User"}
            alt="New avatar preview"
            className="w-24 h-24 mx-auto rounded-full border mb-2 object-cover"
          />
        </div>

        <input
          type="url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="Enter image URL"
          required
          className="w-full border px-4 py-2 rounded"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-cta text-white px-4 py-2 rounded shadow hover:opacity-90"
          >
            {saving ? "Saving..." : "Save Avatar"}
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
