import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://admin:admin@cluster.xhgyf5c.mongodb.net/pos?retryWrites=true&w=majority&appName=Cluster');

app.listen(4000, () => console.log('server is connected to port 4000'));