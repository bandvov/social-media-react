import React from "react";
import LoginForm from "../components/LoginForm";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Box style={{ maxWidth: 400, margin: "auto", padding: "1rem" }}>
      <Typography variant="h1">{t("login")}</Typography>
      <LoginForm />
      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: "1fr auto",
        }}
      >
        <Typography>Don't have account?</Typography>
        <Link to="/registration">Sign up</Link>
      </Box>
    </Box>
  );
};

export default LoginPage;
