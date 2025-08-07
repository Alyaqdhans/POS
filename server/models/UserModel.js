import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  username: {type: String},
  email: {type: String},
  password: {type: String},
  lastLogin: {type: Date, default: null},
  permissions: {
    users: {
      read: {type: Boolean},
      add: {type: Boolean},
      edit: {type: Boolean},
      delete: {type: Boolean},
      permission: {type: Boolean}
    },
    products: {
      read: {type: Boolean},
      add: {type: Boolean},
      edit: {type: Boolean},
      delete: {type: Boolean}
    },
    settings: {
      read: {type: Boolean},
      category: {type: Boolean},
      customer: {type: Boolean},
      supplier: {type: Boolean},
      payment: {type: Boolean},
      branch: {type: Boolean}
    },
  },
}, {timestamps: true})

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;