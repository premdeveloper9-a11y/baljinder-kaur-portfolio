import React from "react";
import "./Home.css";
import PetCTScanner from "../PetCTScanner/PetCTScanner";
import TypingEffect from "react-typing-effect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { toast } from "sonner";
import ResumeToast from "../ResumeToast/ResumeToast";

// IMPORTANT:
// Yahan apne existing PET-CT 3D component ka path/name use kar.
// Agar tera component ka naam PetCTScanner hai to ye import correct rahega.


function Home() {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".line1", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    tl.from(".line2", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    tl.from(".line3", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    tl.from(".introText", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    });

    tl.from(".professionalTag", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    tl.from(".heroButtons", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.from(".scanner-wrapper", {
      x: 150,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  const handleDownload = () => {
    toast.custom((id) => (
      <ResumeToast
        onComplete={() => {
          toast.dismiss(id);

          const link = document.createElement("a");
          link.href = "/Baljinder_Kaur_CV.pdf";
          link.download = "Baljinder_Kaur_CV.pdf";
          link.click();
        }}
      />
    ));
  };

  const handleJourney = () => {
    document
      .getElementById("experience")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContact = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home">

      {/* ================= LEFT SIDE ================= */}
      <div className="lefthome">

        <div className="homedetails">

          <div className="line1">
            HEALTHCARE OPERATIONS
          </div>

          <div className="line2">
            BALJINDER KAUR
          </div>

          <div className="line3">
            <TypingEffect
              text={[
                "FLOOR MANAGER",
                "RADIOLOGY & NUCLEAR MEDICINE OPERATIONS",
                "DIAGNOSTIC IMAGING OPERATIONS",
                "HEALTHCARE OPERATIONS PROFESSIONAL",
              ]}
              speed={70}
              eraseSpeed={35}
              eraseDelay={1800}
              typingDelay={500}
              cursor="|"
            />
          </div>

        <p className="introText">
  Dedicated healthcare professional with hands-on experience in
  <span> Radiology, Nuclear Medicine</span> and
  Diagnostic Imaging operations. Skilled in managing
  <span> PET-CT, CT, MRI, Mammography</span> and X-Ray workflows
  while ensuring smooth patient coordination, team supervision
  and quality-driven care.
</p>

          <div className="professionalTag">
            <span></span>
            MBA — HOSPITAL &amp; HEALTHCARE MANAGEMENT
            <small>PURSUING</small>
          </div>

          <div className="heroButtons">

            <button
              className="primaryBtn cursor-target"
              onClick={handleJourney}
            >
              Professional Journey
            </button>

           <button className="secondaryBtn cursor-target" onClick={handleContact}>
  Book Your Test
</button>

          </div>

         <button className="resumeBtn cursor-target" onClick={handleDownload}>
  <span>Download Resume</span>
  <span className="resumeArrow">↓</span>
</button>

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="righthome">

        <div className="scanner-wrapper">

          {/* Existing 3D PET-CT Scanner */}
          <PetCTScanner />

        </div>

      </div>

    </section>
  );
}

export default Home;