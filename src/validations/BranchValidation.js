import * as yup from "yup";

export const branchSchemaValidation = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),
  mobile: yup
    .string()
    .matches(/^\d*$/, "Must be a valid number"),
})