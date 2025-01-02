import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "./i18n";
import RegistrationPage from "./pages/RegistrationPage";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./styles/theme";

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
