import ServicesHero from "../components/ServicesHero";
import ServicesWhatIDo from "../components/ServicesWhatIDo";
import ServicesHowIWork from "../components/ServicesHowIWork";
import ContactSection from "../components/ContactSection";
import "./Pages.css";

export default function ServicesPage() {
  return (
    <main className="services-page-container">
      <ServicesHero />
      <ServicesWhatIDo />
      <ServicesHowIWork />
      <ContactSection />
    </main>
  );
}
