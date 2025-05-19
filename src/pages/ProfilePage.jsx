import { useAuth } from "../context/AuthContext";
import ProfileSidebar from "../components/ProfileSidebar";
import MyVenues from "../components/MyVenues";
import MyBookings from "../components/MyBookings";
import VenueBookings from "../components/VenueBookings";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ProfilePage() {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("venues");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) setActiveTab(tab);
  }, [location]);

  if (!user) {
    return (
      <div className="min-h-screen font-body text-primary bg-white flex items-center justify-center">
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-body text-primary">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="w-full md:flex-1">
          {user.venueManager ? (
            activeTab === "venues" ? <MyVenues /> : <VenueBookings />
          ) : (
            <MyBookings />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
