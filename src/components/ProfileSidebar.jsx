import { Link } from "react-router-dom";
import myVenuesIcon from "../assets/icons/home.png";
import addVenueIcon from "../assets/icons/home-plus.png";
import bookingsIcon from "../assets/icons/calendar.png";
import editIcon from "../assets/icons/edit.png";

function ProfileSidebar({ user, activeTab, setActiveTab }) {
  const isManager = user?.venueManager;

  return (
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
        {isManager ? (
          <>
            <button
              onClick={() => setActiveTab("venues")}
              className={`flex items-center gap-2 w-full ${activeTab === "venues" ? "font-bold" : ""}`}
            >
              <img src={myVenuesIcon} alt="My Venues" className="h-5 w-5" />
              My Venues
            </button>

            <Link to="/create" className="flex items-center gap-2 w-full">
              <img src={addVenueIcon} alt="Add Venue" className="h-5 w-5" />
              Add Venue
            </Link>

            {/* Optional future feature:
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex items-center gap-2 w-full ${activeTab === "bookings" ? "font-bold" : ""}`}
            >
              <img src={bookingsIcon} alt="Venue Bookings" className="h-5 w-5" />
              Venue Bookings
            </button>
            */}
          </>
        ) : (
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 w-full ${activeTab === "bookings" ? "font-bold" : ""}`}
          >
            <img src={bookingsIcon} alt="My Bookings" className="h-5 w-5" />
            My Bookings
          </button>
        )}
      </nav>

      <div className="mt-10">
        <Link to="/edit-profile" className="block">
          <img src={editIcon} alt="Edit Profile" className="h-5 w-5 mx-auto" />
        </Link>
      </div>
    </aside>
  );
}

export default ProfileSidebar;
