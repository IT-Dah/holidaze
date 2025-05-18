import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-background text-primary font-body min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
