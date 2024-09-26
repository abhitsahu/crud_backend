//jo login hai woh hi product access kar sakta hai

const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel'); //userSchema
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')

const isAuthenticatedUser = catchAsyncError( async(req,res,next)=>{

    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id);

    next();
})

const authorizeRoles = (...roles) =>{

    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){

        return next( new ErrorHandler(`Roles: ${req.user.role} is not allowed to access this resourse`,403))
        }
        next();
    }
}

module.exports = {isAuthenticatedUser,authorizeRoles};