import React, { useEffect, useState } from "react";
import accueil from "./acc.module.css";
import Sidebar from "../../Components/Sidebar/index";
import Solde from "./components/Solde/index";
import Operations from "./components/Operations/index";
import History from "./components/History/index";
import Activity from "./Activity/Activity";
import Loan from "./Loan/Loan";
import Analytics from "./Analytics/Analytics";
import Crypto from "./Crypto/Crypto";
import Loans from "./Loan/Loans";
import Settings from "./Settings/Settings";
const ConnectedAccueil = ({
  isDashboard,
  isActivity,
  areLoans,
  isLoan,
  isAnalytics,
  isCrypto,
  isSettings,
}) => {
  const [currencies, setCurrencies] = useState([]);
  const [compte, setCompte] = useState({});
  const [virements, setVirements] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  // console.log(new Date().toLocaleDateString("sv"));
  const getCompteByEmail = async (email) => {
    const response = await fetch(
      `https://banky01.herokuapp.com/compte/getCompteByEmail/${email}`
    );
    const result = await response.json();
    setCompte(result);
  };

  const getVirements = async (numero) => {
    const response = await fetch(
      "https://banky01.herokuapp.com/compte/getVirements"
    );
    const data = await response.json();
    const newData = data.filter((virement) => {
      const { debiteur, recepteur } = virement;
      return debiteur == numero || recepteur == numero;
    });
    setVirements(newData);
  };

  useEffect(() => {
    getCompteByEmail(sessionStorage.getItem("email"));
  }, []);
  useEffect(() => {
    getVirements(compte?.numero);
  }, [compte]);
  useEffect(() => {
    console.log(virements);
  }, [virements]);
  return (
    <article className={accueil.article}>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div
        className={`${accueil.accueil} ${showSidebar && accueil.accueilShow}`}
      >
        {isDashboard && (
          <>
            <Solde
              solde={compte?.solde}
              numero={compte?.numero}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />

            <div className={accueil.section}>
              <History
                operations={compte?.operations}
                virements={virements}
                numero={compte.numero}
              />
              <Operations
                className={accueil.operations}
                numero={compte?.numero}
                solde={compte?.solde}
                getCompteByEmail={getCompteByEmail}
              />
            </div>
          </>
        )}

        {isActivity && (
          <>
            <Solde
              solde={compte?.solde}
              numero={compte?.numero}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
            <Activity
              numero={compte?.numero}
              solde={compte?.solde}
              showSidebar={showSidebar}
            />
          </>
        )}
        {isCrypto && (
          <Crypto showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        )}
        {isAnalytics && <Analytics />}
        {areLoans && (
          <>
            <Solde
              solde={compte?.solde}
              numero={compte?.numero}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
            <Loans />
          </>
        )}
        {isLoan && (
          <>
            <Solde
              solde={compte?.solde}
              numero={compte?.numero}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
            <Loan />
          </>
        )}
        {isSettings && (
          <>
            <Solde
              solde={compte?.solde}
              numero={compte?.numero}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
            <Settings />
          </>
        )}
      </div>
    </article>
  );
};

export default ConnectedAccueil;
