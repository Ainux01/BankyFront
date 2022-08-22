import React, { useState } from "react";
import home from "./home.module.css";
import creditcard from "../../images/creditcard.svg";
import reduce from "../../images/reduce.svg";
import plateform from "../../images/platform.svg";
import { MdAlternateEmail } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { Link } from "react-router-dom";
const Index = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, message);
    const response = fetch(
      `http://localhost:8080/sendsupportemail/${email}/${message}`
    );
    console.log(response);
  };
  return (
    <>
      <div className={home.container} id="home">
        <section>
          <h2 className={home.heading_primary}>
            Safe and Secure Virtual Banking
          </h2>
          <p>
            Get started with an online account today for exclusive deals and
            promotions. Receive 5000 MAD off towards your next credit card
            payment today!
          </p>
          <Link to="/signin" className={home.btn1}>
            Get Started
          </Link>
        </section>
        <aside className={home.aside1}>
          {/* <img src={finance} alt="finance" className={home.asideimage} /> */}
        </aside>
      </div>
      <div className={home.container} id="about">
        <aside className={home.aside2}>
          {/* <img src={finance} alt="finance" className={home.asideimage} /> */}
        </aside>
        <section>
          <h4 className={home.heading_tertiary}>Premium Banking</h4>
          <h2 className={home.heading_secondary}>
            Unlimited Transactions with zero fees
          </h2>
          <p style={{ color: "#FEB628" }}>
            Get access to our exclusive app that allows you to send unlimited
            transactions without getting charged any fees.
          </p>
          <Link to="/signin" className={home.btn2}>
            Learn More
          </Link>
        </section>
      </div>

      <div id="services" className={home.services}>
        <h2
          className={home.heading_secondary}
          style={{
            textAlign: "center",
            color: "#fff",
            paddingTop: "50px",
            fontSize: "40px",
          }}
        >
          Our Services
        </h2>
        <div className={home.services_cards}>
          <div className={home.card}>
            <img
              src={reduce}
              alt=""
              style={{ width: "200px", margin: "20px auto 0 auto" }}
            />
            <h3>Reduce Expenses</h3>
            <p>We help reduce your fees and increase your overall revenue.</p>
          </div>
          <div className={home.card}>
            <img
              src={plateform}
              alt=""
              style={{ width: "200px", margin: "20px auto 0 auto" }}
            />
            <h3>Virtual Platform</h3>
            <p>Access our platform securely online anywhere in the world</p>
          </div>
          <div className={home.card}>
            <img
              src={creditcard}
              alt=""
              style={{ width: "180px", margin: "20px auto 0 auto" }}
            />
            <h3>Premium Benefits</h3>
            <p>
              Unlock our special membership that returns 10% cash back on all
              purchases.
            </p>
          </div>
        </div>
      </div>
      <div className={home.contact} id="contact">
        <div className="align_center">
          <h2 className={home.heading_special}>
            <span className="blue">C</span>ontact Us
          </h2>
          <form className={home.form} onSubmit={submitHandler}>
            <div className={home.form_group}>
              <label htmlFor="email" className={home.label}>
                <MdAlternateEmail />
              </label>
              <input
                type="email"
                className={home.input}
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "350px", height: "15px" }}
              />
            </div>
            <div className={home.form_group}>
              <label htmlFor="email" className={home.label}>
                <AiFillMessage />
              </label>
              <textarea
                type="text"
                className={home.input}
                required
                placeholder="Enter the message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                cols="60"
                rows="4"
              />
            </div>
            <button type="submit" className={home.btn2}>
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
