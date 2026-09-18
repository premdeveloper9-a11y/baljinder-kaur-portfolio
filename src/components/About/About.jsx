import React from "react";
import "./About.css";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FaUserDoctor,
  FaLungs,
  FaBrain,
  FaShieldHeart,
} from "react-icons/fa6";

import {
  MdLocalHospital,
  MdOutlineHealthAndSafety,
} from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

function About() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 72%",
      },
    });

    tl.from(".aboutEyebrow", {
      opacity: 0,
      y: 25,
      duration: 0.6,
      ease: "power2.out",
    })
      .from(
        ".aboutHeading",
        {
          opacity: 0,
          y: 45,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.35"
      )
      .from(
        ".aboutDescription",
        {
          opacity: 0,
          y: 25,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.45"
      )
      .from(
        ".profilePanel",
        {
          opacity: 0,
          x: -60,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.25"
      );

    gsap.from(".expertiseCard", {
      opacity: 0,
      y: 45,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".expertiseGrid",
        start: "top 80%",
      },
    });

    gsap.from(".medicalStrip div", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".medicalStrip",
        start: "top 88%",
      },
    });
  }, []);

  return (
    <section id="about">
      {/* BACKGROUND MEDICAL GEOMETRY */}
      <div className="aboutGrid"></div>

      <div className="aboutScanCircle aboutScanCircleOne"></div>
      <div className="aboutScanCircle aboutScanCircleTwo"></div>

      <div className="aboutCross aboutCrossOne"></div>
      <div className="aboutCross aboutCrossTwo"></div>

      {/* HEADER */}
      <div className="aboutHeader">
        <div className="aboutEyebrow">
          <span></span>
          PROFESSIONAL PROFILE
        </div>

        <h1 className="aboutHeading">
          BEYOND THE <strong>SCAN</strong>
        </h1>

        <p className="aboutDescription">
          Where advanced diagnostic imaging meets precision,
          patient care and operational excellence.
        </p>
      </div>

      <div className="aboutMedicalGrid">
        {/* PROFILE PANEL */}
        <div className="profilePanel">
          <div className="panelCorner panelCornerTL"></div>
          <div className="panelCorner panelCornerBR"></div>

          <div className="panelTop">
            <div>
              <span className="panelLabel">PROFESSIONAL ID</span>

              <h2>
                BALJINDER
                <br />
                KAUR
              </h2>
            </div>

            <div className="statusIndicator">
              <span></span>
              ACTIVE
            </div>
          </div>

          <div className="profileRole">
            <div className="profileRoleIcon">
              <FaUserDoctor />
            </div>

            <div>
              <span>CURRENT ROLE</span>

              <strong>FLOOR MANAGER</strong>

              <p>Radiology &amp; Nuclear Medicine Operations</p>
            </div>
          </div>

          <div className="profileDivider"></div>

          <div className="profileInfoGrid">
            <div>
              <span>LOCATION</span>
              <strong>NEW DELHI</strong>
            </div>

            <div>
              <span>DOMAIN</span>
              <strong>DIAGNOSTIC IMAGING</strong>
            </div>

            <div>
              <span>EXPERIENCE</span>
              <strong>HEALTHCARE OPS</strong>
            </div>

            <div>
              <span>FOCUS</span>
              <strong>PATIENT CARE</strong>
            </div>
          </div>

          <div className="profileFooter">
            <MdOutlineHealthAndSafety />

            <span>QUALITY • SAFETY • PRECISION</span>
          </div>
        </div>

        {/* EXPERTISE AREA */}
        <div className="expertiseArea">
          <div className="sectionMiniTitle">
            <span></span>
            CLINICAL &amp; OPERATIONAL EXPERTISE
          </div>

          <div className="expertiseGrid">
            {/* PET / CT */}
            <div className="expertiseCard featured">
              <span className="cardScanLine"></span>

              <div className="expertiseIcon">
                <MdLocalHospital />
              </div>

              <div className="cardIndex">01</div>

              <h3>PET / CT</h3>

              <p>
                PET-CT workflow operations, patient coordination and smooth
                diagnostic imaging management.
              </p>

              <div className="cardLine"></div>

              <span>NUCLEAR MEDICINE</span>
            </div>

            {/* MRI */}
            <div className="expertiseCard">
              <span className="cardScanLine"></span>

              <div className="expertiseIcon">
                <FaBrain />
              </div>

              <div className="cardIndex">02</div>

              <h3>MRI</h3>

              <p>
                MRI workflow coordination with focus on efficient patient
                movement and department operations.
              </p>

              <div className="cardLine"></div>

              <span>IMAGING OPERATIONS</span>
            </div>

            {/* CT SCAN */}
            <div className="expertiseCard">
              <span className="cardScanLine"></span>

              <div className="expertiseIcon">
                <MdLocalHospital />
              </div>

              <div className="cardIndex">03</div>

              <h3>CT SCAN</h3>

              <p>
                Coordinating CT scan workflows and supporting smooth
                communication between clinical teams.
              </p>

              <div className="cardLine"></div>

              <span>RADIOLOGY</span>
            </div>

            {/* PATIENT CARE */}
            <div className="expertiseCard">
              <span className="cardScanLine"></span>

              <div className="expertiseIcon">
                <FaShieldHeart />
              </div>

              <div className="cardIndex">04</div>

              <h3>PATIENT CARE</h3>

              <p>
                Patient support, scheduling, billing coordination and improved
                diagnostic experience.
              </p>

              <div className="cardLine"></div>

              <span>PATIENT EXPERIENCE</span>
            </div>

            {/* X-RAY & MAMMOGRAPHY */}
            <div className="expertiseCard">
              <span className="cardScanLine"></span>

              <div className="expertiseIcon">
                <FaLungs />
              </div>

              <div className="cardIndex">05</div>

              <h3>X-RAY &amp; MAMMOGRAPHY</h3>

              <p>
                Department workflow management and coordination across
                diagnostic imaging services.
              </p>

              <div className="cardLine"></div>

              <span>DIAGNOSTIC SERVICES</span>
            </div>

            {/* TEAM LEADERSHIP */}
            <div className="expertiseCard">
              <span className="cardScanLine"></span>

              <div className="expertiseIcon">
                <FaUserDoctor />
              </div>

              <div className="cardIndex">06</div>

              <h3>TEAM LEADERSHIP</h3>

              <p>
                Coordinating doctors, technicians and reporting teams for
                efficient departmental workflow.
              </p>

              <div className="cardLine"></div>

              <span>OPERATIONS MANAGEMENT</span>
            </div>
          </div>
        </div>
      </div>

      {/* MEDICAL DOMAIN STRIP */}
      <div className="medicalStrip">
        <div>
          <span>01</span>
          RADIOLOGY
        </div>

        <div>
          <span>02</span>
          NUCLEAR MEDICINE
        </div>

        <div>
          <span>03</span>
          PATIENT SAFETY
        </div>

        <div>
          <span>04</span>
          NABH QUALITY
        </div>

        <div>
          <span>05</span>
          HEALTHCARE OPERATIONS
        </div>
      </div>
    </section>
  );
}

export default About;