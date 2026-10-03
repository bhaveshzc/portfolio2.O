import FeaturedProjects from "../components/FeaturedProjects";
import ContactSection from "../components/ContactSection";
import "./Pages.css";

export default function ProjectsPage() {
  return (
    <main className="dedicated-page-container">
      <FeaturedProjects />
      <ContactSection />
    </main>
  );
}

