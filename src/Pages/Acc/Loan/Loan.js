import React, { useState, useEffect } from "react";
import loan from "./loan.module.css";
import { useNavigate, useParams } from "react-router-dom";
const Loan = () => {
  const amountParam = useParams().amount;
  const id = useParams().id;
  console.log(id);
  let navigate = useNavigate();
  const [client, setClient] = useState("");
  const [loani, setLoani] = useState("");
  console.log(amountParam);
  const getLoan = async (id) => {
    const response = await fetch(
      `http://localhost:8080/loan/getLoanById/${id}`
    );
    const data = await response.json();
    setLoani(data);
  };

  useEffect(() => {
    if (id) {
      getLoan(id);
    }
  }, []);
  useEffect(() => {
    console.log(loani);
  }, [loani]);
  const [loanDetails, setLoanDetails] = useState({
    title: "",
    prenom: "",
    nom: "",
    amount: amountParam ? amountParam : "",
    marital: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postal: "",
    employer: "",
    occupation: "",
    income: "",
    payment: "",
    comments: "",
  });
  const getClientByEmail = async (email) => {
    const response = await fetch(
      `http://localhost:8080/client/getClientByEmail/${email}`
    );
    const data = await response.json();
    setClient(data);
    console.log(client);
  };
  useEffect(() => {
    if (sessionStorage.getItem("email")) {
      getClientByEmail(sessionStorage.getItem("email"));
    }
  }, []);
  useEffect(() => {
    if (loani) {
      setLoanDetails({
        ...loanDetails,
        amount: loani?.amount,
        comments: loani?.comments,
      });
    }
    if (client) {
      console.log(client);
      setLoanDetails({
        ...loanDetails,
        prenom: client.prenom,
        street: client.street,
        city: client.city,
        state: client.state,
        postal: client.postal,
        employer: client.employer,
        nom: client.nom,
        income: client.income,
        payment: client.payment,
        email: client.email,
        phone: client.phone,
        occupation: client.occupation,
      });
    }
  }, [client, loan]);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setLoanDetails({ ...loanDetails, [name]: value });
  };
  let response = false;
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hello");

    // if (
    //   loanDetails.title &&
    //   loanDetails.title !== "select" &&
    //   loanDetails.prenom &&
    //   loanDetails.nom &&
    //   loanDetails.amount &&
    //   loanDetails.marital &&
    //   loanDetails.marital !== "select" &&
    //   loanDetails.email &&
    //   loanDetails.phone &&
    //   loanDetails.street &&
    //   loanDetails.city &&
    //   loanDetails.state &&
    //   loanDetails.postal &&
    //   loanDetails.employer &&
    //   loanDetails.occupation &&
    //   loanDetails.income &&
    //   loanDetails.payment
    // ) {
    const loan = {
      amount: loanDetails.amount,
      comments: loanDetails.comments,
    };
    fetch(
      `http://localhost:8080/loan/addLoan/${sessionStorage.getItem("email")}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loan),
      }
    ).then((response) => {
      console.log(response);
      if (response.status >= 200 && response.status <= 299) {
        console.log(loanDetails.phone);
        fetch(
          `http://localhost:8080/client/updateClient/${sessionStorage.getItem(
            "email"
          )}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loanDetails),
          }
        ).then((response) => {
          console.log(response);
        });
      }
    });
    alert("Your submit Request Has been Submitted");
    navigate("/accueil/dashboard");
  };
  return (
    <div>
      <div className="align_center">
        <h2 className={loan.heading}>Loan Application Form</h2>
        <form onSubmit={submitHandler} className={loan.form}>
          <div className={loan.form_control}>
            <label htmlFor="title" className={loan.form}>
              Title :
            </label>
            <select
              name="title"
              id="title"
              required
              value={loanDetails.title}
              onChange={(e) => changeHandler(e)}
            >
              <option value="select" id="select">
                Select Please
              </option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
            </select>
          </div>
          <div className={loan.form_control}>
            <label htmlFor="firstname">First Name : </label>
            <input
              type="text"
              id="firstname"
              name="prenom"
              required
              value={loanDetails.prenom}
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className={loan.form_control}>
            <label htmlFor="lastname">Last Name : </label>
            <input
              type="text"
              id="lastname"
              name="nom"
              required
              value={loanDetails.nom}
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className={loan.form_control}>
            <label htmlFor="amount">Loan Amount : </label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              value={loanDetails.amount}
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className={loan.form_control}>
            <label htmlFor="marital">Marital Status : </label>
            <select
              name="marital"
              id="marital"
              required
              value={loanDetails.marital}
              onChange={(e) => changeHandler(e)}
            >
              <option value="select" id="select">
                Select Please
              </option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className={loan.form_control}>
            <label htmlFor="email">Email : </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              value={loanDetails.email}
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className={loan.form_control}>
            <label htmlFor="phone">Phone : </label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              value={loanDetails.phone}
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className={loan.section}>
            <h4 className={loan.heading_secondary}>Adress</h4>
            <div className={loan.form_control}>
              <label htmlFor="street">Street Address :</label>
              <input
                type="text"
                name="street"
                id="street"
                required
                value={loanDetails.street}
                onChange={(e) => changeHandler(e)}
              />
            </div>
            <div className={loan.form_control}>
              <label htmlFor="city">City : </label>
              <input
                type="text"
                name="city"
                id="city"
                required
                value={loanDetails.city}
                onChange={(e) => changeHandler(e)}
              />
            </div>
            <div className={loan.form_control}>
              <label htmlFor="state">State/Province : </label>
              <input
                type="text"
                name="state"
                id="state"
                required
                value={loanDetails.state}
                onChange={(e) => changeHandler(e)}
              />
            </div>
            <div className={loan.form_control}>
              <label htmlFor="postal">Postal/Zip Code : </label>
              <input
                type="text"
                name="postal"
                id="postal"
                required
                value={loanDetails.postal}
                onChange={(e) => changeHandler(e)}
              />
            </div>
          </div>
          <div className={loan.section}>
            <h4 className={loan.heading_secondary}>Employment Information</h4>
            <div className={loan.form_control}>
              <label htmlFor="present">Present Employer :</label>
              <input
                type="text"
                name="employer"
                id="present"
                required
                value={loanDetails.employer}
                onChange={(e) => changeHandler(e)}
              />
            </div>

            <div className={loan.form_control}>
              <label htmlFor="occupation">Occupation : </label>
              <input
                type="text"
                name="occupation"
                id="occupation"
                required
                value={loanDetails.occupation}
                onChange={(e) => changeHandler(e)}
              />
            </div>

            <div className={loan.form_control}>
              <label htmlFor="income">Gross Monthly Income : </label>
              <input
                type="number"
                name="income"
                id="income"
                required
                placeholder="in MAD , EX:1500"
                value={loanDetails.income}
                onChange={(e) => changeHandler(e)}
              />
            </div>

            <div className={loan.form_control}>
              <label htmlFor="payment">Down Payment Amount : </label>
              <input
                type="number"
                name="payment"
                id="payment"
                required
                placeholder="in MAD , EX:1500"
                value={loanDetails.payment}
                onChange={(e) => changeHandler(e)}
              />
            </div>
          </div>

          <div className={loan.form_control}>
            <label htmlFor="comments">Comments : </label>
            <textarea
              type="text"
              id="comments"
              name="comments"
              rows="6"
              cols="50"
              value={loanDetails.comments}
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <button type="submit" className={loan.btn1}>
            {loani ? "Modify" : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Loan;
