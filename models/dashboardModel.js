const mongoose = require('mongoose');
const validator = require('validator');


const dashboardSchema = new mongoose.Schema({

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
    mobile:{
        type:Number,
        required:[true,"please enter your Phone Number"],
        minLength:[10,"Name should have 10 character"],

    },
    designation:{
        type:String,
        required:[true,"Please enter the designation"]
    },
    gender:{
        type:String,
        required:[true,"Please product the gender"],
       
    },
    course:{

        type:String,
        require:[true,"Please enter your course"],

    },

    images:[
        {
            public_id:{
    
                type:String,
                require:true
            },
            url:{
    
                type:String,
                require:true
            }
        }
    ],

    count:{

        type:Number,
        default: 0
    },

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },

    createdAt:{

        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Dashboard",dashboardSchema)
