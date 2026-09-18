import React from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaArrowUp,
} from "react-icons/fa6";

import "./Footer.css";

function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="footer">
      <div className="footerTop">
        <div className="footerBrand">
          <h2>BALJINDER KAUR</h2>
          <span>Healthcare Professional</span>
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

      <div className="footerLine"></div>

      <div className="footerBottom">
        <p>
          © {new Date().getFullYear()} Baljinder Kaur. All rights reserved.
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
          <span>TOP</span>
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
}

export default Footer;