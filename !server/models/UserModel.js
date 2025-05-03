import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  email: {type: String},
  password: {type: String},
  permissions: {
    users: {
      read: {type: Boolean},
      add: {type: Boolean},
      edit: {type: Boolean},
      delete: {type: Boolean}
    },
    products: {
      read: {type: Boolean},
      add: {type: Boolean},
      edit: {type: Boolean},
      delete: {type: Boolean}
    },
  },
}, {timestamps: true})

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;