import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "https://api.noroff.dev/api/v1/holidaze";

function VenueBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchManagerVenueBookings();
  }, [user]);

  async function fetchManagerVenueBookings() {
    if (!user?.venueManager) return;

    try {
      setLoading(true);

      const venuesRes = await fetch(`${BASE_URL}/profiles/${user.name}/venues`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
      });

      if (!venuesRes.ok) throw new Error("Failed to fetch manager venues");
      const ownedVenues = await venuesRes.json();
      const ownedVenueIds = ownedVenues.map((venue) => venue.id);

      const bookingsRes = await fetch(`${BASE_URL}/bookings?_venue=true&_customer=true`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
      });

      if (!bookingsRes.ok) throw new Error("Failed to fetch bookings");

      const allBookings = await bookingsRes.json();
      const managerBookings = allBookings.filter((booking) =>
        ownedVenueIds.includes(booking.venue?.id)
      );

      setBookings(managerBookings);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (bookings.length === 0) {
    return <p className="text-center py-6">No bookings have been made on your venues yet.</p>;
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => {
        const venue = booking.venue;
        const customer = booking.customer;
        const startDate = new Date(booking.dateFrom).toLocaleDateString();
        const endDate = new Date(booking.dateTo).toLocaleDateString();
        const image =
          typeof venue.media?.[0] === "string"
            ? venue.media[0]
            : venue.media?.[0]?.url || "https://placehold.co/600x400";

        return (
          <div key={booking.id} className="p-4 border rounded bg-[#F3FBFA] shadow">
            <div className="flex gap-4">
              <img
                src={image}
                alt={venue.name}
                className="w-24 h-16 object-cover rounded border"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{venue.name}</h3>
                <p className="text-sm">
                  From: {startDate} <br />To: {endDate}
                </p>
                <p className="text-sm mt-1">Guests: {booking.guests}</p>
                {customer && (
                  <p className="text-sm text-gray-600 mt-1">
                    Booked by: <strong>{customer.name}</strong> ({customer.email})
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VenueBookings;
