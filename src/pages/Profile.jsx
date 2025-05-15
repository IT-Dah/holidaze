import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { getVenuesByProfile } from "../api/venues";

import myVenuesIcon from "../assets/icons/home.png";
import addVenueIcon from "../assets/icons/home-plus.png";
import bookingsIcon from "../assets/icons/calendar.png";
import editIcon from "../assets/icons/edit.png";

function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("venues");
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const data = await getVenuesByProfile(user.name);
        setVenues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (user) fetchVenues();
  }, [user]);

  if (!user) return <p className="text-center py-12">Loading user...</p>;

  return (
    <main className="bg-white min-h-screen font-body text-primary">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="bg-accent p-6 rounded-xl shadow-md text-center w-full md:w-60">
          <div className="mb-4">
            <img
              src={user.avatar?.url || "https://placehold.co/100x100?text=User"}
              alt={user.avatar?.alt || "Profile avatar"}
              className="w-24 h-24 mx-auto rounded-full border"
            />
          </div>

          <h2 className="text-lg font-bold">{user.name}</h2>
          <p className="text-sm text-gray-700 break-words">{user.email}</p>

          <nav className="space-y-2 text-left mt-6">
            <button onClick={() => setActiveTab("venues")} className="flex items-center gap-2 w-full">
              <img src={myVenuesIcon} alt="My Venues" className="h-5 w-5" />
              My Venues
            </button>

            <button onClick={() => setActiveTab("bookings")} className="flex items-center gap-2 w-full">
              <img src={bookingsIcon} alt="Bookings" className="h-5 w-5" />
              Bookings
            </button>

            <Link to="/create" className="flex items-center gap-2 w-full">
              <img src={addVenueIcon} alt="Add Venue" className="h-5 w-5" />
              Add Venue
            </Link>
          </nav>

          <div className="mt-10">
            <Link to="/edit-profile" className="block">
              <img src={editIcon} alt="Edit Profile" className="h-5 w-5 mx-auto" />
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          <h2 className="text-2xl font-heading font-bold mb-6">
            {activeTab === "venues" ? "My Venues" : "My Bookings"}
          </h2>

          {/* Show venues */}
          {activeTab === "venues" && (
            <>
              {loading && <p>Loading venues...</p>}
              {error && <p className="text-red-600">{error}</p>}
              {!loading && venues.length === 0 && <p>No venues found.</p>}
              <ul className="grid gap-4">
                {venues.map((venue) => (
                  <li key={venue.id} className="p-4 border rounded bg-[#F3FBFA]">
                    <h3 className="font-semibold">{venue.name}</h3>
                    <p className="text-sm text-gray-600">
                      {venue.location?.city || "No location"}
                    </p>
                    <p className="text-sm">NOK {venue.price},-</p>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Bookings placeholder */}
          {activeTab === "bookings" && (
            <p className="text-gray-600">This is where your bookings will go.</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default Profile;
