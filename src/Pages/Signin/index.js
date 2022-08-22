import React from "react";
import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/index";
import Login from "../../Components/Login/index";
import Signup from "../../Components/Singup/index";
const index = ({ isSignin }) => {
  return (
    <>
      <Navbar showsignbtn={false} />

      {isSignin ? <Login /> : <Signup />}

      <Footer />
    </>
  );
};

export default index;
