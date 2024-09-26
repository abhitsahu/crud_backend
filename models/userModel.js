const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,"Name cannot exceed 30 character"],
        minLength:[2,"Name should have more then 2 character"]
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]

    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minLength:[8,"Name should be greater then 8 character"],
        select:false //dekh nhi sakunga password database mein
    },
    role:{
        type:String,
        default: "admin",
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date,

});

//hash password

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,8)
});

//JWT token

userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

//compare password

userSchema.methods.comparePassword = async function(enteredPassword){

    return await bcrypt.compare(enteredPassword,this.password);
}

//Generating password reset token

userSchema.methods.getResetPasswordToken = function () {

    //generating token

    const resetToken = crypto.randomBytes(20).toString("hex")

    //Hashing and adding resetPasswordToken to userSchema

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now()+15*60*1000;

    return resetToken;

}

module.exports = mongoose.model("User",userSchema);