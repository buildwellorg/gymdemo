import Hero from "@/components/sections/Hero";
import Membership from "@/components/sections/Membership";
import Equipment from "@/components/sections/Equipment";
import Classes from "@/components/sections/Classes";
import Trainers from "@/components/sections/Trainers";
import Testimonials from "@/components/sections/Testimonials";
import Location from "@/components/sections/Location";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Membership />
      <Equipment />
      <Classes />
      <Trainers />
      <Testimonials />
      <Location />
      <Contact />
    </main>
  );
}
