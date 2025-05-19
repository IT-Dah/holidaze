function Footer() {
  return (
    <footer className="bg-accent text-primary py-6 mt-12" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-body">
        <p>&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</p>
        <nav aria-label="Footer Navigation">
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
