const userModel = require('../models/model');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const signup=async(req, res)=>{
   try{
    const {name, email, password}=req.body;
    const user=await userModel.findOne({email})
    if(user){
        return res.status(409).json({message:"User already exists, you can login.", success:false})
    }
    const newUser=new userModel({
        name, email, password
    })
    newUser.password=await bcrypt.hash(password, 10 )
    await newUser.save()
    res.status(201).json({message:"SignUp completed successfully.", success:true})
   }catch(err){
    res.status(500).json({message:"SignUp failed. Internal server error", success:false})
   }
}
const login=async(req, res)=>{
   try{
    const { email, password}=req.body;
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(403).json({message:"Auth failed. Email or password is wrong", success:false})
    }
    const isPassEqual=await bcrypt.compare(password, user.password)
    if(!isPassEqual){
        return res.status(403).json({message:"Password incorrect", success:false})
    }
    const jwToken=jwt.sign({email: user.email, _id:user._id},
        process.env.JWT_SECRET, {expiresIn:'24h'}
    )
    res.status(200).json({message:"Login  successfully.", success:true, jwToken, name:user.name, email})
   }catch(err){
    res.status(500).json({message:"Login failed. Internal server error", success:false})
   }
}

const getData=async(req, res)=>{
 try{
    const  user=await userModel.findById(req.user._id).select("-password")
    if(!user){
        return res.status(400).json({message:"User not found", success:false})
    }
    res.status(200).json({ success: true, user });
 }catch(err){
    res.status(500).json({ message: "Internal Server Error", success: false });
 }
}

module.exports={signup, login, getData}