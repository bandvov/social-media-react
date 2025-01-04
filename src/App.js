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
import FollowersPage from "./pages/FollowersPage";
import FolloweesPage from "./pages/FolloweesPage";

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { user } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Layout userId={user.id}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/profile" element={<ProfilePage userId={user.id} />} />
            <Route path="/followers" element={<FollowersPage />} />
            <Route path="/followees" element={<FolloweesPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
