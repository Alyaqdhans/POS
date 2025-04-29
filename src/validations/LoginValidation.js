import * as yup from "yup";

export const loginSchemaValidation = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  password: yup
    .string()
    .min(4)
    .max(20)
    .required("Password is required"),
})