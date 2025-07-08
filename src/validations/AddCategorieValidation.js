import * as yup from "yup";

export const addCategorieSchemaValidation = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
})