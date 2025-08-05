import mongoose from "mongoose";

const BranchSchema = mongoose.Schema({
  name: {type: String},
  mobile: {type: String},
}, {timestamps: true})

const BranchModel = mongoose.model("branches", BranchSchema);
export default BranchModel;