import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB);

const port = 4000
app.listen(port, () => console.log(`server is connected to port ${port}`));