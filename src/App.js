import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "./i18n";
import RegistrationPage from "./pages/RegistrationPage";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./styles/theme";
import FollowersPage from "./pages/FollowersPage";
import FolloweesPage from "./pages/FolloweesPage";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import EditProfilePage from "./pages/EditProfilePage";

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { user } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Layout userId={user.id}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/user/:userId/posts" element={<PostsPage />} />
            <Route path="/user/:userId/profile" element={<PostsPage />} />
            <Route
              path="/user/:userId/edit-profile"
              element={<EditProfilePage />}
            />
            <Route path="/user/:userId/followers" element={<FollowersPage />} />
            <Route path="/user/:userId/followees" element={<FolloweesPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
