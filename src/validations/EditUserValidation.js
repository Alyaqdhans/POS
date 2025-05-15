import * as yup from "yup";

export const editUserSchemaValidation = yup.object().shape({
  username: yup
    .string()
    .notOneOf(["admin"], "This username is not allowed")
    .required("Username is required"),
  password: yup
    .string()
    .nullable()
    .test('empty-or-valid', 'Password must be between 5-20 characters', value => {
      if (!value) return true; // Skip validation if empty
      return value.length >= 5 && value.length <= 20;
    }),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords Don't Match"),
})