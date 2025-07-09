import * as yup from "yup";

export const editCategorySchemaValidation = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
})