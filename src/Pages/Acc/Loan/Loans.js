import React, { useState, useEffect, useLayoutEffect } from "react";
import loan from "./loan.module.css";
import { Link as LinkR } from "react-router-dom";
import { MdPendingActions } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
const Loans = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();
  const getLoansByEmail = async (email) => {
    const resp = await fetch(
      `http://banky01.herokuapp.com/loan/getLoans/${email}`
    );
    const data = await resp.json();
    setLoans(data);
  };
  useEffect(() => {
    getLoansByEmail(sessionStorage.getItem("email"));
    // loans.length === 0 && navigate("/accueil/loan/redirect");
  }, []);
  useEffect(() => {
    console.log(loans);
  }, [loans]);
  const closeLoan = (id) => {
    //
  };
  return (
    <div className={loan.loansContainer}>
      <div className="align_center">
        <h2 className={loan.heading}>Loans Demands</h2>
      </div>

      <table className={loan.table} border={1}>
        <tr className={loan.header}>
          <th className={loan.title}>First Name</th>
          <th className={loan.title}>Last Name</th>
          <th className={loan.title}>Amount</th>
          <th className={loan.title}>Date</th>
          <th className={loan.title}>State</th>
          <th className={loan.title}>Operations</th>
        </tr>

        {loans?.map((loan) => {
          const { id, amount, date, client, status } = loan;
          return (
            <tr key={id}>
              <td>
                <p
                  className={loan.info}
                  style={{
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontSize: 15,
                  }}
                >
                  {client.prenom}
                </p>
              </td>
              <td className={loan.info}>
                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontSize: 15,
                  }}
                >
                  {client.nom}
                </p>
              </td>
              <td className={loan.info}>
                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontSize: 15,
                  }}
                >
                  {amount} MAD
                </p>
              </td>
              <td className={loan.info}>
                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontSize: 15,
                  }}
                >
                  {date}
                </p>
              </td>
              <td
                className={loan.info}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {status === "Pending" ? (
                  <MdPendingActions
                    style={{
                      color: "#3680C1",
                      fontSize: "24px",
                    }}
                  />
                ) : (
                  <FcApproval
                    style={{
                      fontSize: "24px",
                    }}
                  />
                )}
                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontSize: 15,
                  }}
                >
                  {status}
                </p>
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <button
                      type="button"
                      className={loan.but}
                      style={{
                        marginRight: "10px",
                        padding: "7px 14px",
                        borderRadius: "20px",
                        border: "none",
                        overflow: "hidden",
                        backgroundColor: "#D7504C",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => closeLoan(id)}
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <LinkR
                      type="button"
                      className={loan.but}
                      style={{
                        textDecoration: "none",
                        marginRight: "10px",
                        padding: "7px 15px",
                        fontSize: "13px",
                        borderRadius: "20px",
                        border: "none",
                        overflow: "hidden",
                        backgroundColor: "#3680C1",
                        color: "white",
                        cursor: "pointer",
                      }}
                      to={`/accueil/loan/${id}`}
                    >
                      Modify
                    </LinkR>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
      <div className="align_center">
        <LinkR className={loan.btn1} to="/accueil/newloan">
          Request a new Loan
        </LinkR>
      </div>
    </div>
  );
};

export default Loans;
