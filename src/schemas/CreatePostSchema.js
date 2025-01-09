import * as Yup from "yup";

// Form validation schema
export const createPostSchema = Yup.object({
  content: Yup.string().required("Content is required"),
});
