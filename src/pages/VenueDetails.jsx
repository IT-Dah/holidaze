import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isWithinInterval } from "date-fns";

const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";

function VenueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState({
    dateFrom: null,
    dateTo: null,
    guests: 1,
  });

  useEffect(() => {
    async function fetchVenueAndBookings() {
      try {
        const venueRes = await fetch(`${BASE_URL}/venues/${id}`);
        if (!venueRes.ok) throw new Error("Venue not found");
        const venueData = await venueRes.json();
        setVenue(venueData);

        if (user && !user.venueManager) {
          const bookingsRes = await fetch(`${BASE_URL}/bookings?_venue=true`, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
            },
          });

          if (!bookingsRes.ok) throw new Error("Failed to load bookings");

          const allBookings = await bookingsRes.json();
          const venueBookings = allBookings.filter((b) => b.venue?.id === id);
          setBookings(venueBookings);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenueAndBookings();
  }, [id, user]);

  const disabledDateRanges = bookings.map((b) => ({
    start: new Date(b.dateFrom),
    end: new Date(b.dateTo),
  }));

  const isDateUnavailable = (date) =>
    disabledDateRanges.some((range) => isWithinInterval(date, range));

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
          dateFrom: booking.dateFrom?.toISOString(),
          dateTo: booking.dateTo?.toISOString(),
          venueId: id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.errors?.[0]?.message || "Booking failed");
      }

      alert("Booking successful!");
      setTimeout(() => {
        navigate("/profile?tab=bookings");
      }, 1000);
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p>Loading venue...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!venue) return null;

  const image =
    typeof venue.media?.[0] === "string"
      ? venue.media[0]
      : venue.media?.[0]?.url || "https://placehold.co/600x400";

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white font-body text-primary">
      <img
        src={image}
        alt={venue.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h1 className="text-2xl font-heading font-bold">{venue.name}</h1>
      <p className="text-sm text-gray-600 mb-2">
        {venue.location?.city}, {venue.location?.country}
      </p>
      <p className="mb-4">{venue.description}</p>
      <p className="text-lg font-semibold mb-6">
        NOK {venue.price},- per night
      </p>

      {!user ? (
        <p className="text-sm text-gray-700">
          Please{" "}
          <Link to="/auth" className="text-blue-600 underline">
            log in
          </Link>{" "}
          to book this venue.
        </p>
      ) : user.venueManager ? (
        <p className="text-sm text-red-600 font-medium mt-6">
          As a venue manager, you cannot book other venues.{" "}
          <Link to="/profile" className="underline text-blue-600">
            Go to your profile to manage your venues.
          </Link>
        </p>
      ) : (
        <form onSubmit={handleBooking} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <DatePicker
              selected={booking.dateFrom}
              onChange={(date) =>
                setBooking({ ...booking, dateFrom: date })
              }
              selectsStart
              startDate={booking.dateFrom}
              endDate={booking.dateTo}
              minDate={new Date()}
              filterDate={(date) => !isDateUnavailable(date)}
              placeholderText="Select start date"
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <DatePicker
              selected={booking.dateTo}
              onChange={(date) => setBooking({ ...booking, dateTo: date })}
              selectsEnd
              startDate={booking.dateFrom}
              endDate={booking.dateTo}
              minDate={booking.dateFrom || new Date()}
              filterDate={(date) => !isDateUnavailable(date)}
              placeholderText="Select end date"
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Guests</label>
            <input
              type="number"
              value={booking.guests}
              onChange={(e) =>
                setBooking({ ...booking, guests: Number(e.target.value) })
              }
              min={1}
              max={venue.maxGuests || 10}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-cta text-white px-4 py-2 rounded shadow hover:opacity-90"
          >
            Book Now
          </button>
        </form>
      )}
    </main>
  );
}

export default VenueDetails;
