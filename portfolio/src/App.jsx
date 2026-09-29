import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import JourneyPage from "./pages/JourneyPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="portfolio-app-root">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/about" element={<JourneyPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
