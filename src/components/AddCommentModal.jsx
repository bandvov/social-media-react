import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { addCommentRequest } from "../features/comments/commentsSlice";
import { useTranslation } from "react-i18next";
const AddCommentDialog = () => {
  const { t } = useTranslation();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const { loading, error } = useSelector((state) => state.comments);

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);
  const dispatch = useDispatch();

  const initialValues = {
    content: "",
  };

  const validationSchema = Yup.object({
    content: Yup.string().required("Comment is required"),
  });

  const handleSubmit = (values) => {
    dispatch(addCommentRequest(values));
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>Add Comment</Button>
      <Dialog open={isDialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur
          >
            {({ touched, errors }) => {
              return (
                <Form>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Field
                      as={TextField}
                      name="content"
                      label="Content"
                      color="primary"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      error={touched.content && !!errors.content}
                      helperText={<ErrorMessage name="content" />}
                      style={{
                        marginBottom: "1rem",
                      }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                      {t("submit")}
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCommentDialog;
