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
import UserPage from "./pages/UserPage";
import PostDetailPage from "./pages/PostDetailPage";
import SearchPage from "./pages/SearchPage";
import AdminUsersProfilePage from "./pages/AdminUsersProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/users" element={<AdminUsersProfilePage />} />
            <Route path="/registration" element={<RegistrationPage />} />

            <Route path="/search" element={<SearchPage />} />

            <Route path="/user/:userId" element={<UserPage />}>
              <Route path="posts" element={<PostsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="posts/:postId" element={<PostDetailPage />} />
              <Route path="edit" element={<EditProfilePage />} />
              <Route path="followers" element={<FollowersPage />} />
              <Route path="followees" element={<FolloweesPage />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
