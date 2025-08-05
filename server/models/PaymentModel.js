import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema({
  name: {type: String},
}, {timestamps: true})

const PaymentModel = mongoose.model("payments", PaymentSchema);
export default PaymentModel;