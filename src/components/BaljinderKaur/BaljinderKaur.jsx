import React, { useRef } from "react";
import "./BaljinderKaur.css";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FlipCard from "../FlipCard/FlipCard";

import {
  FaArrowDown,
  FaBriefcase,
  FaCertificate,
  FaGraduationCap,
  FaHeartPulse,
  FaHospitalUser,
  FaPeopleGroup,
  FaShieldHeart,
  FaStar,
} from "react-icons/fa6";

import baljinderPhoto from "../../assets/baljinder-kaur.jpg";

gsap.registerPlugin(ScrollTrigger);

function BaljinderKaur() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const experienceContainer =
        sectionRef.current?.closest(".baljinderExperience");

      gsap.from(".bk-hero-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bk-hero-heading",
          scroller: experienceContainer || window,
          start: "top 85%",
        },
      });

      gsap.from(".bk-hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bk-hero-subtitle",
          scroller: experienceContainer || window,
          start: "top 85%",
        },
      });

      gsap.from(".bk-flip-card-wrap", {
        y: 80,
        opacity: 0,
        scale: 0.92,
        duration: 1.1,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bk-flip-card-wrap",
          scroller: experienceContainer || window,
          start: "top 85%",
        },
      });

      gsap.from(".bk-section", {
        y: 70,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bk-section",
          scroller: experienceContainer || window,
          start: "top 85%",
        },
      });

      gsap.from(".bk-timeline-item", {
        x: -50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bk-timeline",
          scroller: experienceContainer || window,
          start: "top 80%",
        },
      });

      gsap.from(".bk-stat", {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".bk-stats",
          scroller: experienceContainer || window,
          start: "top 85%",
        },
      });

      ScrollTrigger.refresh();
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section className="bk-page" ref={sectionRef}>
      {/* ================= HERO ================= */}
      <div className="bk-hero">
        <div className="bk-hero-eyebrow">
          <span></span>
          PERSONAL PROFILE
          <span></span>
        </div>

        <h1 className="bk-hero-heading">
          THE WOMAN
          <br />
          <span>BEHIND THE CARE</span>
        </h1>

        <p className="bk-hero-subtitle">
          A closer look at the person, professional and journey behind
          JANTA X-RAY CLINIC.
        </p>
      </div>

      {/* ================= FLIP CARD ================= */}
      <div className="bk-photo-section">
        <div className="bk-flip-card-wrap">
          <FlipCard
            axis="y"
            flipOnClick={true}
            draggable={false}
            tilt={true}
            glare={true}
            hoverScale={1.02}
            perspective={1200}
            stiffness={180}
            damping={22}
            width={390}
            height={520}
            radius={22}
            background="#071216"
            color="#ffffff"
            shadow={true}
            shadowColor="#000000"
            shadowOpacity={0.5}
            ariaLabel="Baljinder Kaur profile card"
            front={
              <div className="bk-flip-front">
                <img
                  src={baljinderPhoto}
                  alt="Baljinder Kaur"
                  className="bk-flip-photo"
                />

                <div className="bk-flip-photo-overlay"></div>

                <div className="bk-flip-front-content">
                  <h2>BALJINDER KAUR</h2>

                  <div className="bk-flip-front-line"></div>

                  <span className="bk-flip-click">
                    CLICK TO DISCOVER
                  </span>
                </div>

                <div className="bk-flip-corner bk-corner-tl"></div>
                <div className="bk-flip-corner bk-corner-tr"></div>
                <div className="bk-flip-corner bk-corner-bl"></div>
                <div className="bk-flip-corner bk-corner-br"></div>
              </div>
            }
            back={
              <div className="bk-flip-back">
                <div className="bk-flip-back-glow"></div>

                <div className="bk-flip-back-content">
                  <span className="bk-back-label">
                    PROFILE
                  </span>

                  <h3>BALJINDER KAUR</h3>

                  <p className="bk-back-role">
                    Healthcare Professional
                  </p>

                  <div className="bk-flip-back-line"></div>

                  <div className="bk-flip-meta">
                    <div>
                      <FaBriefcase />
                      <span>
                        Floor Manager
                      </span>
                    </div>

                    <div>
                      <FaHeartPulse />
                      <span>
                        Healthcare
                      </span>
                    </div>

                    <div>
                      <FaHospitalUser />
                      <span>
                        Patient Care
                      </span>
                    </div>
                  </div>

                  <p className="bk-back-description">
                    Dedicated to maintaining a professional,
                    organised and patient-focused environment at
                    JANTA X-RAY CLINIC.
                  </p>

                  <div className="bk-flip-back-bottom">
                    <FaShieldHeart />
                    <span>CARE • RESPONSIBILITY • TRUST</span>
                  </div>
                </div>

                <div className="bk-flip-corner bk-corner-tl"></div>
                <div className="bk-flip-corner bk-corner-tr"></div>
                <div className="bk-flip-corner bk-corner-bl"></div>
                <div className="bk-flip-corner bk-corner-br"></div>
              </div>
            }
          />
        </div>
      </div>

      {/* ================= INTRO ================= */}
      <section className="bk-section bk-intro-section">
        <div className="bk-section-number">01</div>

        <div className="bk-section-content">
          <span className="bk-section-label">
            WHO SHE IS
          </span>

          <h2>
            MORE THAN A
            <span> PROFESSIONAL.</span>
          </h2>

          <p>
            Baljinder Kaur represents the human side of healthcare —
            where responsibility, discipline and genuine care come
            together every day.
          </p>

          <p>
            Her role extends beyond managing the floor. It is about
            maintaining a comfortable environment for patients,
            supporting the team and ensuring that every interaction
            reflects trust and professionalism.
          </p>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bk-section bk-stats-section">
        <div className="bk-section-number">02</div>

        <div className="bk-section-content">
          <span className="bk-section-label">
            AT A GLANCE
          </span>

          <div className="bk-stats">
            <div className="bk-stat">
              <FaHospitalUser />
              <strong>01</strong>
              <span>Healthcare Environment</span>
            </div>

            <div className="bk-stat">
              <FaPeopleGroup />
              <strong>01</strong>
              <span>Dedicated Professional</span>
            </div>

            <div className="bk-stat">
              <FaCertificate />
              <strong>∞</strong>
              <span>Commitment to Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= JOURNEY ================= */}
      <section className="bk-section bk-journey-section">
        <div className="bk-section-number">03</div>

        <div className="bk-section-content">
          <span className="bk-section-label">
            HER JOURNEY
          </span>

          <h2>
            BUILT ON
            <span> EXPERIENCE.</span>
          </h2>

          <div className="bk-timeline">
            <div className="bk-timeline-item">
              <div className="bk-timeline-icon">
                <FaGraduationCap />
              </div>

              <div>
                <span>FOUNDATION</span>
                <h3>Learning & Growth</h3>
                <p>
                  Building the knowledge, discipline and confidence
                  required to work in a healthcare environment.
                </p>
              </div>
            </div>

            <div className="bk-timeline-item">
              <div className="bk-timeline-icon">
                <FaHospitalUser />
              </div>

              <div>
                <span>PROFESSIONAL LIFE</span>
                <h3>Healthcare Operations</h3>
                <p>
                  Working closely with patients, staff and daily
                  clinic operations.
                </p>
              </div>
            </div>

            <div className="bk-timeline-item">
              <div className="bk-timeline-icon">
                <FaStar />
              </div>

              <div>
                <span>TODAY</span>
                <h3>Floor Management</h3>
                <p>
                  Helping maintain a smooth, organised and
                  patient-friendly clinical environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="bk-section bk-values-section">
        <div className="bk-section-number">04</div>

        <div className="bk-section-content">
          <span className="bk-section-label">
            WHAT MATTERS
          </span>

          <h2>
            CARE WITH
            <span> PURPOSE.</span>
          </h2>

          <div className="bk-values-grid">
            <div className="bk-value-card">
              <FaHeartPulse />
              <h3>CARE</h3>
              <p>
                Every patient deserves patience, dignity and
                attention.
              </p>
            </div>

            <div className="bk-value-card">
              <FaShieldHeart />
              <h3>TRUST</h3>
              <p>
                Professionalism creates confidence in every
                interaction.
              </p>
            </div>

            <div className="bk-value-card">
              <FaPeopleGroup />
              <h3>TEAM</h3>
              <p>
                Strong healthcare experiences are built together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUOTE ================= */}
      <section className="bk-quote-section">
        <div className="bk-quote-mark">“</div>

        <blockquote>
          Healthcare is not only about the service we provide,
          <br />
          but also about the experience we create for people.
        </blockquote>

        <div className="bk-quote-line"></div>

        <span>BALJINDER KAUR</span>
      </section>

      {/* ================= END ================= */}
      <section className="bk-end-section">
        <FaArrowDown className="bk-end-icon" />

        <p>
          THANK YOU FOR TAKING A CLOSER LOOK.
        </p>

        <h2>
          BALJINDER <span>KAUR</span>
        </h2>
      </section>
    </section>
  );
}

export default BaljinderKaur;