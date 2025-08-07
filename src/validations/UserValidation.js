import * as yup from "yup";

export const userSchemaValidation = yup.object().shape({
  username: yup
    .string()
    .transform(value => value?.toLowerCase())
    // this is to allow admin to edit his details
    .when('$isAdmin', {
      is: true,
      then: (schema) => schema,
      otherwise: (schema) => schema
        .notOneOf(["admin"], "This username is not allowed")
        .required("Username is required"),
    })
    .required("Username is required"),
  email: yup
    .string()
    .email("Not valid email format")
    .required("Email is required"),
  password: yup
    .string()
    .max(20),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords Don't Match")
})