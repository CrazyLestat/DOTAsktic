import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userSchema from "./models/userSchema.model.js";

const server = express();
const port = 5000;

server.use(express.json());
server.use(cors());


mongoose.connect("mongodb://localhost:27017/test")
    .then(() => console.log("Connected to DB"));

    server.post("/register",async(req,res)=>{ 
        const {name, email, password} = req.body;
        console.log(req.body);
          userSchema.create({name: req.body.name, email: req.body.email, password: req.body.password})
                    .then(result => res.json("Account created"))
                    .catch(err => res.json("Error"))
           
    });

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})