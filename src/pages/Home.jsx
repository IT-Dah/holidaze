function Home() {
  return (
    <main className="min-h-screen bg-background font-body text-primary">
      <section className="text-center py-16 bg-[url('/your-image.jpg')] bg-cover bg-center">
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">Find your next stay</h1>
        <input
          type="text"
          placeholder="Search..."
          className="mt-4 px-6 py-3 w-80 max-w-full rounded-md border border-primary bg-background focus:ring-2 focus:ring-cta shadow"
        />
      </section>

      <section className="py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6 text-center">Popular Venues</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div key={id} className="bg-accent rounded-lg shadow-md overflow-hidden p-4">
              <div className="h-40 bg-gray-300 rounded mb-4"></div>
              <span className="text-sm bg-white text-primary px-3 py-1 rounded-full inline-block mb-2 shadow">Pet Friendly</span>
              <h3 className="text-lg font-heading font-semibold mb-1">Veslebo</h3>
              <p className="text-sm text-gray-700 mb-1">West Coast, Norway</p>
              <p className="text-sm text-gray-500 mb-1">⭐⭐⭐⭐⭐</p>
              <p className="text-sm font-semibold text-primary">NOK 250,- /night</p>
              <button className="mt-4 bg-cta text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-500 transition">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-6 mt-8 bg-accent text-sm text-primary">
        ©2024 Holidaze
      </footer>
    </main>
  );
}

export default Home;
