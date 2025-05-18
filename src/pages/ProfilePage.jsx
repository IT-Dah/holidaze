import { useAuth } from "../context/AuthContext";
import ProfileSidebar from "../components/ProfileSidebar";
import MyVenues from "../components/MyVenues";
import MyBookings from "../components/MyBookings";

function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="min-h-screen font-body text-primary bg-white flex items-center justify-center">
        <p>You must be logged in to view this page.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white font-body text-primary">
      <div className="max-w-7xl mx-auto px-4 py-8 md:flex gap-8">
        <ProfileSidebar user={user} />
        <div className="flex-1">
          {user.venueManager ? <MyVenues /> : <MyBookings />}
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
