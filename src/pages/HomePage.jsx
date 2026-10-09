import Hero from "../components/hero";
import Introduction from "../components/Introduction";

export default function HomePage() {
  return (
    <main className="home-page-container">
      <Hero />
      <Introduction />
    </main>
  );
}
