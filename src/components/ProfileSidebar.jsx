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
      <div className="mb-5 flex flex-col items-center">
        <img
          src={avatarUrl}
          alt={avatarAlt}
          className="w-24 h-24 rounded-full border object-cover mb-2"
        />
        <h2 className="text-lg font-bold break-words">{user.name}</h2>
        <p className="text-sm text-gray-700 break-words">{user.email}</p>
      </div>

      <nav className="mt-4 space-y-2 w-full flex flex-col items-center" aria-label="Profile Navigation">
        {isManager ? (
          <>
            <SidebarButton
              label="My Venues"
              icon={myVenuesIcon}
              active={activeTab === "venues"}
              onClick={() => setActiveTab("venues")}
            />
            <SidebarButton
              label="Venue Bookings"
              icon={bookingsIcon}
              active={activeTab === "venue-bookings"}
              onClick={() => setActiveTab("venue-bookings")}
            />
            <Link
              to="/create"
              className="flex items-center gap-2 w-full max-w-[200px] justify-center px-3 py-2 rounded-md hover:underline text-sm"
            >
              <img src={addVenueIcon} alt="" className="h-5 w-5" />
              Add Venue
            </Link>
          </>
        ) : (
          <SidebarButton
            label="My Bookings"
            icon={bookingsIcon}
            active={activeTab === "bookings"}
            onClick={() => setActiveTab("bookings")}
          />
        )}
      </nav>

      <div className="mt-10">
        <Link to="/edit-profile" className="block">
          <img src={editIcon} alt="Edit Profile" className="h-5 w-5 opacity-70 hover:opacity-100 transition" />
        </Link>
      </div>
    </aside>
  );
}

function SidebarButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full max-w-[200px] justify-center px-3 py-2 rounded-md text-sm transition ${
        active ? "bg-white/30 font-semibold" : "hover:bg-white/20"
      }`}
      type="button"
    >
      <img src={icon} alt="" className="h-5 w-5" />
      {label}
    </button>
  );
}

export default ProfileSidebar;
