import React, { useState } from "react";
import logo from "../../icones/debit-card.png";
import { links, linksbottom } from "../../data";
import sidebar from "./sidebar.module.css";
import { useLocation, Link as LinkR } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
const Sidebar = ({ showSidebar, setShowSidebar }) => {
  let location = useLocation();

  return (
    <aside
      className={`${sidebar.sidebar} ${showSidebar && sidebar.showSidebar}`}
    >
      <div className={sidebar.header1}>
        <div className={sidebar.header}>
          <img src={logo} className={sidebar.logo} alt="banky" />
          <h2 className={sidebar.heading}>
            <span style={{ color: "#3D8AC7" }}>B</span>anky
          </h2>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setShowSidebar(false)}
            className={sidebar.closeBtn}
          >
            <AiOutlineClose title="close" />
          </button>
        </div>
      </div>

      <ul className={sidebar.links} style={{ marginTop: "-20px" }}>
        {links.map((link) => {
          const { id, url, text, icon } = link;

          return (
            <li key={id} style={{ listStyle: "none" }}>
              <a
                href={url}
                className={`${url === location.pathname ? sidebar.active : ""}`}
              >
                {icon}
                {text}
              </a>
            </li>
          );
        })}
      </ul>
      <ul className={`${sidebar.links}`}>
        {linksbottom.map((link) => {
          const { id, url, text, icon } = link;
          return (
            <li key={id} style={{ listStyle: "none" }}>
              <a
                href={url}
                className={`${url === location.pathname ? sidebar.active : ""}`}
              >
                {icon}
                {text}
              </a>
            </li>
          );
        })}
        <li
          key={new Date().getMilliseconds().toString()}
          style={{ listStyle: "none" }}
        >
          <a href="/" onClick={() => sessionStorage.clear()}>
            <HiOutlineLogout />
            Log Out
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
{
  /* <ul className="social-icons">
        {social.map((link) => {
          const { id, url, icon } = link;
          return (
            <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          );
        })}
      </ul> */
}
