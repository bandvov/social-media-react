import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "./i18n";
import RegistrationPage from "./pages/RegistrationPage";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
