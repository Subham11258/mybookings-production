const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware");
router.post('/register',async(req,res)=>{
    try{
        const userExist = await User.findOne({email:req.body.email});
    if(userExist){
        res.send({
            success:false,
            message:'user already exist',
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    req.body.password = hashedPassword;
    const newUser = await new User(req.body);
    await newUser.save();
    res.send({
        success:true,
        message:"user created successfully",
    })
    }
    catch(err){
        console.log(err);
        res.send({
            success:false,
            message:err,
        })
    }
    
});

router.post('/login',async(req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.send({
                success:false,
                message:'user does not exist'
            })
        }
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            res.send({
                success:false,
                message:'Invalid password'
            })
        }

        const token = jwt.sign({userId: user._id},process.env.SECRET_KEY,{
            expiresIn:"1d",
        })

        res.send({
            success:true,
            message:'logged in',
            token:token,
        })
    }
    catch(err){
        console.log(err);
    } 
});


router.get('/get-current-user',authMiddleware,async(req,res)=>{
    //inform the server if the token is valid or not and who is the user
    const user = await User.findById(req.body.userId).select("-password");
    console.log(typeof user);
    res.send({success:true,message:'your are authorized',data:user});
})

module.exports = router;