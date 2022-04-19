const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    examcode:{
        type: String,
        unique: true,
        required: [true,"please enter a valid examcode"],
        maxLength:[10,"can not exceed 10 characters"],
    },
    durations:{
        type:Number,
        required: [true,"please enter a valid duration in minutes"],
        maxLength: [3,"can not exceed 3 characters"]
    },
    exampass:{
        type:String,
        required: [true,"please enter a valid exam password"],
        maxLength:[15,"can not exceed 15 characters"]
    },
    questions:[{
        question:{
            type:String,
            required: [true,"please enter question"]
        },
        options:[{
             type:String,
             required: [true,"please enter answers"]
            }],
        answer:{
            type:Number,
            enum:[1,2,3,4],
            required: [true,"please enter a answer"]
        }
    }],
    isVisible:{
        type:Boolean,
        default:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
     
})

module.exports = mongoose.model("Exam",examSchema)