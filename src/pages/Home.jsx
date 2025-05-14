import VenueCard from "../components/VenueCard";

function Home() {
  const venues = [
    {
      id: 1,
      image: "https://placehold.co/330x230",
      title: "Veslebo",
      location: "West Coast, Norway",
      price: "NOK 250,- /night",
      tags: ["Pet Friendly", "Wi-Fi"],
    },
    {
      id: 2,
      image: "https://placehold.co/330x230",
      title: "Fjord View Retreat",
      location: "Bergen, Norway",
      price: "NOK 400,- /night",
      tags: ["Sea View", "Parking"],
    },
    {
      id: 3,
      image: "https://placehold.co/330x230",
      title: "Mountain Escape",
      location: "Geiranger, Norway",
      price: "NOK 350,- /night",
      tags: ["Pet Friendly", "Fireplace"],
    },
  ];

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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <VenueCard key={venue.id} {...venue} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
