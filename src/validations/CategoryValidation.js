import * as yup from "yup";

export const categorySchemaValidation = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
})