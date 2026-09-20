import React, { useEffect, useState } from "react";

import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaArrowUp,
  FaUserDoctor,
  FaXmark,
} from "react-icons/fa6";

import MedicalQuest from "../MedicalQuest/MedicalQuest";
import BaljinderKaur from "../BaljinderKaur/BaljinderKaur";

import "./Footer.css";

function Footer() {
  const [showMedicalQuest, setShowMedicalQuest] =
    useState(false);

  const [showBaljinder, setShowBaljinder] =
    useState(false);

  /* =========================================================
     LOCK BODY SCROLL WHEN FULLSCREEN EXPERIENCE IS OPEN
  ========================================================= */

  useEffect(() => {
    if (showBaljinder || showMedicalQuest) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showBaljinder, showMedicalQuest]);

  /* =========================================================
     BACK TO TOP
  ========================================================= */

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer id="footer">

        {/* =====================================================
            FOOTER TOP
        ===================================================== */}

        <div className="footerTop">

          <div className="footerBrand">
            <h2>BALJINDER KAUR</h2>

            <span>
              Healthcare Professional
            </span>
          </div>


          <div className="footerSocials">

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="footerSocialLink cursor-target"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>


            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="footerSocialLink cursor-target"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>


            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="footerSocialLink cursor-target"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

          </div>

        </div>


        {/* =====================================================
            BALJINDER KAUR EXPERIENCE
        ===================================================== */}

        <button
          type="button"
          className="baljinderLauncher cursor-target"
          onClick={() => setShowBaljinder(true)}
        >

          <span className="baljinderLauncherIcon">
            <FaUserDoctor />
          </span>


          <span className="baljinderLauncherText">

            <strong>
              MEET BALJINDER KAUR
            </strong>

            <small>
              THE WOMAN BEHIND THE CARE
            </small>

          </span>


          <span className="baljinderLauncherArrow">
            →
          </span>

        </button>


        {/* =====================================================
            MEDICAL QUEST
        ===================================================== */}

        <button
          type="button"
          className="radiologyGameLauncher cursor-target"
          onClick={() => setShowMedicalQuest(true)}
        >

          <span className="radiologyGameIcon">
            🏥
          </span>


          <span className="radiologyGameText">

            <strong>
              MEDICAL QUEST
            </strong>

            <small>
              EXPLORE • PLAY • LEARN MEDICINE
            </small>

          </span>


          <span className="radiologyGameArrow">
            →
          </span>

        </button>


        {/* =====================================================
            CREATOR CREDIT
        ===================================================== */}

        <div className="footerCreator">

          <div className="footerCreatorLine"></div>


          <span className="footerCreatorEyebrow">
            CRAFTED WITH PRECISION
          </span>


          <h3>
            PREM DEVELOPER
          </h3>


          <p className="footerCreatorRole">
            Full-Stack Developer • Creative Technologist
          </p>


          <p className="footerCreatorDescription">
            Designed, developed and engineered with attention
            to detail, interaction and digital experience.
          </p>


          <div className="footerDevelopmentStatus">

            <span className="footerStatusPulse"></span>

            <span>
              DEVELOPMENT STATUS — ONGOING
            </span>

          </div>


          <p className="footerPendingText">
            This website is a work in progress.
            <br />
            More features, refinements &amp; experiences
            are still being built.
          </p>

        </div>


        {/* =====================================================
            FOOTER LINE
        ===================================================== */}

        <div className="footerLine"></div>


        {/* =====================================================
            FOOTER BOTTOM
        ===================================================== */}

        <div className="footerBottom">

          <p>
            © {new Date().getFullYear()} Baljinder Kaur.
            All rights reserved.
          </p>


          <div className="footerClinicStatus">

            <span className="footerStatusDot"></span>

            JANTA X-RAY CLINIC

          </div>


          <button
            type="button"
            className="backToTop cursor-target"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >

            <span>
              TOP
            </span>

            <FaArrowUp />

          </button>

        </div>

      </footer>


      {/* =======================================================
          BALJINDER KAUR FULLSCREEN EXPERIENCE
      ======================================================= */}

      {showBaljinder && (

        <div className="baljinderExperience">

          <button
            type="button"
            className="baljinderClose cursor-target"
            onClick={() => setShowBaljinder(false)}
            aria-label="Close Baljinder Kaur section"
          >

            <span>
              CLOSE
            </span>

            <FaXmark />

          </button>


          <div className="baljinderExperienceContent">

            <BaljinderKaur />

          </div>

        </div>

      )}


      {/* =======================================================
          MEDICAL QUEST FULLSCREEN EXPERIENCE
      ======================================================= */}

      {showMedicalQuest && (

        <MedicalQuest
          onClose={() =>
            setShowMedicalQuest(false)
          }
        />

      )}

    </>
  );
}

export default Footer;