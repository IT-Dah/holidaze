function Home() {
  return (
    <main className="min-h-screen bg-background text-primary p-8">
      <section className="text-center py-16">
        <h1 className="text-4xl font-heading mb-4">Tailwind is working!</h1>
        <p className="text-lg font-body text-gray-700">Search from cozy cabins to city escapes</p>
        <input
          type="text"
          placeholder="Search..."
          className="mt-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cta"
        />
      </section>
    </main>
  );
}

export default Home;
