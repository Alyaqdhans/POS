import mongoose from "mongoose";

const SystemSchema = mongoose.Schema({
  brand: {type: String},
  vat: {type: Number},
  logo: {type: String},
  currency: {type: String},
  receiptMsg: {type: String}
}, {timestamps: true})

const SystemModel = mongoose.model("systems", SystemSchema);
export default SystemModel;