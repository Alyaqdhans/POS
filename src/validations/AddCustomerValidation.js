import * as yup from "yup";

export const addCustomerSchemaValidation = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
    email: yup
        .string()
        .email("Not valid email format"),
    mobile: yup
        .string()
        .matches(/^\d*$/, "Must be a valid number"),
})