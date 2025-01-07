import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  TextField,
  Container,
} from "@mui/material";
import { createPostRequest } from "../../features/posts/postsSlice";

const CreatePostForm = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.post);

  // Form validation schema
  const validationSchema = Yup.object({
    content: Yup.string().required("Content is required"),
  });

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    console.log({ values });

    dispatch(createPostRequest(values));
    resetForm();
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Create a New Post
        </Typography>

        {loading && <CircularProgress />}
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Formik
          initialValues={{ content: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
        >
          {({ touched, errors }) => (
            <Form>
              <Field
                as={TextField}
                name="content"
                label="Content"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={touched.email && !!errors.email}
                helperText={<ErrorMessage name="email" />}
                style={{
                  marginBottom: "1rem",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default CreatePostForm;
