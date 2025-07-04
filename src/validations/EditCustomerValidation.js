import * as yup from "yup";

export const editUserSchemaValidation = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
    mobile: yup
        .string()
        .required("Phone number is required"),
})