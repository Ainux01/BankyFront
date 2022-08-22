import { useState } from "react";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { encode } from "base-64";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  // console.log(window.btoa("nasser@gmail.com:12345678"));
  let navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  //todo : ////////////////
  // var myHeaders = new Headers();
  // myHeaders.append(
  //   "Authorization",
  //   "Basic bmFzc2VyQGdtYWlsLmNvbToxMjM0NTY3OA=="
  // );
  // myHeaders.append("Cookie", "JSESSIONID=2261A539350D622E84FAD10C4447EE48");

  // var requestOptions = {
  //   method: "GET",
  //   headers: myHeaders,
  //   redirect: "follow",
  // };

  // fetch("http://banky01.herokuapp.com/getSession", requestOptions)
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));
  //todo : ////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email && data.password) {
      console.log(data);
      // console.log(btoa(`${data.email}:${data.password}`));
      var headers = new Headers();
      headers.set(
        "Authorization",
        "Basic " + btoa(`${data.email}:${data.password}`)
      );
      let response = await fetch(
        `http://banky01.herokuapp.com/compte/getCurrentSession`,
        {
          method: "GET",
          // mode: "no-cors",
          headers: headers,
        }
      );
      const result = await response.text();
      if (result) {
        sessionStorage.setItem("email", result);
        navigate("../accueil/dashboard");
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <RiAccountPinCircleFill
              style={{
                fontSize: "70px",
                color: "#3D8AC7",
                marginBottom: "25px",
              }}
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
              Sing In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
