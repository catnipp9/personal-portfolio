import Image from "next/image";
import { NavBar } from '@/app/components/NavBar';
import { Banner } from '@/app/components/Banner';
import { AboutMe } from '@/app/components/AboutMe';
import { Skills } from '@/app/components/Skills';
import { Projects } from '@/app/components/Projects';
import { Contact } from '@/app/components/Contact';
import { Footer } from '@/app/components/Footer';


export default function Home() {
  return (
    <div className="App">
      <NavBar /> 
      <Banner />    
      <AboutMe />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
