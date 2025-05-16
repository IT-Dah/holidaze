import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";

function Home() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVenues() {
      try {
        const res = await fetch("https://api.noroff.dev/api/v1/holidaze/venues");
        if (!res.ok) throw new Error("Failed to fetch venues");

        const data = await res.json();
        console.log("Fetched venues:", data);
        setVenues(data || []); // ✅ Use data directly if already an array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  return (
    <main className="min-h-screen bg-background text-primary font-body">
      {/* Hero Section */}
      <section className="bg-accent py-16 text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Find your next stay</h1>
        <p className="text-lg mb-6">Search from cozy cabins to city escapes</p>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded border w-80 focus:outline-none focus:ring-2 focus:ring-cta"
        />
      </section>

      {/* Venue List */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-heading font-semibold mb-8 text-center">Popular Venues</h2>

        {loading && <p className="text-center">Loading venues...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && Array.isArray(venues) && venues.length === 0 && (
          <p className="text-center">No venues found.</p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(venues) &&
            venues.map((venue) => (
              <VenueCard
                key={venue.id}
                id={venue.id}
                image={
                  typeof venue.media?.[0] === "string"
                    ? venue.media[0]
                    : venue.media?.[0]?.url || "https://placehold.co/600x400"
                }
                title={venue.name}
                location={venue.location?.city || "Unknown location"}
                price={`NOK ${venue.price},- /night`}
                tags={Object.entries(venue.meta || {})
                  .filter(([_, value]) => value)
                  .map(([key]) => key)}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
