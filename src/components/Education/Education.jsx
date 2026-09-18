import React, { useRef } from "react";
import "./Education.css";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FaGraduationCap,
  FaBookMedical,
  FaCertificate,
  FaSchool,
} from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

function Education() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".education-eyebrow", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      gsap.from(".education-heading", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".education-intro", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".qualification-item", {
        x: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".qualification-list",
          start: "top 80%",
        },
      });

      gsap.from(".qualification-visual", {
        scale: 0.85,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".qualification-visual",
          start: "top 80%",
        },
      });

      gsap.to(".education-scan-line", {
        x: "100%",
        duration: 3.5,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="education"
      className="education-section"
      ref={sectionRef}
    >
      <div className="education-container">

        {/* HEADER */}

        <div className="education-eyebrow">
          <span></span>
          EDUCATION &amp; QUALIFICATIONS
        </div>

        <div className="education-heading">
          <h2>
            BUILT ON
            <span> KNOWLEDGE.</span>
          </h2>

          <p className="education-intro">
            Academic and professional qualifications supporting
            a strong foundation in diagnostic imaging and
            healthcare operations.
          </p>
        </div>


        {/* MAIN CONTENT */}

        <div className="education-main">

          {/* QUALIFICATION LIST */}

          <div className="qualification-list">

            {/* MBA */}

            <div className="qualification-item current">

              <div className="qualification-marker">
                <span>01</span>
                <div></div>
              </div>

              <div className="qualification-content">

                <div className="qualification-meta">
                  <span>CURRENT</span>
                  <small>01</small>
                </div>

                <div className="qualification-icon">
                  <FaGraduationCap />
                </div>

                <h3>
                  MBA
                </h3>

                <h4>
                  HOSPITAL &amp; HEALTHCARE MANAGEMENT
                </h4>

                <p>
                  Dr. D.Y. Patil University, Pune
                </p>

                <div className="qualification-status">
                  <span></span>
                  PURSUING
                </div>

              </div>
            </div>


            {/* BSC */}

            <div className="qualification-item">

              <div className="qualification-marker">
                <span>02</span>
                <div></div>
              </div>

              <div className="qualification-content">

                <div className="qualification-meta">
                  <span>2021 — 2024</span>
                  <small>02</small>
                </div>

                <div className="qualification-icon">
                  <FaBookMedical />
                </div>

                <h3>
                  B.Sc
                </h3>

                <h4>
                  BACHELOR OF SCIENCE
                </h4>

                <p>
                  Sikkim Alpine University
                </p>

                <div className="qualification-status completed">
                  <span></span>
                  COMPLETED
                </div>

              </div>
            </div>


            {/* DIPLOMA */}

            <div className="qualification-item">

              <div className="qualification-marker">
                <span>03</span>
                <div></div>
              </div>

              <div className="qualification-content">

                <div className="qualification-meta">
                  <span>PROFESSIONAL</span>
                  <small>03</small>
                </div>

                <div className="qualification-icon">
                  <FaCertificate />
                </div>

                <h3>
                  DIPLOMA
                </h3>

                <h4>
                  X-RAY &amp; IMAGING
                </h4>

                <p>
                  Indian Medical Association
                </p>

                <div className="qualification-status completed">
                  <span></span>
                  QUALIFIED
                </div>

              </div>
            </div>


            {/* 12TH */}

            <div className="qualification-item compact">

              <div className="qualification-marker">
                <span>04</span>
                <div></div>
              </div>

              <div className="qualification-content">

                <div className="qualification-meta">
                  <span>2020</span>
                  <small>04</small>
                </div>

                <div className="qualification-icon">
                  <FaSchool />
                </div>

                <h3>
                  12th
                </h3>

                <h4>
                  SENIOR SECONDARY
                </h4>

                <p>
                  NIOS
                </p>

              </div>
            </div>


            {/* 10TH */}

            <div className="qualification-item compact last">

              <div className="qualification-marker">
                <span>05</span>
              </div>

              <div className="qualification-content">

                <div className="qualification-meta">
                  <span>2018</span>
                  <small>05</small>
                </div>

                <div className="qualification-icon">
                  <FaSchool />
                </div>

                <h3>
                  10th
                </h3>

                <h4>
                  SECONDARY EDUCATION
                </h4>

                <p>
                  CBSE
                </p>

              </div>
            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="qualification-visual">

            <div className="education-visual-grid"></div>

            <div className="education-scan-circle circle-one"></div>
            <div className="education-scan-circle circle-two"></div>
            <div className="education-scan-circle circle-three"></div>

            <div className="education-cross horizontal"></div>
            <div className="education-cross vertical"></div>

            <div className="education-core">

              <div className="education-core-inner">
                <FaGraduationCap />
              </div>

              <span>QUALIFICATION</span>

            </div>

            <div className="education-scan-line"></div>


            <div className="education-data data-top">
              <span>EDU-01</span>
              <strong>MBA</strong>
            </div>

            <div className="education-data data-right">
              <span>DOMAIN</span>
              <strong>HEALTHCARE</strong>
            </div>

            <div className="education-data data-bottom">
              <span>PROFESSIONAL</span>
              <strong>X-RAY &amp; IMAGING</strong>
            </div>

          </div>

        </div>


        {/* BOTTOM STRIP */}

      

      </div>
    </section>
  );
}

export default Education;