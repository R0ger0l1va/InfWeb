import Navbar from "@/src/components/Landing/Navbar";
import Hero from "@/src/components/Landing/Hero";
import Excellence from "@/src/components/Landing/Excellence";
import CareerPaths from "@/src/components/Landing/CareerPaths";
import FacultyEvents from "@/src/components/Landing/FacultyEvents";
import Gallery from "@/src/components/Landing/Gallery";
import FAQ from "@/src/components/Landing/FAQ";
import Footer from "@/src/components/Landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-cujae-yellow/30">
      <Navbar />
      <Hero />
      <Excellence />
      <CareerPaths />
      <FacultyEvents />
      <Gallery />
      <FAQ />
      <Footer />
    </main>
  );
}
