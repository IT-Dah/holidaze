import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/holidaze-logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-accent text-primary px-6 py-4 shadow">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="h-12 sm:h-16 lg:h-20">
          <img
            src={logo}
            alt="Holidaze logo"
            className="h-14 sm:h-16 md:h-20 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/venues">Venues</Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={logout} className="hover:underline">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="hover:underline">
                Log In
              </Link>
              <Link to="/auth" className="hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden px-6 pt-2 pb-4 space-y-2 text-sm font-medium bg-accent">
          <Link to="/" className="block" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/venues" className="block" onClick={() => setIsOpen(false)}>
            Venues
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="block" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="block" onClick={() => setIsOpen(false)}>
                Log In
              </Link>
              <Link to="/auth" className="block" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
