import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Box, Button, TextField } from "@mui/material";
import loginSchema from "../schemas/loginSchema";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../features/auth/authSlice";

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    console.log({ values });
    dispatch(loginRequest(values));
  };

  return (
    <Box mt={2}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
        validateOnBlur
      >
        {({ touched, errors }) => {
          return (
            <Form>
              <Field
                name="email"
                as={TextField}
                label={t("email")}
                variant="outlined"
                fullWidth
                error={touched.email && !!errors.email}
                helperText={<ErrorMessage name="email" />}
                style={{
                  marginBottom: "1rem",
                }}
              />
              <Field
                name="password"
                type="password"
                as={TextField}
                label="Password"
                variant="outlined"
                fullWidth
                error={touched.password && !!errors.password}
                helperText={<ErrorMessage name="password" />}
                style={{
                  marginBottom: "1rem",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  marginBottom: "1rem",
                }}
              >
                {t("submit")}
              </Button>
            </Form>
          );
        }}
      </Formik>
      {loading && <div>loading...</div>}
      {/* Display error message */}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </Box>
  );
};

export default LoginForm;
