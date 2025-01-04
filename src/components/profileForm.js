// src/components/EditProfile.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "@mui/material";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import { updateProfileRequest } from "../features/profile/profileSlice";
import { profileSchema } from "../schemas/profile";

const fields = [
  { name: "username" },
  { name: "first_name" },
  { name: "last_name" },
  { name: "email", type: "email" },
  { name: "password", type: "password" },
];

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.profile);

  const handleSubmit = (values) => {
    dispatch(updateProfileRequest(user.id, values));
  };

  return (
    <Formik
      initialValues={user}
      validationSchema={profileSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5">Edit Profile</Typography>
            {error && <Typography color="error">{error}</Typography>}

            {fields.map((field) => {
              return (
                <Field
                  key={field.name}
                  name={field.name}
                  type={field?.type ?? "text"}
                  as={TextField}
                  label={field.name}
                  variant="outlined"
                  fullWidth
                  error={touched[field.name] && !!errors[field.name]}
                  helperText={<ErrorMessage name={field.name} />}
                />
              );
            })}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {loading ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
