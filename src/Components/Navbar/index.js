import React from "react";
import navbar from "./navbar.module.css";
import logo from "../../icones/debit-card.png";
import { Link as Links } from "react-scroll";
import { Link } from "react-router-dom";
const index = ({ showsignbtn }) => {
  return (
    <div className={navbar.navbar}>
      <div className={navbar.container}>
        <Link to="/" className={navbar.logo_container}>
          <div>
            <img src={logo} alt="logo" className={navbar.logo_image} />
          </div>
          <h2>
            <span className={navbar.blue}>B</span>anky
          </h2>
        </Link>

        <ul className={navbar.navmenu}>
          <Links to="home">
            <li className={navbar.navitem}>Home</li>
          </Links>
          <Links to="about">
            <li className={navbar.navitem}>About</li>
          </Links>
          <Links to="services">
            <li className={navbar.navitem}>Services</li>
          </Links>
          <Links to="team">
            <li className={navbar.navitem}>Team</li>
          </Links>
          <Links to="contact">
            <li className={navbar.navitem}>Contact</li>
          </Links>
        </ul>
      </div>
      {showsignbtn && (
        <Link to="/signin" className={navbar.navbtn}>
          Sign In
        </Link>
      )}
    </div>
  );
};

export default index;
