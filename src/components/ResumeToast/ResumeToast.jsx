import React, { useEffect, useState } from "react";
import "./ResumeToast.css";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";

function ResumeToast({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            onComplete();
          }, 500);

          return 100;
        }

        return prev + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="resume-toast">

      <div className="toast-top">

        <div className="toast-icon">
          {progress === 100 ? <FaCheckCircle /> : <FaFileAlt />}
        </div>

        <div>

          <h4>
            {progress === 100 ? "Resume Ready!" : "Preparing Resume"}
          </h4>

          <p>
            {progress === 100
              ? "Download starting..."
              : "Generating your download..."}
          </p>

        </div>

      </div>

      <div className="progress-container">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <span className="progress-text">{progress}%</span>

    </div>
  );
}

export default ResumeToast;