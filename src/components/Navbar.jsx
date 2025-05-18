// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/holidaze-logo.png";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const avatarUrl = user?.avatar?.url || "https://placehold.co/40x40?text=?";

  return (
    <header className="bg-accent text-primary px-6 py-4 shadow">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="h-12 sm:h-16 lg:h-20">
          <img src={logo} alt="Holidaze logo" className="h-14 sm:h-16 md:h-20 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          <Link to="/">Home</Link>
          <Link to="/venues">Venues</Link>

          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <span>Profile</span>
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Log Out
              </button>
            </>
          ) : (
            <Link to="/auth" className="hover:underline">Log In / Sign Up</Link>
          )}
        </nav>

        {/* Hamburger for Mobile */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <nav className="md:hidden px-6 pt-2 pb-4 space-y-2 text-sm font-medium bg-accent">
          <Link to="/">Home</Link>
          <Link to="/venues">Venues</Link>

          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-6 h-6 rounded-full object-cover border"
                />
                <span>Profile</span>
              </Link>
              <button onClick={handleLogout} className="block">Log Out</button>
            </>
          ) : (
            <Link to="/auth" className="block">Log In / Sign Up</Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
