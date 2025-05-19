// ✅ src/pages/MyVenues.jsx
import { useEffect, useState } from "react";
import { getVenuesByProfile } from "../api/venues";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

function MyVenues() {
  const { user } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function fetchVenues() {
      if (!user?.accessToken || !user.name) return;

      try {
        const venueData = await getVenuesByProfile(user.name, user.accessToken);
        setVenues(venueData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [user]);

  async function handleDelete(venueId) {
    if (!confirm("Are you sure you want to delete this venue?")) return;
    setDeletingId(venueId);

    try {
      const res = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete venue");
      setVenues((prev) => prev.filter((v) => v.id !== venueId));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <p>Loading your venues…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold">My Venues</h2>

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
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue) => {
              const image =
                typeof venue.media?.[0] === "string"
                  ? venue.media[0]
                  : venue.media?.[0]?.url || "https://placehold.co/100x75";

              return (
                <div
                  key={venue.id}
                  className="p-4 bg-[#F3FBFA] border border-gray-200 rounded-xl shadow-sm"
                >
                  <div className="flex flex-col">
                    <img
                      src={image}
                      alt={venue.name}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h3 className="text-lg font-heading font-bold">
                      {venue.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {venue.location?.city || "Unknown location"}, {venue.location?.country}
                    </p>
                    <p className="text-sm mt-1 mb-2">
                      {formatCurrency(venue.price)} /night
                    </p>
                    <div className="flex justify-between text-sm">
                      <Link
                        to={`/edit/${venue.id}`}
                        className="text-green-700 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(venue.id)}
                        className="text-red-600 hover:underline"
                        disabled={deletingId === venue.id}
                      >
                        {deletingId === venue.id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-start sm:justify-left">
            <Link
              to="/create"
              className="block bg-[#BA4F4F] text-white font-semibold px-4 py-2 rounded shadow hover:opacity-90 text-center w-full sm:w-auto"
            >
              Add New Venue
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default MyVenues;
