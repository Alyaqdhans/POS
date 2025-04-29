import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./models/UserModel.js";

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://admin:admin@cluster.xhgyf5c.mongodb.net/pos?retryWrites=true&w=majority&appName=Cluster');

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      res.status(500).json({ msg: "Couldn't find the user" });
    } else if (user.password !== password) {
      res.status(500).json({ msg: "Incorrect password" });
    } else {
      res.send({ user: user, msg: "Login successful" });
    }
  }
  catch (error) {
    res.status(500).json({ error: "Unxpected error oucerred" });
  }
})

app.listen(4000, () => console.log('server is connected to port 4000'));