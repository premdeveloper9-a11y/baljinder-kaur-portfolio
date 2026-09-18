import React, { useState } from "react";
import "./ExaminationTypes.css";

const examinations = [
  {
    id: "fdg",
    isotope: "F-18",
    title: "FDG WB PET",
    subtitle: "Whole Body",
    description: "Metabolic imaging",
  },
  {
    id: "psma",
    isotope: "F-18",
    title: "PSMA PET",
    subtitle: "Prostate Imaging",
    description: "Molecular imaging",
  },
  {
    id: "dopa",
    isotope: "F-18",
    title: "DOPA PET",
    subtitle: "Neurological",
    description: "Brain imaging",
  },
  {
    id: "fet",
    isotope: "F-18",
    title: "FET PET",
    subtitle: "Brain Imaging",
    description: "Tumor imaging",
  },
];

function ExaminationTypes() {
  const [activeExam, setActiveExam] = useState("fdg");

  return (
    <div className="examination-panel">

      {/* Panel Header */}
      <div className="examination-header">
        <div className="header-indicator"></div>

        <div>
          <span className="examination-label">
            DIAGNOSTIC IMAGING
          </span>

          <h3>EXAMINATION TYPES</h3>
        </div>
      </div>

      {/* Examination List */}
      <div className="examination-list">
        {examinations.map((exam) => (
          <div
            key={exam.id}
            className={`examination-item ${
              activeExam === exam.id ? "active" : ""
            }`}
            onMouseEnter={() => setActiveExam(exam.id)}
          >
            <div className="exam-number">
              0{examinations.indexOf(exam) + 1}
            </div>

            <div className="exam-content">
              <span className="exam-isotope">
                {exam.isotope}
              </span>

              <h4>{exam.title}</h4>

              <span className="exam-subtitle">
                {exam.subtitle}
              </span>

              <p>{exam.description}</p>
            </div>

            <div className="exam-arrow">↗</div>
          </div>
        ))}
      </div>

      {/* Active Status */}
      <div className="examination-footer">
        <span className="status-dot"></span>

        <span>
          ACTIVE · {activeExam.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

export default ExaminationTypes;