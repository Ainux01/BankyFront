import React from "react";
import Navbar from "../../Components/Navbar/index";
import Home from "../../Components/Home/index";
import Footer from "../../Components/Footer/index";
const index = () => {
  return (
    <>
      <Navbar showsignbtn={true} />
      <Home />
      <Footer />
    </>
  );
};

export default index;
