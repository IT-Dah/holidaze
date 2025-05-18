import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProfilePage from "./pages/ProfilePage";
import CreateVenue from "./pages/CreateVenue";
import EditVenue from "./pages/EditVenue";
import VenueDetails from "./pages/VenueDetails"; // ✅ new
import ProtectedRoute from "./components/ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateVenue />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditVenue />
              </ProtectedRoute>
            }
          />

          <Route path="/venues/:id" element={<VenueDetails />} /> {/* ✅ ADDED */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
