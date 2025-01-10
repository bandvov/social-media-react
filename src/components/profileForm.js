// src/components/EditProfile.js
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField } from "@mui/material";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import { profileSchema } from "../schemas/profileSchema";

const fields = [
  { name: "username" },
  { name: "first_name" },
  { name: "last_name" },
  { name: "email", type: "email" },
  { name: "password", type: "password" },
];

const ProfileForm = ({ profile, loading, error, handleSubmit }) => {
  const [edit, setEdit] = useState(false);

  return (
    <Box>
      <Formik
        initialValues={profile}
        validationSchema={profileSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography color="primary" variant="h5">
                Edit Profile
              </Typography>

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
                    disabled={!edit}
                    error={touched[field.name] && !!errors[field.name]}
                    helperText={<ErrorMessage name={field.name} />}
                  />
                );
              })}

              <Box display={"grid"} gap={4} gridTemplateColumns="1fr 1fr">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  Edit
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {loading ? <CircularProgress size={24} /> : "Save Changes"}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      {loading && <div>loading...</div>}
      {/* Display error message */}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default ProfileForm;
