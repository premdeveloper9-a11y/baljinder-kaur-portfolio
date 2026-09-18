import React, { useState } from "react";
import "./Contact.css";

import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa6";

import { toast } from "sonner";

/* =====================================================
   INTERACTIVE DIAGNOSTIC PANEL
===================================================== */

const InteractiveDiagnosticPanel = () => {
  const [activeInfo, setActiveInfo] = useState("diagnostics");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const infoContent = {
    diagnostics: {
      number: "01",
      title: "ADVANCED DIAGNOSTICS",
      text: "Modern diagnostic support with a patient-focused approach.",
    },
    reports: {
      number: "02",
      title: "TRUSTED REPORTS",
      text: "Clear and reliable reporting to support informed decisions.",
    },
    patient: {
      number: "03",
      title: "PATIENT FIRST",
      text: "Comfort, care, and assistance throughout your visit.",
    },
  };

  const currentInfo = infoContent[activeInfo];

  const handleMouseMove = (event) => {
    const panel = event.currentTarget;
    const rect = panel.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const rotateY = (mouseX / rect.width - 0.5) * 8;
    const rotateX = (mouseY / rect.height - 0.5) * -8;

    setTilt({
      x: rotateX,
      y: rotateY,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      x: 0,
      y: 0,
    });
  };

  return (
    <div
      className="diagnostic-panel"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* =================================================
          PANEL HEADER
      ================================================= */}

      <div className="diagnostic-panel-top">
        <div className="diagnostic-system-label">
          <span className="diagnostic-live-dot"></span>
          DIAGNOSTIC NETWORK
        </div>

        <div className="diagnostic-status">
          <span>•</span> LIVE
        </div>
      </div>

      {/* =================================================
          INTERACTIVE VISUAL
      ================================================= */}

      <div
        className="diagnostic-visual"
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <div className="diagnostic-grid"></div>

        {/* Orbit Rings */}
        <div className="diagnostic-orbit orbit-outer"></div>
        <div className="diagnostic-orbit orbit-middle"></div>
        <div className="diagnostic-orbit orbit-inner"></div>

        {/* Medical Cross */}
        <div className="diagnostic-cross">
          <span className="cross-horizontal"></span>
          <span className="cross-vertical"></span>
        </div>

        {/* Central Medical Core */}
        <div className="diagnostic-core">
          <span>+</span>
        </div>

        {/* Interactive Nodes */}
        <div className="diagnostic-node node-top">
          <span className="node-tooltip">PATIENT DATA</span>
        </div>

        <div className="diagnostic-node node-right">
          <span className="node-tooltip">X-RAY ANALYSIS</span>
        </div>

        <div className="diagnostic-node node-bottom">
          <span className="node-tooltip">REPORT STATUS</span>
        </div>

        <div className="diagnostic-node node-left">
          <span className="node-tooltip">CLINIC SUPPORT</span>
        </div>

        {/* Connectors */}
        <div className="diagnostic-connector connector-top"></div>
        <div className="diagnostic-connector connector-right"></div>
        <div className="diagnostic-connector connector-bottom"></div>
        <div className="diagnostic-connector connector-left"></div>

        {/* Center Branding */}
        <div className="diagnostic-center-label">
          JXC
          <small>MEDICAL CARE</small>
        </div>
      </div>

      {/* =================================================
          ECG MONITOR
      ================================================= */}

      <div className="diagnostic-ecg">
        <div className="ecg-label">
          <span>LIVE MONITOR</span>
          <span>STABLE</span>
        </div>

        <div className="ecg-line">
          <svg
            viewBox="0 0 600 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polyline
              className="ecg-wave"
              points="
                0,40
                65,40
                85,40
                100,20
                115,60
                130,40
                190,40
                215,40
                230,8
                245,72
                260,40
                320,40
                345,40
                360,25
                375,55
                390,40
                450,40
                475,40
                490,15
                505,65
                520,40
                600,40
              "
            />
          </svg>
        </div>
      </div>

      {/* =================================================
          DYNAMIC INFORMATION
      ================================================= */}

      <div className="diagnostic-information">
        <div className="diagnostic-info-heading">
          <div className="diagnostic-info-number">
            {currentInfo.number}
          </div>

          <div>
            <span className="diagnostic-info-label">
              CLINIC STANDARD
            </span>

            <h3>{currentInfo.title}</h3>
          </div>
        </div>

        <p>{currentInfo.text}</p>
      </div>

      {/* =================================================
          INTERACTIVE TABS
      ================================================= */}

      <div className="diagnostic-tabs">
        <button
          type="button"
          className={activeInfo === "diagnostics" ? "active" : ""}
          onClick={() => setActiveInfo("diagnostics")}
        >
          <span>01</span>
          <strong>DIAGNOSTICS</strong>
        </button>

        <button
          type="button"
          className={activeInfo === "reports" ? "active" : ""}
          onClick={() => setActiveInfo("reports")}
        >
          <span>02</span>
          <strong>REPORTS</strong>
        </button>

        <button
          type="button"
          className={activeInfo === "patient" ? "active" : ""}
          onClick={() => setActiveInfo("patient")}
        >
          <span>03</span>
          <strong>PATIENT CARE</strong>
        </button>
      </div>

      {/* =================================================
          PANEL FOOTER
      ================================================= */}

      <div className="diagnostic-panel-bottom">
        <span>● SYSTEM ACTIVE</span>
        <span>JANTA X-RAY CLINIC</span>
      </div>
    </div>
  );
};

