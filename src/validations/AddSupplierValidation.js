import * as yup from "yup";

export const addSupplierSchemaValidation = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),
  email: yup
    .string()
    .email("Not valid email format"),
  mobile: yup
    .string("Must be a number")
    .matches(/^\d*$/, "Must be a valid number"),
  fax: yup
    .string("Must be a number")
    .matches(/^\d*$/, "Must be a valid number"),
  address: yup
    .string(),
  tax: yup
    .string("Must be a number")
    .matches(/^\d*$/, "Must be a valid number"),
})