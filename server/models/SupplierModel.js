import mongoose from "mongoose";

const SupplierSchema = mongoose.Schema({
  name: {type: String},
  email: {type: String},
  mobile: {type: String},
  fax: {type: String},
  address: {type: String},
  tax: {type: String},
}, {timestamps: true})

const SupplierModel = mongoose.model("suppliers", SupplierSchema);
export default SupplierModel;