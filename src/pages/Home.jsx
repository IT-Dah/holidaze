import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";

function Home() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch("https://api.noroff.dev/api/v1/holidaze/venues");
        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }

        const data = await response.json();
        setVenues(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  function toggleTag(tag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  const extractTags = (venuesList) => {
    const tagSet = new Set();
    venuesList.forEach((venue) => {
      Object.entries(venue.meta || {}).forEach(([key, value]) => {
        if (value) tagSet.add(key);
      });
    });
    return Array.from(tagSet);
  };

  const allTags = extractTags(venues);

  const filteredVenues = venues.filter((venue) => {
    const matchesName = venue.name.toLowerCase().includes(query.toLowerCase());
    const matchesTags = selectedTags.every((tag) => venue.meta?.[tag] === true);
    return matchesName && matchesTags;
  });

  return (
    <main className="min-h-screen bg-background text-primary font-body">
      <section className="bg-accent py-16 text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Find your next stay</h1>
        <p className="text-lg mb-6">Search from cozy cabins to city escapes</p>

        <input
          type="text"
          placeholder="Search by venue name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded border w-80 focus:outline-none focus:ring-2 focus:ring-cta"
        />

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {allTags.map((tag) => {
            const isActive = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-sm px-3 py-1 rounded-full border transition ${
                  isActive
                    ? "bg-cta text-white"
                    : "bg-white text-primary border-gray-300"
                }`}
              >
                {tag}
              </button>
            );
          })}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-sm px-3 py-1 rounded-full border bg-red-100 text-red-600"
            >
              Clear tag filters ✕
            </button>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-heading font-semibold mb-8 text-center">Popular Venues</h2>

        {loading && <p className="text-center">Loading venues...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && filteredVenues.length === 0 && (
          <p className="text-center">No venues match your filters.</p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVenues.map((venue) => {
            const image =
              typeof venue.media?.[0] === "string"
                ? venue.media[0]
                : venue.media?.[0]?.url || "https://placehold.co/600x400";

            const tags = Object.entries(venue.meta || {})
              .filter(([, value]) => value)
              .map(([key]) => key);

            return (
              <VenueCard
                key={venue.id}
                id={venue.id}
                image={image}
                title={venue.name}
                location={venue.location?.city || "Unknown location"}
                price={`NOK ${venue.price},- /night`}
                tags={tags}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Home;
