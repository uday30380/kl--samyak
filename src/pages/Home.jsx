import Hero from '../components/Hero/Hero';
import AboutSection from '../components/About/AboutSection';
import EventsSection from '../components/Events/EventsSection';
import SponsorsSection from '../components/Sponsors/SponsorsSection';
import ContactSection from '../components/Contact/ContactSection';

export default function Home() {
  return (
    <div className="w-full relative">
      {/* Official SAMYAK 2026 Cinematic Video Hero */}
      <Hero />

      {/* About Section */}
      <AboutSection showLink={true} />

      {/* Flagship Events Section (3D Holographic Arena) */}
      <EventsSection limit={6} showFilter={true} showViewAll={true} isHomePage={true} />

      {/* Ecosystem Sponsors */}
      <SponsorsSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
