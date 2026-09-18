import React, { useRef } from "react";
import "./Experience.css";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FaRadiation,
  FaUserCheck,
  FaUsers,
  FaShieldAlt,
  FaClipboardCheck,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

function Experience() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".experience-eyebrow", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".experience-heading", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".experience-main", {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-main",
          start: "top 80%",
        },
      });

      gsap.from(".responsibility-item", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".responsibilities",
          start: "top 82%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      className="experience-section"
      ref={sectionRef}
    >
      <div className="experience-container">

        {/* HEADER */}

        <div className="experience-eyebrow">
          <span></span>
          PROFESSIONAL EXPERIENCE
        </div>

        <div className="experience-heading">
          <h2>
            EXPERIENCE
            <span> THAT MOVES</span>
            <br />
            <span>HEALTHCARE FORWARD.</span>
          </h2>

          <p>
            Managing diagnostic imaging operations with a focus on
            efficient workflow, patient care, team coordination and
            quality standards.
          </p>
        </div>

        {/* MAIN EXPERIENCE */}

        <div className="experience-main">

          {/* LEFT INFO */}

          <div className="experience-info">

            <div className="experience-date">
              <span className="date-line"></span>
              PRESENT
            </div>

            <div className="experience-role">
              <span>01</span>

              <h3>FLOOR MANAGER</h3>

              <h4>
                RADIOLOGY & NUCLEAR MEDICINE OPERATIONS
              </h4>

              <div className="experience-company">
                JANTA X-RAY CLINIC PVT. LTD.
              </div>
            </div>

            <div className="experience-description">
              <p>
                Managing day-to-day operations across Radiology,
                Nuclear Medicine and Diagnostic Imaging departments,
                ensuring smooth coordination between patients,
                doctors, technicians and reporting teams.
              </p>
            </div>

            <div className="experience-specialties">

              <span>PET-CT</span>
              <span>CT</span>
              <span>MRI</span>
              <span>MAMMOGRAPHY</span>
              <span>X-RAY</span>

            </div>

          </div>

          {/* RIGHT VISUAL */}

          <div className="experience-visual">

            <div className="scanner-ring ring-one"></div>
            <div className="scanner-ring ring-two"></div>
            <div className="scanner-ring ring-three"></div>

            <div className="scanner-core">

              <div className="scanner-inner">
                <FaRadiation />
              </div>

              <div className="scanner-label">
                <span>IMAGING</span>
                <strong>SYSTEM</strong>
              </div>

            </div>

            <div className="scanner-cross horizontal"></div>
            <div className="scanner-cross vertical"></div>
            
            <div className="visual-status">
              <span></span>
              RADIOLOGY OPERATIONS
            </div>

          </div>

        </div>

        {/* RESPONSIBILITIES */}

        <div className="responsibilities">

          <div className="responsibilities-header">
            <small>ROLE RESPONSIBILITIES</small>
            <span>05 / 07</span>
          </div>

          <div className="responsibilities-grid">

            <div className="responsibility-item">
              <div className="responsibility-icon">
                <FaRadiation />
              </div>

              <div>
                <small>01</small>
                <h4>IMAGING WORKFLOW</h4>
                <p>
                  Managing PET-CT, CT, MRI, Mammography and X-Ray
                  departmental workflow.
                </p>
              </div>
            </div>

            <div className="responsibility-item">
              <div className="responsibility-icon">
                <FaUserCheck />
              </div>

              <div>
                <small>02</small>
                <h4>PATIENT COORDINATION</h4>
                <p>
                  Coordinating scheduling, patient support and
                  smooth movement through the imaging process.
                </p>
              </div>
            </div>

            <div className="responsibility-item">
              <div className="responsibility-icon">
                <FaUsers />
              </div>

              <div>
                <small>03</small>
                <h4>TEAM MANAGEMENT</h4>
                <p>
                  Managing staff coordination, training and
                  departmental discipline.
                </p>
              </div>
            </div>

            <div className="responsibility-item">
              <div className="responsibility-icon">
                <FaShieldAlt />
              </div>

              <div>
                <small>04</small>
                <h4>QUALITY & SAFETY</h4>
                <p>
                  Maintaining NABH quality standards and patient
                  safety protocols.
                </p>
              </div>
            </div>

            <div className="responsibility-item">
              <div className="responsibility-icon">
                <FaClipboardCheck />
              </div>

              <div>
                <small>05</small>
                <h4>OPERATIONS SUPPORT</h4>
                <p>
                  Handling billing coordination, report dispatch
                  and overall departmental efficiency.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* EXPERIENCE FOOTER */}

        <div className="experience-footer">

          <span>PRECISION</span>
          <i></i>

          <span>PATIENT CARE</span>
          <i></i>

          <span>TEAMWORK</span>
          <i></i>

          <span>QUALITY</span>
          <i></i>

          <span>EFFICIENCY</span>

        </div>

      </div>
    </section>
  );
}

export default Experience;