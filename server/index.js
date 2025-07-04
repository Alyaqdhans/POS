import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./models/UserModel.js";
import dotenv from "dotenv";
import CustomerModel from "./models/CustomerModel.js";

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster`);

// Login
app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({email: email});
    if (!user) {
      response.status(404).json({msg: "Couldn't find the email"});
    } else if (user.password !== password) {
      response.status(404).json({msg: "Incorrect password"});
    } else {
      // update lastLogin without changing timestamps
      await UserModel.findByIdAndUpdate(
        user._id, 
        { lastLogin: new Date() },
        { timestamps: false }
      );
      response.send({email: user, msg: "Logged in successfully"});
    }
  }
  catch (error) {
    response.status(500).json({error: "Unxpected error oucerred"});
  }
});

// Logout
app.post("/logout", async (request, response) => {
  response.send({msg: "Logged out successfully"});
});

// Get Users
app.get("/getUsers", async (request, response) => {
  try {
    const userList = await UserModel.find();
    response.send({userList: userList});
  } catch (error) {
    response.status(500).json({error: "Unexpected error oucerred"});
  }
});

// Add users
app.post("/addUser", async (request, response) => {
  try {
    const { username, email, password, permissions } = request.body;
    const user = await UserModel.findOne({email: email});
    if (user) {
      response.status(409).json({msg: "Email used already exists"});
    } else {
      const addUser = UserModel({username, email, password, permissions});
      await addUser.save();
      response.send({msg: "User added successfully", addUser: addUser});
    }
  } catch (error) {
    response.status(500).json({error: "Failed to add user"});
  }
})

// Delete User
app.delete("/deleteUser/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    await UserModel.findByIdAndDelete(userId);
    response.send({msg: "User deleted successfully"});
  } catch (error) {
    response.status(500).json({error: "Faild to delete user"});
  }
});

// Edit User
app.put("/editUser/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const {username, password, permissions} = request.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, password, permissions },
      { new: true }
    );
    response.send({msg: "User updated successfully", updatedUser});
  } catch (error) {
    response.status(500).json({error: "Failed to update user"});
  }
});

// Add Customer
app.post("/addCustomer", async (request, response) => {
  try {
    const { name, email, mobile } = request.body;
    const customer = await CustomerModel.findOne({email: email});
    if (customer) {
      response.status(409).json({msg: "Email used already exists"});
    } else {
      const addCustomer = CustomerModel({name, email, mobile});
      await addCustomer.save();
      response.send({msg: "Customer addes successfully", addCustomer});
    }
  } catch (error) {
    response.status(500).json({error: "Failed to add customer"});
  }
});

// Get Customers
app.get("/getCustomers", async (request, response) => {
  try {
    const customerList = await CustomerModel.find();
    response.send({customerList: customerList});
  } catch (error) {
    response.status(500).json({error: "Unexpected error oucerred"});
  }
});

app.listen(process.env.PORT, () => console.log(`server is connected to port ${process.env.PORT}`));