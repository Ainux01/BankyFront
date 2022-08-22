import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { VscAccount } from "react-icons/vsc";
const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(navigate);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      const body = {
        prenom: data.firstName,
        nom: data.lastName,
        email: data.email,
        password: data.password,
      };
      fetch("http://localhost:8080/client/addClient", {
        method: "POST",
        headers: {
          accept: "application.json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/signin");
        }
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log(data);
  //     fetch("http://localhost:8180/admin/realms/Banky/users", {
  //       method: "POST",
  //       headers: {
  //         accept: "application.json",
  //         "Content-type": "application/json",
  //       },
  //       body: {
  //         createdTimestamp: 1588880747548,
  //         username: data.email,
  //         enabled: true,
  //         totp: false,
  //         emailVerified: true,
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         email: data.email,
  //         disableableCredentialTypes: [],
  //         requiredActions: [],
  //         notBefore: 0,
  //         access: {
  //           manageGroupMembership: true,
  //           view: true,
  //           mapRoles: true,
  //           impersonate: true,
  //           manage: true,
  //         },
  //         realmRoles: ["client"],
  //       },
  //     });
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.status >= 400 &&
  //       error.response.status <= 500
  //     ) {
  //       setError(error.response.data.message);
  //     }
  //   }
  // };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/signin">
            <button
              type="button"
              className={styles.white_btn}
              onClick={() => navigate("/signin")}
            >
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <VscAccount
              style={{
                fontSize: "70px",
                color: "#3EA995",
                marginBottom: "25px",
              }}
            />
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
