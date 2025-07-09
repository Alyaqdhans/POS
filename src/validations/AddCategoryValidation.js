import * as yup from "yup";

export const addCategorySchemaValidation = yup.object().shape({
    name: yup
        .string()
        .required("Name is required"),
})