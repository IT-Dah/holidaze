import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateVenue from "./pages/CreateVenue"; // ✅ THIS WAS MISSING
import ProtectedRoute from "./components/ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected route example */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateVenue />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
