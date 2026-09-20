import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./GlobalSpacing.css";

import { Toaster } from "sonner";
import TargetCursor from "./components/TargetCursor/TargetCursor";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Achievements from "./components/Achievements/Achievements";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ScrollTop from "./components/ScrollTop/ScrollTop";



function Portfolio() {
  return (
    <>
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        cursorColor="#7ad7ea"
        cursorColorOnTarget="#ffffff"
        parallaxOn={true}
      />

      <Toaster
  position="top-right"
  richColors
  closeButton
  theme="dark"
/>
      <Nav />

      <Home />
      <About />
      <Experience />
      <Education />
      <Achievements />
      <Contact />
      
      <Footer />

      <ScrollTop />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;