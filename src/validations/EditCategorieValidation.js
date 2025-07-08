import * as yup from "yup";

export const editCategorieSchemaValidation = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
})