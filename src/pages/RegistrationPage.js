import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegistrationPage = () => {
  const { t } = useTranslation();

  return (
    <Box style={{ maxWidth: 400, margin: "auto", padding: "1rem" }}>
      <Typography color="primary" variant="h1">
        {t("registration")}
      </Typography>
      <RegistrationForm />
      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: "1fr auto",
        }}
      >
        <Typography>Have account?</Typography>
        <Link color="primary" component={RouterLink} to="/login">
          Login in
        </Link>
      </Box>
    </Box>
  );
};

export default RegistrationPage;
