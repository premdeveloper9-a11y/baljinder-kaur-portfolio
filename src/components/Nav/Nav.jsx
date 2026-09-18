import React, { useRef } from "react";
import "./Nav.css";

import { Link } from "react-scroll";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Nav() {
  const menu = useRef(null);
  const mobile = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from("nav h1", {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    tl.from(
      "nav .desktopmenu li",
      {
        y: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.3"
    );

    tl.from(
      ".hamburger",
      {
        y: -40,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.4"
    );
  });

  const closeMobileMenu = () => {
    mobile.current?.classList.remove("activemobile");
    menu.current?.classList.remove("activeham");
  };

  const toggleMobileMenu = () => {
    mobile.current?.classList.toggle("activemobile");
    menu.current?.classList.toggle("activeham");
  };

  return (
    <nav>
      {/* LOGO / NAME */}
      <h1>BALJINDER KAUR</h1>

      {/* DESKTOP MENU */}
      <ul className="desktopmenu">
        <li className="cursor-target">
          <Link
            to="home"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-80}
          >
            Home
          </Link>
        </li>

        <li className="cursor-target">
          <Link
            to="about"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-80}
          >
            About
          </Link>
        </li>

        <li className="cursor-target">
          <Link
            to="experience"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-80}
          >
            Experience
          </Link>
        </li>

        <li className="cursor-target">
          <Link
            to="education"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-80}
          >
            Education
          </Link>
        </li>

        <li className="cursor-target">
          <Link
            to="achievements"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-80}
          >
            Achievements
          </Link>
        </li>

        <li className="cursor-target">
          <Link
            to="contact"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-80}
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* HAMBURGER */}
      <div
        className="hamburger"
        ref={menu}
        onClick={toggleMobileMenu}
      >
        <div className="ham"></div>
        <div className="ham"></div>
        <div className="ham"></div>
      </div>

      {/* MOBILE MENU */}
      <ul className="mobilemenu" ref={mobile}>
        <li>
          <Link
            to="home"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="about"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            onClick={closeMobileMenu}
          >
            About
          </Link>
        </li>

        <li>
          <Link
            to="experience"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            onClick={closeMobileMenu}
          >
            Experience
          </Link>
        </li>

        <li>
          <Link
            to="education"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            onClick={closeMobileMenu}
          >
            Education
          </Link>
        </li>

        <li>
          <Link
            to="achievements"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            onClick={closeMobileMenu}
          >
            Achievements
          </Link>
        </li>

        <li>
          <Link
            to="contact"
            activeClass="active"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;