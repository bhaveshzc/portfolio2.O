import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClickSpark from "./components/ClickSpark";
import Navbar from "./components/navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import JourneyPage from "./pages/JourneyPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <div className="portfolio-app-root">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/journey" element={<JourneyPage />} />
              <Route path="/about" element={<JourneyPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <Footer />
          </div>
        </ClickSpark>
      </BrowserRouter>
  );
}

export default App;
