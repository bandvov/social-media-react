import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegistrationPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "1rem" }}>
      <h1>{t("registration")}</h1>
      <RegistrationForm />
      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: "1fr auto",
        }}
      >
        <Typography>Have account?</Typography>
        <Link to="/login">Login in</Link>
      </Box>
    </div>
  );
};

export default RegistrationPage;
