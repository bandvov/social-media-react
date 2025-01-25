import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  DialogActions,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { addCommentRequest } from "../../features/comments/commentsSlice";
import { useTranslation } from "react-i18next";
const AddCommentDialog = ({ entity_id, author_id, entity_type }) => {
  const { t } = useTranslation();

  const [isDialogOpen, setDialogOpen] = useState(false);

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
    dispatch(
      addCommentRequest({ entity_id, author_id,entity_type, content: values?.content })
    );
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>{t("addComment")}</Button>
      <Dialog open={isDialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{t("addComment")}</DialogTitle>
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
                    <DialogActions>
                      <Button
                        onClick={() => {
                          setDialogOpen(false);
                        }}
                        variant="contained"
                        color="primary"
                      >
                        {t("cancel")}
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        {t("submit")}
                      </Button>
                    </DialogActions>
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
