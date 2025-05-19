import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isWithinInterval } from "date-fns";
import CustomDatePicker from "../components/CustomDatePicker";
import { formatCurrency } from "../utils/formatCurrency";

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
    <main className="max-w-6xl mx-auto p-6 font-body text-primary">
      <img
        src={image}
        alt={venue.name}
        className="w-full h-72 md:h-96 object-cover rounded mb-6"
      />

      <div className="grid md:grid-cols-3 gap-8">
        {/* Venue info */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-heading font-bold mb-1">{venue.name}</h1>
          <p className="text-gray-600 mb-1">
            {venue.location?.city}, {venue.location?.country}
          </p>
          <p className="text-lg font-semibold mb-6">
            {formatCurrency(venue.price)} /night
          </p>

          <h2 className="text-xl font-heading font-bold mb-2">Amenities</h2>
          <ul className="list-disc pl-5 space-y-1 mb-6 text-sm">
            {venue.meta?.wifi && <li>Free Wi-Fi</li>}
            {venue.meta?.parking && <li>Free parking</li>}
            {venue.meta?.breakfast && <li>Free breakfast</li>}
            {venue.meta?.pets && <li>Pet-friendly</li>}
          </ul>

          <h2 className="text-xl font-heading font-bold mb-2">Description</h2>
          <p className="text-sm">{venue.description}</p>
        </div>

        {/* Booking card */}
        <div className="md:col-span-1">
          <div className="bg-[#F3FBFA] p-6 rounded-xl shadow">
            <h2 className="text-xl font-heading font-bold mb-4">Booking</h2>

            {!user ? (
              <p className="text-sm text-gray-700">
                Please{" "}
                <Link to="/auth" className="text-blue-600 underline">
                  log in
                </Link>{" "}
                to book this venue.
              </p>
            ) : user.venueManager ? (
              <p className="text-sm text-red-600 font-medium">
                As a venue manager, you cannot book other venues.{" "}
                <Link to="/profile" className="underline text-blue-600">
                  Go to your profile to manage your venues.
                </Link>
              </p>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                <CustomDatePicker
                  selected={booking.dateFrom}
                  onChange={(date) => {
                    const [start, end] = date;
                    setBooking({ ...booking, dateFrom: start, dateTo: end });
                  }}
                  startDate={booking.dateFrom}
                  endDate={booking.dateTo}
                  minDate={new Date()}
                  filterDate={(date) => !isDateUnavailable(date)}
                />

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
                  className="bg-[#BA4F4F] text-white px-4 py-2 rounded w-full font-semibold hover:opacity-90"
                >
                  Book Now
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default VenueDetails;
