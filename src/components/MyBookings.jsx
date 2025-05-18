import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";

function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      if (!user?.accessToken || !user.name) return;

      try {
        const res = await fetch(`${BASE_URL}/profiles/${user.name}/bookings?_venue=true`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.errors?.[0]?.message || "Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user]);

  async function handleCancelBooking(bookingId) {
    const confirmed = confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    setDeletingId(bookingId);

    try {
      const res = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.errors?.[0]?.message || "Failed to cancel booking");
      }

      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (bookings.length === 0) return (
    <p className="text-center py-6">You don’t have any bookings yet.</p>
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => {
        const venue = booking.venue;
        const startDate = new Date(booking.dateFrom).toLocaleDateString();
        const endDate = new Date(booking.dateTo).toLocaleDateString();

        const image =
          typeof venue.media?.[0] === "string"
            ? venue.media[0]
            : venue.media?.[0]?.url || "https://placehold.co/600x400";

        return (
          <div key={booking.id} className="bg-card p-4 rounded-lg shadow flex flex-col h-full">
            <img
              src={image}
              alt={venue.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-heading font-bold">{venue.name}</h3>
              <p className="text-sm text-gray-600">{venue.location?.city || "Unknown location"}</p>

              <p className="text-sm mt-2">
                <strong>From:</strong> {startDate}<br />
                <strong>To:</strong> {endDate}
              </p>

              <p className="mt-2 font-medium">Price: NOK {venue.price},-</p>
            </div>

            <button
              onClick={() => handleCancelBooking(booking.id)}
              className="mt-4 text-sm text-red-600 hover:underline"
              disabled={deletingId === booking.id}
            >
              {deletingId === booking.id ? "Cancelling..." : "Cancel Booking"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default MyBookings;
