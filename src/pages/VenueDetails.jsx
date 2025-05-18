import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";

function VenueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });

  async function handleBooking(e) {
    e.preventDefault();
    if (!user) return alert("Please log in to book.");

    try {
      const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          ...booking,
          venueId: id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.errors?.[0]?.message || "Booking failed");
      }

      alert("Booking successful!");
      navigate("/profile");
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    async function fetchVenue() {
      try {
        const res = await fetch(`${BASE_URL}/venues/${id}`);
        if (!res.ok) throw new Error("Venue not found");
        const data = await res.json();
        setVenue(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  if (loading) return <p>Loading venue...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!venue) return null;

  const image =
    typeof venue.media?.[0] === "string"
      ? venue.media[0]
      : venue.media?.[0]?.url || "https://placehold.co/600x400";

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white font-body text-primary">
      <img src={image} alt={venue.name} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-2xl font-heading font-bold">{venue.name}</h1>
      <p className="text-sm text-gray-600 mb-2">{venue.location?.city}, {venue.location?.country}</p>
      <p className="mb-4">{venue.description}</p>
      <p className="text-lg font-semibold mb-6">NOK {venue.price},- per night</p>

      {user ? (
        <form onSubmit={handleBooking} className="space-y-4 max-w-md">
          <label className="block text-sm font-medium">From</label>
          <input
            type="date"
            value={booking.dateFrom}
            onChange={(e) => setBooking({ ...booking, dateFrom: e.target.value })}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <label className="block text-sm font-medium">To</label>
          <input
            type="date"
            value={booking.dateTo}
            onChange={(e) => setBooking({ ...booking, dateTo: e.target.value })}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <label className="block text-sm font-medium">Guests</label>
          <input
            type="number"
            value={booking.guests}
            onChange={(e) => setBooking({ ...booking, guests: Number(e.target.value) })}
            min={1}
            max={venue.maxGuests || 10}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <button type="submit" className="bg-cta text-white px-4 py-2 rounded shadow hover:opacity-90">
            Book Now
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-700">Please <a href="/auth" className="text-blue-600 underline">log in</a> to book this venue.</p>
      )}
    </main>
  );
}

export default VenueDetails;
