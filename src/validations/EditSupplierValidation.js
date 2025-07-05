import * as yup from "yup";

export const editSupplierSchemaValidation = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),
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