const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: [true,"please provide userId"],
        minLength: [3,"userId too short"],
        maxLength: [15,"userId too long"],
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: [true,"please provide password"],
        minLength: [5,"password must be at least 5 characters"],
        maxLength: [20,"password must be smaller than 20 characters"]
    },
    name:{
        type: String,
        minLength: [4,"name must be at least 4 characters"],
        maxLength: [25,"name must not be larger than 25"]
    },
    email:{
        type: String,
        validator: [validator.isEmail,"please provide a valid email"],
    },
    mobile:{
        type: String,
        length:[10,"enter proper mobile number"]
    },
    avatar:{
        public_id:String,
        url:String
    },
    role:{
        type:String,
        default:"user"
    },
    exams:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Exam"
        },
        isAttended:{
            type:Boolean,
            required:true,
            default:false
        }}]

})

userSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
     return jwt.sign({id:this._id},process.env.JWT_SECRET,{
         expiresIn: process.env.JWT_EXPIRE
     })
}

// compare password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("User",userSchema);