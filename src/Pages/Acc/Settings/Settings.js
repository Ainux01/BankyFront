import React, { useLayoutEffect } from "react";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import settings from "./settings.module.css";
import { MdOutlineAlternateEmail, MdOutlineWork } from "react-icons/md";
import { BsFillFilePersonFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { FaAddressCard } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
const Settings = () => {
  const [client, setClient] = useState({});
  const getClientByEmail = async (email) => {
    const response = await fetch(
      `https://banky01.herokuapp.com/client/getClientByEmail/${email}`
    );
    const data = await response.json();
    setClient(data);
    console.log(client);
  };
  useLayoutEffect(() => {
    if (sessionStorage.getItem("email")) {
      getClientByEmail(sessionStorage.getItem("email"));
    }
  }, []);
  useEffect(() => {
    client && console.log(client);
  }, [client]);
  const submitHandler = (e) => {
    e.preventDefault();
    try {
      fetch(
        `https://banky01.herokuapp.com/client/updateClient/${client.email}`,
        {
          method: "PUT",
          headers: {
            accept: "application.json",
            "Content-type": "application/json",
          },
          // mode: "no-cors",
          body: JSON.stringify(client),
        }
      ).then((response) => console.log(response));
    } catch (error) {}
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setClient({ ...client, [name]: value });
  };
  return (
    <div className={settings.container}>
      <div>
        <div className="align_center">
          <h2 className={settings.heading}>
            <span style={{ color: "#ffb74d" }}>P</span>ersonal Details
          </h2>
        </div>

        <div className={settings.infos}>
          <div className={settings.profile}>
            <FcBusinessman className={settings.profileimage} />
          </div>

          <div className={settings.infosection}>
            <div className={settings.info}>
              <MdOutlineAlternateEmail className={settings.icon} />

              <p className={settings.parag}>{client?.email}</p>
            </div>
            <div className={settings.info}>
              <BsFillFilePersonFill className={settings.icon} />
              <p className={settings.parag}>
                {client?.nom} {client?.prenom}
              </p>
            </div>
            <div className={settings.info}>
              <AiFillPhone className={settings.icon} />
              <p className={settings.parag}>{client.phone}</p>
            </div>
          </div>
        </div>
      </div>
      <form className={settings.form} onSubmit={submitHandler}>
        <div className={settings.primaryContainer}>
          <div className={settings.secondaryContainer}>
            <FaAddressCard
              className={settings.icon}
              style={{ fontSize: "50px", marginTop: "-10px" }}
            />

            <div className={settings.form_control}>
              <label htmlFor="city">City : </label>
              <input
                type="text"
                name="city"
                id="city"
                value={client?.city}
                onChange={changeHandler}
              />
            </div>
            <div className={settings.form_control}>
              <label htmlFor="state">State/Province : </label>
              <input
                type="text"
                name="state"
                id="state"
                value={client?.state}
                onChange={changeHandler}
              />
            </div>
            <div className={settings.form_control}>
              <label htmlFor="postal">Postal/Zip Code : </label>
              <input
                type="text"
                name="postal"
                id="postal"
                value={client?.postal}
                onChange={changeHandler}
              />
            </div>
            <div className={settings.form_control}>
              <label htmlFor="street">Street Address : </label>
              <input
                type="text"
                name="street"
                id="street"
                value={client?.street}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div
            className={settings.secondaryContainer}
            style={{ marginTop: "10px" }}
          >
            <MdOutlineWork
              className={settings.icon}
              style={{ fontSize: "50px", marginBottom: "-10px" }}
            />
            <div className={settings.form_control}>
              <label htmlFor="employer">Present Employer : </label>
              <input
                type="text"
                name="employer"
                id="employer"
                value={client?.employer}
                onChange={changeHandler}
              />
            </div>
            <div className={settings.form_control}>
              <label htmlFor="occupation">Occupation : </label>
              <input
                type="text"
                name="occupation"
                id="occupation"
                value={client?.occupation}
                onChange={changeHandler}
              />
            </div>
            <div className={settings.form_control}>
              <label htmlFor="income">Gross Monthly Income : </label>
              <input
                type="text"
                name="income"
                id="income"
                value={client?.income}
                onChange={changeHandler}
              />
            </div>
            <div className={settings.form_control}>
              <label htmlFor="payment">Down Payment Amount : </label>
              <input
                type="text"
                name="payment"
                id="payment"
                value={client?.payment}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>
        <div className="align_center" style={{ marginTop: "25px" }}>
          <button
            type="submit"
            className={settings.btn}
            style={{ alignItems: "center" }}
          >
            <FiSave style={{ fontSize: "20px" }} />
            {"  "}Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
