import React, { useRef } from "react";
import "./Achievements.css";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FaAward,
  FaUserGroup,
  FaChartLine,
  FaHeartPulse,
} from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

function Achievements() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      // Eyebrow animation
      gsap.from(".achievement-eyebrow", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      // Heading animation
      gsap.from(".achievement-heading", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      // Cards animation
      gsap.from(".achievement-card", {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".achievement-grid",
          start: "top 80%",
          once: true,
        },
      });

      // Radiation visual animation
      gsap.from(".recognition-visual", {
        scale: 0.88,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".recognition-visual",
          start: "top 80%",
          once: true,
        },
      });
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      id="achievements"
      className="achievements-section"
      ref={sectionRef}
    >
      <div className="achievements-container">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="achievement-eyebrow">
          <span></span>
          PROFESSIONAL RECOGNITION
        </div>

        <div className="achievement-heading">
          <h2>
            RECOGNIZED FOR
            <span> PRECISION.</span>
            <br />
            BUILT ON <span>TRUST.</span>
          </h2>

          <p>
            Professional recognition built through leadership,
            operational efficiency, patient care and consistent
            commitment to quality.
          </p>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="achievement-main">
          {/* ===================================================
              LEFT — ACHIEVEMENT CARDS
          ==================================================== */}

          <div className="achievement-grid">
            {/* CARD 01 */}

            <article className="achievement-card featured">
              <div className="achievement-card-top">
                <span>01</span>

                <div className="achievement-icon">
                  <FaAward />
                </div>
              </div>

              <div className="achievement-content">
                <small>PROFESSIONAL APPRECIATION</small>

                <h3>GE HEALTHCARE</h3>

                <p>
                  Received appreciation from GE Healthcare for
                  professional contribution and performance.
                </p>
              </div>

              <div className="achievement-card-footer">
                <span>RECOGNITION</span>
                <i></i>
              </div>
            </article>

            {/* CARD 02 */}

            <article className="achievement-card">
              <div className="achievement-card-top">
                <span>02</span>

                <div className="achievement-icon">
                  <FaUserGroup />
                </div>
              </div>

              <div className="achievement-content">
                <small>LEADERSHIP</small>

                <h3>TEAM LEADERSHIP</h3>

                <p>
                  Recognized for leadership, multitasking and
                  effective coordination across healthcare teams.
                </p>
              </div>

              <div className="achievement-card-footer">
                <span>LEADERSHIP</span>
                <i></i>
              </div>
            </article>

            {/* CARD 03 */}

            <article className="achievement-card">
              <div className="achievement-card-top">
                <span>03</span>

                <div className="achievement-icon">
                  <FaChartLine />
                </div>
              </div>

              <div className="achievement-content">
                <small>OPERATIONAL PERFORMANCE</small>

                <h3>HIGH-VOLUME OPERATIONS</h3>

                <p>
                  Successfully managed high-patient-volume
                  diagnostic imaging operations while maintaining
                  smooth departmental workflow.
                </p>
              </div>

              <div className="achievement-card-footer">
                <span>EFFICIENCY</span>
                <i></i>
              </div>
            </article>

            {/* CARD 04 */}

            <article className="achievement-card">
              <div className="achievement-card-top">
                <span>04</span>

                <div className="achievement-icon">
                  <FaHeartPulse />
                </div>
              </div>

              <div className="achievement-content">
                <small>PATIENT EXPERIENCE</small>

                <h3>QUALITY PATIENT CARE</h3>

                <p>
                  Consistently focused on patient satisfaction,
                  smooth coordination and quality healthcare
                  service delivery.
                </p>
              </div>

              <div className="achievement-card-footer">
                <span>PATIENT CARE</span>
                <i></i>
              </div>
            </article>
          </div>

          {/* ===================================================
              RIGHT — CLEAN RADIATION VISUAL
          ==================================================== */}

          <div className="recognition-visual">
            {/* Soft background halo */}
            <div className="radiation-halo"></div>

            {/* Minimal energy rings */}
            <div className="radiation-ring radiation-ring-one"></div>
            <div className="radiation-ring radiation-ring-two"></div>
            <div className="radiation-ring radiation-ring-three"></div>

            {/* Rotating radiation beam */}
            <div className="radiation-beam">
              <span></span>
            </div>

            {/* Center achievement badge */}
            <div className="radiation-core">
              <div className="radiation-core-glow"></div>

              <div className="radiation-badge">
                <FaAward />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM STRIP
        ====================================================== */}

        <div className="achievement-strip">
          <div>
            <span>01</span>
            LEADERSHIP
          </div>

          <div>
            <span>02</span>
            MULTITASKING
          </div>

          <div>
            <span>03</span>
            PATIENT CARE
          </div>

          <div>
            <span>04</span>
            QUALITY
          </div>

          <div>
            <span>05</span>
            EFFICIENCY
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievements;