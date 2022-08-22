import React, { useEffect, useState } from "react";
import ops from "./operations.module.css";
import axios from "axios";
import { Link as LinkR } from "react-router-dom";
const Index = ({ numero, solde, getCompteByEmail }) => {
  console.log(numero, solde);
  const [transferDetails, setTransferDetails] = useState({
    transferTo: "",
    amount: "",
  });

  const [loanAmount, setLoanAmount] = useState("");

  const changeTransferDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setTransferDetails({ ...transferDetails, [name]: value });
  };

  const submitTransfer = (e) => {
    e.preventDefault();
    if (transferDetails.transferTo && transferDetails.amount && numero) {
      if (transferDetails.amount > solde) {
        alert(
          "You can't make this payment , the amount is higher than your balance"
        );
      } else if (transferDetails.transferTo == numero) {
        alert("You can't make this payment");
      } else {
        axios
          .post(
            `http://localhost:8080/compte/${numero}/transfermoney/${transferDetails.transferTo}/${transferDetails.amount}`
          )
          .then((response) => {
            console.log(response);
            getCompteByEmail(sessionStorage.getItem("email")); //the id will come from the session
          })
          .catch((error) => console.error(error));
      }
    } else {
      alert("Empty Values");
    }
    setTransferDetails({
      transferTo: "",
      amount: "",
    });
  };

  const submitLoan = (e) => {
    e.preventDefault();
    if (loanAmount) {
      console.log(loanAmount);
      setLoanAmount("");
    }
  };

  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div id="transferMoney" className={`${ops.operation} ${ops.transfer}`}>
          <h2>Transfer money</h2>
          <form className={`${ops.form}`} onSubmit={submitTransfer}>
            <input
              type="text"
              className={`${ops.input}`}
              name="transferTo"
              placeholder="Enter an Email"
              value={transferDetails.transferTo}
              onChange={(e) => changeTransferDetails(e)}
            />
            <input
              type="number"
              className={`${ops.input}`}
              name="amount"
              value={transferDetails.amount}
              onChange={(e) => changeTransferDetails(e)}
            />
            <button type="submit" className={ops.btn}>
              &rarr;
            </button>
            <label className={ops.label}>Transfer to</label>
            <label className={ops.label}>Amount</label>
          </form>
        </div>
        <div id="requestLoan" className={`${ops.operation} ${ops.loan}`}>
          <h2>Request Loan</h2>
          <form className={`${ops.form}`} onSubmit={submitLoan}>
            <label className={ops.label}>Amount</label>
            <input
              type="number"
              className={`${ops.input}`}
              style={{ marginLeft: "-30px" }}
              name="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <LinkR to={`/accueil/newloan/${loanAmount}`}>
              <button
                type="submit"
                className={ops.btn}
                style={{ marginLeft: "-30px" }}
              >
                &rarr;
              </button>
            </LinkR>
          </form>
        </div>
        <div id="closeAccount" className={`${ops.operation} ${ops.close}`}>
          <h2>Close Account</h2>
          <form className={`${ops.form}`}>
            <input type="text" className={`${ops.input}`} />
            <input type="password" className={`${ops.input}`} />
            <button type="submit" className={ops.btn}>
              &rarr;
            </button>
            <label
              className={ops.label}
              style={{ fontSize: "1.5rem", textAlign: "center" }}
            >
              Email
            </label>
            <label
              className={ops.label}
              style={{ fontSize: "1.5rem", textAlign: "center" }}
            >
              Password
            </label>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
