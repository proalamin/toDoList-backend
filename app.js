const express = require("express");
const router = require("./src/routes/api");
const app= new express();
const bodyParser = require("body-parser");


// Security Middleware
const rateLimit= require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss= require('xss-clean');
const hpp=require('hpp'); 
const cors=require('cors'); 

// database
const mongoose=require('mongoose');


// security middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());


// body parser implement
app.use(bodyParser.json());


// request rate limit implement
const limiter=rateLimit({windowMs:15*60*1000, max:3000})
app.use(limiter);

// MongoDb database connection
let URI ="mongodb://127.0.0.1:27017/Todo";
// let URI ="mongodb+srv://todo_admin:GZntFljuLRWaWdBv@cluster0.byodah7.mongodb.net/Todo";
let Option={user:'', pass:'', autoIndex:true};
mongoose.connect(URI,Option, (error)=>{
    console.log("connection success");
    console.log(error);

})


//roting implement
app.use("/api/v1", router)

//undefind rote implement
app.use("*", (req,res)=>{
    res.status(404).json({status:"fail",data:"not found"})
})

module.exports=app;