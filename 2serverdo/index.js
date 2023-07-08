import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userSchema from "./models/userSchema.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "./config/env.js";

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const encrypt = 8;

const server = express();
const port = 5000;

server.use(express.json());
server.use(cors());


mongoose.connect("mongodb+srv://tesy:test@cluster0.sezbku5.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Connected to DB"));

 
 // REGISTRATION
    server.post("/register",async(req,res)=>{ 
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, encrypt);
        console.log(hashedPassword)
        const userExists = await userSchema.collection.findOne({ email: req.body.email });
        if (userExists) {
            return res.json(error, "User exists");
        } else {
            userSchema.create({name: req.body.name, email: req.body.email, password: hashedPassword})
                    .then(result => res.json("Account created"))
                    .catch(err => res.json("Error"))
        }
    
    });

    //LOGIN
    server.post('/login', async(req,res) =>{
        const {email, password} = req.body;
        const userExists = await userSchema.collection.findOne({ email: req.body.email });
        console.log(JWT_SECRET);
        if (!userExists) {
            return res.json(error, "User not found");
        } 
        if (await bcrypt.compare(req.body.password, userExists.password)) {
            const token = jwt.sign({ email: userExists.email }, JWT_SECRET, {
                expiresIn: "15m",
              });
            if(res.status(201)) {
                return res.json({status: "ok", data: token});
            } else {
                return res.json({status: "error"});
            }
        } 
        res.json({status:"error", error: "Incorrect password"})

    })

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})