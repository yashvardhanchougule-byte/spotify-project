const express= require("express");
const app= express();
const authRouter= require("./route/authRouter");
const dbconnect= require("./db/db");

dbconnect();
app.use("/register",authRouter);
app.use(express.json());


app.use("/login",loginUser);
module.exports= app;