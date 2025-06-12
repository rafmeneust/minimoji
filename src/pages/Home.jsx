import Hero from '../components/Hero';
import StepsDefault  from "../components/Steps";
import Pitch from "../components/Pitch";

export default function Home() {
  return (
    <>
      <Hero />
      <BlockyDivider />
      <StepsDefault />
      <Pitch />
      <Testimonials />
      <Footer />
    </>
  );
}