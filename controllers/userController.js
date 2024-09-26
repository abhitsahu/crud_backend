const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel'); //userSchema
const sendToken = require('../utils/jwtToken');


//Register a user
const registerUser = catchAsyncError(
    async(req,res,next)=>{

        const {name,email,password} = req.body;

        const user = await User.create({
            name,email,password,
            avatar:{
                public_id:"sample",
                url:"profile.url"
            }
        })

        //token and storing in cookie
        sendToken(user,201,res);
        
    }
);

//Login

const loginUser = catchAsyncError(
    async(req,res,next)=>{

        const {email,password} = req.body;

        // checking if user has given password and email both

        if(!email || !password){
            return next(new ErrorHandler("Please enter email & password",400))
        }

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return next(new ErrorHandler("Invalid email or password",401));
        }

        const isPasswordMatched = user.comparePassword(password);

        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password",401));
        }

        //token and storing in cookie
        sendToken(user,200,res);



    }
)

//Logout user

const logout = catchAsyncError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true,
    });


    res.status(200).json({
        success:true,
        message:"Logged out",
    })

})







module.exports = {registerUser,loginUser,logout}