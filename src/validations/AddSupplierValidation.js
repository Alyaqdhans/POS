import * as yup from "yup";

export const addSupplierSchemaValidation = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),
  email: yup
    .string()
    .email("Not valid email format")
    .required("Email is required"),
  mobile: yup
    .number()
    .required("Phone number is required"),
  fax: yup
    .number(),
  address: yup
    .string()
    .required("Address is required"),
  tax: yup
    .number(),
})