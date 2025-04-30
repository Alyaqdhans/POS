import express, { response } from "express";
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
    const { username, password } = request.body;
    const user = await UserModel.findOne({username: username});
    if (!user) {
      response.status(500).json({msg: "Couldn't find the user"});
    } else if (user.password !== password) {
      response.status(500).json({msg: "Incorrect password"});
    } else {
      response.send({username: user, msg: "Login successful"});
    }
  }
  catch (error) {
    response.status(500).json({error: "Unxpected error oucerred"});
  }
});

app.post("/logout", async (request, response) => {
  response.send({msg: "logged out successfully"});
});

app.listen(process.env.PORT, () => console.log(`server is connected to port ${process.env.PORT}`));