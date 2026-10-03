import ServicesHero from "../components/ServicesHero";
import ContactSection from "../components/ContactSection";
import "./Pages.css";

export default function ServicesPage() {
  return (
    <main className="services-page-container">
      <ServicesHero />
      <ContactSection />
    </main>
  );
}
