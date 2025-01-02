import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  NavLink,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import LoginPage from "./pages/LoginPage";
import "./i18n";
import RegistrationPage from "./pages/RegistrationPage";

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
    {/* <NavLink to={"/login"}>log in</NavLink>
    <NavLink to={"/registration"}>sign up</NavLink> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;
