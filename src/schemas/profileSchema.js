import * as Yup from "yup";

export const profileSchema = Yup.object({
  username: Yup.string().min(3, "Username must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  first_name: Yup.string().min(3, "Username must be at least 3 characters"),
  last_name: Yup.string().min(3, "Username must be at least 3 characters"),
});
