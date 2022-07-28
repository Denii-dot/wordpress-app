import React, { useState, useEffect } from "react";
import Logo from "../assets/wordpressLogo.png";
import { NavLink, Outlet } from "react-router-dom";
import { BsFillFilePostFill } from "react-icons/bs";
import { VscCommentDiscussion } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";

function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
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
      <div
        className={`overlay has-fade ${open ? "fade-in" : "fade-out"}`}
      ></div>
      <div className="navbar">
        <div className="navbar__content container container--pa">
          <NavLink to="/">
            <img src={Logo} alt="" className="navbar__logo" />
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
        <div className={`second has-fade ${open ? "fade-in" : "fade-out"}`}>
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
