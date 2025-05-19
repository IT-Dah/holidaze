import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://api.noroff.dev/api/v1/holidaze/venues";

function CreateVenue() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    rating: 0,
    media: [""],
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = user?.accessToken;
  const apiKey = import.meta.env.VITE_API_KEY;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
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
        throw new Error(data.errors?.[0]?.message || "Something went wrong");
      }

      alert("Venue created!");
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  }

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleLocationChange = (key, value) =>
    setForm(prev => ({ ...prev, location: { ...prev.location, [key]: value } }));

  const toggleMeta = (key) =>
    setForm(prev => ({ ...prev, meta: { ...prev.meta, [key]: !prev.meta[key] } }));

  return (
    <main className="max-w-2xl mx-auto p-6 font-body text-primary">
      <div className="bg-[#F3FBFA] p-6 rounded-xl shadow">
        <h1 className="text-3xl font-heading font-bold mb-6 text-center">Create Venue</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
            className="w-full border px-4 py-2 rounded h-32"
          />

          <input
            type="number"
            placeholder="Price per night (NOK)"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="number"
            placeholder="Max guests"
            value={form.maxGuests}
            onChange={(e) => handleChange("maxGuests", e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={form.media[0]}
            onChange={(e) => setForm({ ...form, media: [e.target.value] })}
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="text"
            placeholder="Address"
            value={form.location.address}
            onChange={(e) => handleLocationChange("address", e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="text"
            placeholder="City"
            value={form.location.city}
            onChange={(e) => handleLocationChange("city", e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="text"
            placeholder="Country"
            value={form.location.country}
            onChange={(e) => handleLocationChange("country", e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />

          {/* Updated tags/checkboxes */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "wifi", label: "Wifi" },
              { key: "breakfast", label: "Breakfast" },
              { key: "parking", label: "Parking" },
              { key: "pets", label: "Pets" },
            ].map(({ key, label }) => (
              <label key={key} className="flex gap-2 items-center text-sm">
                <input
                  type="checkbox"
                  checked={form.meta[key]}
                  onChange={() => toggleMeta(key)}
                />
                {label}
              </label>
            ))}
          </div>

          {/* Consistent button styling */}
          <button
            type="submit"
            className="bg-[#1F3B57] text-white w-full font-semibold py-2 rounded shadow hover:opacity-90"
          >
            Publish
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="bg-[#D2E4EB] text-primary w-full font-semibold py-2 rounded shadow hover:opacity-90 mt-2"
          >
            Cancel
          </button>

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </main>
  );
}

export default CreateVenue;
