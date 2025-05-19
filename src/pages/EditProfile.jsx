import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://api.noroff.dev/api/v1/holidaze/profiles";

function EditProfile() {
  const { user, updateAvatar } = useAuth();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url || "");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
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

      updateAvatar(avatarUrl);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-body text-primary">
      <div className="bg-[#F3FBFA] p-8 rounded-xl shadow text-center max-w-xl mx-auto">
        <h1 className="text-2xl font-heading font-bold mb-6">Edit Your Avatar</h1>

        <img
          src={avatarUrl || "https://placehold.co/100x100?text=User"}
          alt="Avatar preview"
          className="w-24 h-24 rounded-full mx-auto border object-cover mb-4"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            placeholder="Enter new avatar image.url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded text-sm"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#BA4F4F] text-white font-semibold py-2 rounded shadow hover:opacity-90"
          >
            Save Avatar
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="w-full bg-gray-200 text-primary font-medium py-2 rounded shadow hover:opacity-90"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
