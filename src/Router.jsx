import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes later here */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;