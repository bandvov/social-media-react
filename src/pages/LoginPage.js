import React from "react";
import LoginForm from "../components/LoginForm";
import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Box style={{ maxWidth: 400, margin: "auto", padding: "1rem" }}>
      <Typography color="primary" variant="h1">
        {t("login")}
      </Typography>
      <LoginForm />
      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: "1fr auto",
        }}
      >
        <Typography color="text.primary">{t("dontHaveAccount")}</Typography>
        <Link component={RouterLink} to="/registration">
          {t("signup")}
        </Link>
      </Box>
    </Box>
  );
};

export default LoginPage;
