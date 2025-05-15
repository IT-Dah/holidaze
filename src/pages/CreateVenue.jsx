import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.noroff.dev/api/v1/holidaze/venues";

function CreateVenue() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    media: [{ url: "", alt: "" }],
    location: {
      address: "",
      city: "",
      country: "",
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
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
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
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Max Guests"
          value={form.maxGuests}
          onChange={(e) =>
            setForm({ ...form, maxGuests: Number(e.target.value) })
          }
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.media[0].url}
          onChange={(e) =>
            setForm({
              ...form,
              media: [{ url: e.target.value, alt: "Venue image" }],
            })
          }
          className="w-full border px-4 py-2 rounded"
        />

        {/* Meta Checkboxes */}
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

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}

export default CreateVenue;
