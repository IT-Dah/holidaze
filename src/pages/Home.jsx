function Home() {
  return (
    <main className="min-h-screen bg-white text-primary font-body">
      {/* Hero Section */}
      <section className="bg-[#D2E4EB] py-16 text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Find your next stay</h1>
        <p className="text-lg mb-6">Search from cozy cabins to city escapes</p>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded border w-80 focus:outline-none focus:ring-2 focus:ring-[#FD7C7C]"
        />
      </section>

      {/* Popular Venues */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-heading font-semibold mb-8 text-center">Popular Venues</h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div key={id} className="bg-[#F3FBFA] rounded-lg shadow-md p-4">
              <div className="rounded overflow-hidden mb-3">
                <img
                  src="https://placehold.co/330x230"
                  alt="Venue"
                  className="w-[330px] h-[230px] object-cover mx-auto"
                />
              </div>
              <span className="inline-block bg-[#BFE2E4] text-sm text-primary font-semibold px-3 py-1 rounded-full mb-2">
                Pet Friendly
              </span>
              <h3 className="text-lg font-bold font-heading">Veslebo</h3>
              <p className="text-sm">West Coast, Norway</p>
              <div className="flex items-center my-2 text-yellow-500 text-sm">★★★★★</div>
              <p className="text-sm font-medium mb-3">NOK 250,- /night</p>
              <button className="bg-[#FD7C7C] text-white font-semibold px-4 py-2 rounded hover:opacity-90 w-full shadow">
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
