import { useEffect, useState } from "react";
import { getVenuesByProfile } from "../api/venues";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function MyVenues() {
  const { user } = useAuth();
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function fetchVenuesAndBookings() {
      if (!user?.accessToken || !user.name) return;

      try {
        // Get venues
        const venueData = await getVenuesByProfile(user.name, user.accessToken);
        setVenues(venueData);

        // Get bookings
        const res = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}/bookings?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
            },
          }
        );
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.errors?.[0]?.message || "Failed to fetch bookings");
        }

        const bookingData = await res.json();
        setBookings(Array.isArray(bookingData) ? bookingData : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenuesAndBookings();
  }, [user]);

  function toggleBookings(venueId) {
    setExpanded((prev) => ({
      ...prev,
      [venueId]: !prev[venueId],
    }));
  }

  async function handleDelete(venueId) {
    const confirmDelete = confirm("Are you sure you want to delete this venue?");
    if (!confirmDelete) return;

    setDeletingId(venueId);

    try {
      const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.errors?.[0]?.message || "Failed to delete venue");
      }

      setVenues((prev) => prev.filter((venue) => venue.id !== venueId));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <p>Loading your venues...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Add New Venue Button */}
      <div className="text-right">
        <Link
          to="/create"
          className="inline-block bg-cta text-white font-semibold px-4 py-2 rounded shadow hover:opacity-90"
        >
          ➕ Add New Venue
        </Link>
      </div>

      {/* No venues yet? */}
      {venues.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg mb-2">You haven’t created any venues yet.</p>
          <Link
            to="/create"
            className="text-blue-600 hover:underline font-medium"
          >
            Click here to create your first venue →
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {venues.map((venue) => {
            const venueBookings = bookings.filter(
              (booking) => booking.venue?.id === venue.id
            );
            const image =
              typeof venue.media?.[0] === "string"
                ? venue.media[0]
                : venue.media?.[0]?.url || "https://placehold.co/100x75";

            return (
              <div key={venue.id} className="p-4 border rounded bg-[#F3FBFA]">
                <div className="flex items-start gap-4">
                  {/* Venue Image */}
                  <img
                    src={image}
                    alt={venue.name}
                    className="w-24 h-16 object-cover rounded border"
                  />

                  {/* Venue Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{venue.name}</h3>
                    <p className="text-sm text-gray-600">
                      {venue.location?.city || "No location"}
                    </p>
                    <p className="text-sm">NOK {venue.price},-</p>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-2">
                      <button
                        onClick={() => toggleBookings(venue.id)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {expanded[venue.id] ? "Hide Bookings" : "View Bookings"}
                      </button>

                      <Link
                        to={`/edit/${venue.id}`}
                        className="text-sm text-green-700 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(venue.id)}
                        className="text-sm text-red-600 hover:underline"
                        disabled={deletingId === venue.id}
                      >
                        {deletingId === venue.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Booking List */}
                {expanded[venue.id] && (
                  <div className="mt-4 text-sm">
                    {venueBookings.length === 0 ? (
                      <p>No bookings yet.</p>
                    ) : (
                      <ul className="space-y-1">
                        {venueBookings.map((booking) => (
                          <li key={booking.id} className="border rounded p-2 bg-white">
                            <strong>{booking.customer?.name}</strong> —{" "}
                            {new Date(booking.dateFrom).toLocaleDateString()} to{" "}
                            {new Date(booking.dateTo).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyVenues;
