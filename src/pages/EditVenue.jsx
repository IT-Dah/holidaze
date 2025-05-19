import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://api.noroff.dev/api/v1/holidaze/venues";

function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVenue() {
      try {
        const res = await fetch(`${BASE_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.errors?.[0]?.message || "Failed to load venue");
        }

        const data = await res.json();
        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
          maxGuests: data.maxGuests,
          media: [data.media?.[0] || ""],
          location: {
            address: data.location?.address || "",
            city: data.location?.city || "",
            country: data.location?.country || "",
          },
          meta: {
            wifi: data.meta?.wifi || false,
            parking: data.meta?.parking || false,
            breakfast: data.meta?.breakfast || false,
            pets: data.meta?.pets || false,
          },
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenue();
  }, [id, user]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          ...form,
          media: form.media[0] ? [form.media[0]] : [],
          price: Number(form.price),
          maxGuests: Number(form.maxGuests),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.errors?.[0]?.message || "Update failed");
      }

      alert("Venue updated!");
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (["wifi", "parking", "breakfast", "pets"].includes(name)) {
      setForm({ ...form, meta: { ...form.meta, [name]: checked } });
    } else if (["address", "city", "country"].includes(name)) {
      setForm({ ...form, location: { ...form.location, [name]: value } });
    } else if (name === "media") {
      setForm({ ...form, media: [value] });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  if (loading) return <p>Loading venue...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!form) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white font-body text-primary">
      <h1 className="text-2xl font-heading font-bold mb-4">Edit Venue</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Venue Name"
          required
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="maxGuests"
          type="number"
          value={form.maxGuests}
          onChange={handleChange}
          placeholder="Max Guests"
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="media"
          type="text"
          value={form.media[0]}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="address"
          value={form.location.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="city"
          value={form.location.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="country"
          value={form.location.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full border px-4 py-2 rounded"
        />

        <div className="grid grid-cols-2 gap-2">
          {["wifi", "parking", "breakfast", "pets"].map((key) => (
            <label key={key} className="flex gap-2 items-center text-sm">
              <input
                type="checkbox"
                name={key}
                checked={form.meta[key]}
                onChange={handleChange}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:opacity-90"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="ml-4 bg-red-600 text-white px-4 py-2 rounded shadow hover:opacity-90"
        >
          Cancel
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default EditVenue;
