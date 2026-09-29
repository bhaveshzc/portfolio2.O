import Hero from "../components/hero";
import Introduction from "../components/Introduction";
import ContactSection from "../components/ContactSection";

export default function HomePage() {
  return (
    <main className="home-page-container">
      <Hero />
      <Introduction />
      <ContactSection />
    </main>
  );
}
