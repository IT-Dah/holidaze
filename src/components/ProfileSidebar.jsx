import { Link } from "react-router-dom";
import myVenuesIcon from "../assets/icons/home.png";
import addVenueIcon from "../assets/icons/home-plus.png";
import bookingsIcon from "../assets/icons/calendar.png";
import editIcon from "../assets/icons/edit.png";
import { useAuth } from "../context/AuthContext";

function ProfileSidebar({ activeTab, setActiveTab }) {
  const { user } = useAuth();
  const isManager = user?.venueManager;
  const avatarUrl =
    user?.avatar?.url || user?.avatar || "https://placehold.co/100x100?text=User";
  const avatarAlt = user?.avatar?.alt || "Profile avatar";

  return (
    <aside className="bg-accent p-6 rounded-xl shadow-md text-center w-full md:w-60 flex flex-col items-center">
      <div className="mb-4">
        <img
          src={avatarUrl}
          alt={avatarAlt}
          className="w-24 h-24 rounded-full border object-cover"
        />
      </div>

      <h2 className="text-lg font-bold break-words">{user.name}</h2>
      <p className="text-sm text-gray-700 break-words">{user.email}</p>

      <nav className="mt-6 space-y-3 w-full flex flex-col items-center">
        {isManager ? (
          <>
            <button
              onClick={() => setActiveTab("venues")}
              className={`flex items-center gap-2 w-full max-w-[200px] justify-center px-3 py-2 rounded-md ${
                activeTab === "venues" ? "font-bold bg-white/30" : ""
              }`}
            >
              <img src={myVenuesIcon} alt="My Venues" className="h-5 w-5" />
              My Venues
            </button>

            <button
              onClick={() => setActiveTab("venue-bookings")}
              className={`flex items-center gap-2 w-full max-w-[200px] justify-center px-3 py-2 rounded-md ${
                activeTab === "venue-bookings" ? "font-bold bg-white/30" : ""
              }`}
            >
              <img src={bookingsIcon} alt="Venue Bookings" className="h-5 w-5" />
              Venue Bookings
            </button>

            <div className="w-full flex justify-center md:justify-start">
              <Link
                to="/create"
                className="flex items-center gap-2 max-w-[200px] justify-center px-3 py-2 rounded-md hover:underline"
              >
                <img src={addVenueIcon} alt="Add Venue" className="h-5 w-5" />
                Add Venue
              </Link>
            </div>
          </>
        ) : (
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 w-full max-w-[200px] justify-center px-3 py-2 rounded-md ${
              activeTab === "bookings" ? "font-bold bg-white/30" : ""
            }`}
          >
            <img src={bookingsIcon} alt="My Bookings" className="h-5 w-5" />
            My Bookings
          </button>
        )}
      </nav>

      <div className="my-6" />

      <Link to="/edit-profile" className="block">
        <img src={editIcon} alt="Edit Profile" className="h-5 w-5 mx-auto" />
      </Link>
    </aside>
  );
}

export default ProfileSidebar;
