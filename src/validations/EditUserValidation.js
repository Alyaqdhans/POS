import * as yup from "yup";

export const editUserSchemaValidation = yup.object().shape({
  email: yup
    .string()
    .email("Not valid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords Don't Match")
    .required("Password is required"),
})