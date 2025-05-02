import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  email: {type: String},
  password: {type: String},
})

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;