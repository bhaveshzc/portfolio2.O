import AboutMe from "../components/AboutMe";
import Experience from "../components/Experience";
import ContactSection from "../components/ContactSection";
import "./Pages.css";

export default function JourneyPage() {
  return (
    <main className="dedicated-page-container">
      <AboutMe />
      <Experience />
      <ContactSection />
    </main>
  );
}

