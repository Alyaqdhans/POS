import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    mobile: {type: Number},
}, {timestamps: true})

const CustomerModel = mongoose.model("customers", CustomerSchema);
export default CustomerModel;