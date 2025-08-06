import * as yup from "yup";

export const systemSchemaValidation = yup.object().shape({
  brand: yup
    .string()
    .required("Brand is required")
    .max(25)
    .min(5),
  logo: yup
    .mixed()
    .test("fileType", "Only image files are allowed", value => {
      if (!value || !value.length || typeof value === 'string') return true
      return value[0].type.startsWith("image/");
    })
    .test("fileSize", function(value) {
      if (!value || !value.length || typeof value === 'string') return true;
      const fileSize = (value[0].size / 1024 / 1024).toFixed(2);
      if (fileSize > 2) return this.createError({
        message: `File size too large (${fileSize}MB). Max size is 2MB`
      });
      return true;
    }),
  vat: yup
    .number()
    .typeError("VAT must be a valid number")
    .max(100)
    .min(0),
  currency: yup
    .string()
    .required("Currency is required"),
  receiptMsg: yup
    .string()
    .max(130, "Message must be at most 130 characters")
})