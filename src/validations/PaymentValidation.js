import * as yup from "yup";

export const paymentSchemaValidation = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),
})