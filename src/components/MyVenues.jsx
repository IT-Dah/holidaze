// src/components/MyVenues.jsx
import { useEffect, useState } from "react";
import { getVenuesByProfile } from "../api/venues";
import { useAuth } from "../context/AuthContext";
import VenueCard from "./VenueCard";

function MyVenues() {
  const { user } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVenues() {
      if (!user?.accessToken || !user.name) return;

      try {
        const data = await getVenuesByProfile(user.name, user.accessToken);
        console.log("📤 Full venue objects:", data);

        const myVenues = Array.isArray(data)
          ? data.filter((venue) => {
              console.log("🔎 Venue owner.name:", venue.owner?.name);
              return venue.owner?.name === user.name;
            })
          : [];

        setVenues(myVenues);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [user]);

  if (loading) return <p>Loading your venues...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (venues.length === 0) return <p>No venues found.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {venues.map((venue) => (
        <VenueCard
          key={venue.id}
          id={venue.id}
          image={venue.media?.[0]?.url || "https://placehold.co/600x400"}
          title={venue.name}
          location={venue.location?.city || "Unknown location"}
          price={`NOK ${venue.price},- /night`}
          tags={Object.entries(venue.meta || {})
            .filter(([_, value]) => value)
            .map(([key]) => key)}
        />
      ))}
    </div>
  );
}

export default MyVenues;
