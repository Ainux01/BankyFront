import React from "react";
import footer from "./footer.module.css";
import { Link } from "react-router-dom";
const index = () => {
  return (
    <section className={footer.footer}>
      <div className={footer.footer_cards}>
        <div className={footer.card}>
          <h4>About Us</h4>
          <ul>
            <li>How it works</li>
            <li>Testimonials</li>
            <li> Carers </li>
            <li>Investors</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className={footer.card}>
          <h4>Videos</h4>
          <ul>
            <li>Submit Videos</li>
            <li>Tutorials</li>
            <li>Q&A</li>
            <li>Influencers</li>
          </ul>
        </div>
        <div className={footer.card}>
          <h4>Contact Us</h4>
          <ul>
            <li>Contact</li>
            <li>Support</li>
            <li>Destinations</li>
            <li>SponsorShips</li>
          </ul>
        </div>
      </div>
      <div className={footer.links}>
        <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
          <h2 className={footer.heading}>
            <span style={{ color: "#de4a3a" }}>B</span>anky
          </h2>
        </Link>

        <p
          className={footer.parag}
        >{`Banky © ${new Date().getFullYear()} All Rights Reserved`}</p>
      </div>
    </section>
  );
};

export default index;
