function Home() {
  return (
    <main className="min-h-screen bg-background text-primary font-body">
      {/* Hero Section */}
      <section className="bg-accent py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Find your next stay
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Search from cozy cabins to city escapes
        </p>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 w-80 rounded-md border focus:outline-none focus:ring-2 focus:ring-cta"
        />
      </section>

      {/* Venue Cards */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-heading font-semibold mb-8 text-center">
          Popular Venues
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div
              key={id}
              className="bg-accent p-4 rounded-xl shadow-md w-[330px] mx-auto"
            >
              <img
                src="https://placehold.co/330x230"
                alt="Venue"
                className="w-[330px] h-[230px] object-cover rounded-md mb-4"
              />
              <span className="bg-white text-sm text-primary px-3 py-1 rounded-full inline-block mb-2">
                Pet Friendly
              </span>
              <h3 className="font-heading font-semibold text-lg text-primary mb-1">
                Veslebo
              </h3>
              <p className="text-sm text-gray-700 mb-1">
                West Coast, Norway
              </p>
              <div className="text-yellow-500 text-sm mb-1">★★★★★</div>
              <p className="text-sm text-gray-800 mb-4">NOK 250,- /night</p>
              <button className="bg-cta text-white font-semibold px-4 py-2 w-full rounded-md shadow hover:brightness-110 transition">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
