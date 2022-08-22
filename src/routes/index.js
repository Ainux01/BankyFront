import React from "react";
import Accueil from "../Pages/Accueil/index";
import Signin from "../Pages/Signin/index";
import Acc from "../Pages/Acc/acc";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/signin" element={<Signin isSignin={true} />} />
        <Route path="/signup" element={<Signin isSignup={false} />} />
        <Route path="/accueil/dashboard" element={<Acc isDashboard={true} />} />
        <Route path="/accueil/activity" element={<Acc isActivity={true} />} />
        <Route path="/accueil/loans" element={<Acc areLoans={true} />} />
        <Route path="/accueil/newloan" element={<Acc isLoan={true} />} />
        <Route
          path="/accueil/loan/redirect"
          element={<Navigate to="/accueil/newloan" />}
        />
        <Route path="/accueil/loan/:id" element={<Acc isLoan={true} />} />
        <Route
          path="/accueil/newloan/:amount"
          element={<Acc isLoan={true} />}
        />

        <Route path="/accueil/crypto" element={<Acc isCrypto={true} />} />
        <Route path="/accueil/settings" element={<Acc isSettings={true} />} />
        <Route path="/accueil/analytics" element={<Acc isAnalytics={true} />} />
        <Route path="/accueil/*" element={<Acc />} />

        {/* <Route path="/message" element={<Message />} /> */}
      </Routes>
    </Router>
  );
};

export default Index;
