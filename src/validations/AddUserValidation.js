import * as yup from "yup";

export const addUserSchemaValidation = yup.object().shape({
  username: yup
    .string()
    .notOneOf(["admin"], "This username is not allowed")
    .required("Username is required"),
  email: yup
    .string()
    .email("Not valid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(5)
    .max(20)
    .required("Password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords Don't Match")
    .required("Password is required"),
})