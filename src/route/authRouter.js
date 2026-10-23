const express= require("express");
const app= express();   
const userModel= require("../models/user.model");
const hash=require("bcrypt");
const token=require("jsonwebtoken");
app.use(express.json());
const router=express.Router();

async function registerUser(req,res){
    const {name,email,password,role}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"Please Enter the required fielsds"});
    }
const existinguser= await userModel.findOne({
    $or: [{username: name}, {email: email}]
})
if(existinguser){
    return res.status(400).json({message:"User already exists"});
}
const hashedPassword= await hash.hash(password,10);
const newUser= await userModel.create({
    username: name,
    email: email,
    password: hashedPassword,
    role: role
});
return res.status(201).json({message:"User registered successfully"});

}
router.post("/register",registeruser);

async function loginUser(req,res){
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please enter the required fields"});
    }
    user= await userModel.findOne({email: email});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    const isMatch= await hash.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const token=await jwt.sign({id:user._id,role:user.role},process.env.JWt_SECRET_KEY);
    res.cookie("token",token,);
    return res.status(200).json({message:"Login successful"});
}
module.exports=router;

