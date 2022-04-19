const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    exam:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Exam",
        required: true,
    },
    total:{
        type:Number,
        required: true,
        maxlength:[3,"total can not be more than 3 characters"]
    },
    attended:{
        type: Number,
        required: true,
        maxlength:[3,"attended can not be more than 3 characters"]
    },
    correct:{
        type: Number,
        required: true,
        maxlength:[3,"correct can not be more than 3 characters"]
    },
    answersheet:[{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Exam",
        },
        answer: Number
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Result",resultSchema)