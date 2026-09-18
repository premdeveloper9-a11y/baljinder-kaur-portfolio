import React, { useEffect, useState } from "react";
import "./ScrollTop.css";
import { FaArrowUp } from "react-icons/fa";

function ScrollTop() {

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 300) {

        setShowButton(true);

      } else {

        setShowButton(false);

      }

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const scrollToTop = () => {

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  };

  return (

    <button
    
      className={`scrollTop ${showButton ? "show" : ""}`}

      onClick={scrollToTop}
    
    >
    
      <FaArrowUp/>

    </button>

  );

}

export default ScrollTop;