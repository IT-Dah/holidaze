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

  return (
    <header className="bg-accent text-primary px-6 py-4 shadow">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="h-12 sm:h-16 lg:h-20">
          <img src={logo} alt="Holidaze logo" className="h-14 sm:h-16 md:h-20 w-auto" />
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          <Link to="/">Home</Link>

          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="hover:underline">
                Log Out
              </button>
            </>
          ) : (
            <Link to="/auth" className="hover:underline">Log In / Sign Up</Link>
          )}
        </nav>

        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden px-6 pt-2 pb-4 space-y-2 text-sm font-medium bg-accent">
          <Link to="/">Home</Link>

          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="block">
                Log Out
              </button>
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
