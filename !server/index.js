import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./models/UserModel.js";
import dotenv from "dotenv";

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
      response.send({msg: "Couldn't find the email"});
    } else if (user.password !== password) {
      response.send({msg: "Incorrect password"});
    } else {
      response.send({email: user, msg: "Login successful"});
    }
  }
  catch (error) {
    response.send({error: "Unxpected error oucerred"});
  }
});

// Logout
app.post("/logout", async (request, response) => {
  response.send({msg: "Logged out successfully"});
});

// Add users
app.post("/addUser", async (request, response) => {
  try {
    const { username, email, password } = request.body;
    const addUser = UserModel({username, email, password});
    await addUser.save();
  } catch (error) {
    response.send({error: "Unxpected error oucerred"})
  }
})

// Get Users
app.get("/getUsers", async (request, response) => {
  try {
    const userList = await UserModel.find();
    response.send({ userList: userList});
  } catch (error) {
    response.send({ error: "An error oucerred" });
  }
});

app.listen(process.env.PORT, () => console.log(`server is connected to port ${process.env.PORT}`));