/* =====================================================
   CONTACT COMPONENT
===================================================== */

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.enquiryType ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: "New Enquiry - JANTA X-RAY CLINIC",
          from_name: "JANTA X-RAY CLINIC Website",

          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          enquiry_type: formData.enquiryType,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          "Your enquiry has been sent successfully. We will contact you soon."
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          enquiryType: "",
          message: "",
        });
      } else {
        toast.error(
          "Unable to send your enquiry right now. Please try again."
        );
      }
    } catch (error) {
      console.error("Enquiry submission error:", error);
      toast.error(
        "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      {/* =================================================
          SECTION HEADING
      ================================================= */}

      <div className="contact-heading">
        <span className="section-label">GET IN TOUCH</span>

        <h1>
          LET'S <span>CONNECT</span>
        </h1>

        <p>
          Have a question or need assistance? Our team is here to help.
        </p>
      </div>

      {/* =================================================
          CONTACT CONTENT
      ================================================= */}

      <div className="contact-wrapper">
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="contact-left">
          <div className="contact-intro">
            <span className="contact-small-title">
              JANTA X-RAY CLINIC
            </span>

            <h2>Your Health, Our Priority.</h2>

            <p>
              For diagnostic services, appointments, or any enquiry,
              feel free to get in touch with our team. We are here to
              assist you.
            </p>
          </div>

          {/* Interactive panel replaces old contact details */}
          <InteractiveDiagnosticPanel />
        </div>

        {/* =================================================
            RIGHT SIDE — ENQUIRY FORM
        ================================================= */}

        <div className="contact-right">
          <div className="enquiry-card">
            <div className="enquiry-card-heading">
              <span>01 / ENQUIRY FORM</span>

              <h2>Send Us a Message</h2>

              <p>
                Fill out the form below and our clinic team will get
                back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="enquiry-form">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">FULL NAME</label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email and Phone */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">EMAIL ADDRESS</label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">PHONE NUMBER</label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Enquiry Type */}
              <div className="form-group">
                <label htmlFor="enquiryType">ENQUIRY TYPE</label>

                <select
                  id="enquiryType"
                  name="enquiryType"
                  value={formData.enquiryType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select enquiry type
                  </option>

                  <option value="Appointment">
                    Appointment
                  </option>

                  <option value="Diagnostic Services">
                    Diagnostic Services
                  </option>

                  <option value="Report Enquiry">
                    Report Enquiry
                  </option>

                  <option value="General Enquiry">
                    General Enquiry
                  </option>
                </select>
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">YOUR MESSAGE</label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="send-enquiry-btn cursor-target"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="button-loader"></span>
                    SENDING...
                  </>
                ) : (
                  <>
                    SEND ENQUIRY
                    <span>↗</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;