import Image from "next/image";
import { NavBar } from '@/app/components/NavBar';
import { Banner } from '@/app/components/Banner';
import { AboutMe } from '@/app/components/AboutMe';


export default function Home() {
  return (
    <div className="App">
      <NavBar /> 
      <Banner />    
      <AboutMe />
    </div>
  );
}
