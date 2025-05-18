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

  return (
    <main className="max-w-2xl mx-auto p-6 bg-white font-body text-primary">
      <h1 className="text-2xl font-heading font-bold mb-4">Create Venue</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Venue Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="number"
          placeholder="Max Guests"
          value={form.maxGuests}
          onChange={(e) => setForm({ ...form, maxGuests: e.target.value })}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.media[0]}
          onChange={(e) =>
            setForm({
              ...form,
              media: [e.target.value],
            })
          }
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Address"
          value={form.location.address}
          onChange={(e) =>
            setForm({ ...form, location: { ...form.location, address: e.target.value } })
          }
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="City"
          value={form.location.city}
          onChange={(e) =>
            setForm({ ...form, location: { ...form.location, city: e.target.value } })
          }
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Country"
          value={form.location.country}
          onChange={(e) =>
            setForm({ ...form, location: { ...form.location, country: e.target.value } })
          }
          required
          className="w-full border px-4 py-2 rounded"
        />

        <div className="grid grid-cols-2 gap-2">
          {["wifi", "parking", "breakfast", "pets"].map((key) => (
            <label key={key} className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={form.meta[key]}
                onChange={() =>
                  setForm({
                    ...form,
                    meta: { ...form.meta, [key]: !form.meta[key] },
                  })
                }
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>

        <button type="submit" className="bg-cta text-white px-4 py-2 rounded shadow">
          Create Venue
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </main>
  );
}

export default CreateVenue;
