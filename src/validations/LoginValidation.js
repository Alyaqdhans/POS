import * as yup from "yup";

export const loginSchemaValidation = yup.object().shape({
  email: yup
    .string()
    .email("Not valid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(5)
    .max(20)
    .required("Password is required"),
})