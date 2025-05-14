import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here when needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
