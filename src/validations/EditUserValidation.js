import * as yup from "yup";

export const editUserSchemaValidation = yup.object().shape({
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