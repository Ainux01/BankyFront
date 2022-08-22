import React, { useState, useEffect } from "react";
import dash from "./solde.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiShow, BiHide } from "react-icons/bi";
const Index = ({ numero, solde, showSidebar, setShowSidebar }) => {
  const [show, setShow] = useState(false);
  const showhideHandler = () => {
    setShow((prev) => !prev);
  };
  return (
    <div>
      <div class={dash.balance}>
        <div>
          {!showSidebar && (
            <button
              onClick={() => setShowSidebar(true)}
              title="Open Menu"
              className={dash.sideBtn}
            >
              <GiHamburgerMenu />
            </button>
          )}
          <p class={dash.balance__label}>Account Number</p>
          <p
            class={dash.balance__date}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {show && numero ? numero : "**********"}
            <button
              type="button"
              className={dash.btn}
              onClick={showhideHandler}
            >
              {show ? (
                <BiHide style={{ fontSize: "18px" }} />
              ) : (
                <BiShow style={{ fontSize: "18px" }} />
              )}
            </button>
          </p>
        </div>
        <div>
          <p class={dash.balance__label}>Current balance</p>
          <p class={dash.balance__date}>
            As of <span class={dash.date}>{new Date().toLocaleString()}</span>
          </p>
        </div>

        <p class={dash.balance__value}>{solde ? solde : "0000"} MAD</p>
      </div>
    </div>
  );
};

export default Index;
