import * as yup from "yup";

export const editUserSchemaValidation = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
    mobile: yup
        .number("Must be a number")
        .required("Phone number is required"),
})