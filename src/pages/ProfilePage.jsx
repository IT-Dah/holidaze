import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProfileSidebar from "../components/ProfileSidebar";
import MyVenues from "../components/MyVenues";
import MyBookings from "../components/MyBookings";

function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("venues"); // 'venues' | 'bookings'

  if (!user) return <p className="text-center mt-10">You must be logged in to view this page.</p>;

  return (
    <main className="min-h-screen bg-white font-body text-primary">
      <div className="max-w-7xl mx-auto px-4 py-8 md:flex gap-8">
        <ProfileSidebar user={user} setActiveTab={setActiveTab} activeTab={activeTab} />
        <div className="flex-1">
          {activeTab === "venues" ? <MyVenues /> : <MyBookings />}
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
