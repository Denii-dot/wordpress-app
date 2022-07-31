import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/wordpressLogo.png";
import { NavLink, Outlet } from "react-router-dom";
import { BsFillFilePostFill } from "react-icons/bs";
import { VscCommentDiscussion } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";

function Navbar() {
  const [open, setOpen] = useState(false);
  const overlay = useRef(null);
  const secondMenu = useRef(null);

  useEffect(() => {
    //add classes to overlay and second menu but not on

    if (
      !overlay.current.classList.contains("fade-in") &&
      !overlay.current.classList.contains("fade-out") &&
      open
    ) {
      overlay.current.classList.add("fade-in");
      secondMenu.current.classList.add("fade-in");
    } else if (secondMenu.current.classList.contains("fade-in")) {
      overlay.current.classList.remove("fade-in");
      secondMenu.current.classList.remove("fade-in");
      overlay.current.classList.add("fade-out");
      secondMenu.current.classList.add("fade-out");
    } else if (secondMenu.current.classList.contains("fade-out")) {
      overlay.current.classList.add("fade-in");
      secondMenu.current.classList.add("fade-in");
      overlay.current.classList.remove("fade-out");
      secondMenu.current.classList.remove("fade-out");
    }

    if (open) {
      //Add no-scroll and scroll to on body
      document.body.classList.add("noscroll");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      document.body.classList.remove("noscroll");
    }
  }, [open]);

  return (
    <>
      <div ref={overlay} className={"overlay has-fade"}></div>
      <div className="navbar">
        <div className="navbar__content container container--pa">
          <NavLink to="/">
            <img
              src={Logo}
              alt=""
              className="navbar__logo"
              onClick={() => setOpen(false)}
            />
          </NavLink>
          <div className="navbar__links hide-for-mobile">
            <NavLink to="/trends" className="button--navbar">
              <FiTrendingUp style={{ marginRight: "0.5rem" }} />
              Trends
            </NavLink>
            <NavLink to="/taxonomy" className="button--navbar">
              <BiCategory style={{ marginRight: "0.5rem" }} />
              Taxonomy
            </NavLink>
            <NavLink to="/" className="button--navbar">
              <BsFillFilePostFill style={{ marginRight: "0.5rem" }} />
              Posts
            </NavLink>
            <NavLink to="/comments" className="button--navbar">
              <VscCommentDiscussion style={{ marginRight: "0.5rem" }} />{" "}
              Comments
            </NavLink>
            <NavLink to="/profile" className="button--navbar">
              <CgProfile style={{ marginRight: "0.5rem" }} />
              Profile
            </NavLink>
          </div>
          <div
            className={`navbar__toggle hide-for-desktop ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={"second has-fade"} ref={secondMenu}>
          <NavLink
            to="/trends"
            className="button--navbar"
            onClick={() => setOpen(false)}
          >
            <FiTrendingUp style={{ marginRight: "0.5rem" }} />
            Trends
          </NavLink>
          <NavLink
            to="/taxonomy"
            className="button--navbar"
            onClick={() => setOpen(false)}
          >
            <BiCategory style={{ marginRight: "0.5rem" }} />
            Taxonomy
          </NavLink>
          <NavLink
            to="/"
            className="button--navbar"
            onClick={() => setOpen(false)}
          >
            <BsFillFilePostFill style={{ marginRight: "0.5rem" }} />
            Posts
          </NavLink>
          <NavLink
            to="/comments"
            className="button--navbar"
            onClick={() => setOpen(false)}
          >
            <VscCommentDiscussion style={{ marginRight: "0.5rem" }} /> Comments
          </NavLink>
          <NavLink
            to="/profile"
            className="button--navbar"
            onClick={() => setOpen(false)}
          >
            <CgProfile style={{ marginRight: "0.5rem" }} />
            Profile
          </NavLink>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
