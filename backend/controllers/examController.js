const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Exam = require("../models/examModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures")
const User = require("../models/userModel");

// create exam --admin

exports.createExam = catchAsyncErrors(async(req,res,next) => {

    req.body.createdBy = req.user._id;
    const exam = await Exam.create({...req.body});
    return res.status(201).json({success:true,exam});   
})

//update exam -- admin

exports.updateExam = catchAsyncErrors(async(req,res,next) => {
      const id = req.user._id.valueOf();
      let exam = await Exam.findById(req.params.id);
      if(!exam) {
        return next(new ErrorHandler("not found",404))
    }
    if(id!== exam.createdBy.valueOf()) {
        return next(new ErrorHandler("not authorized to edit this exam",403));
    }
      exam = await Exam.findByIdAndUpdate(req.params.id,req.body,{
          new:true,
          runValidators:true,
          useFindAndModify:false
      })
     return res.status(201).json({success:true,exam})
    
})

//delete exam --admin

exports.deleteExams = catchAsyncErrors(async(req,res,next) =>{
    const id = req.user._id.valueOf();

    const exam = await Exam.findById(req.params.id);
    if(!exam) {
        return next(new ErrorHandler("not found",404))
    }
    if(exam.createdBy.valueOf() !== id){
        return next(new ErrorHandler("not authorized",403))

    }
    await exam.remove();

    return res.status(201).json({success:true,sucessMessage:"exam deleted successfully"})
})

//get single exam details


exports.getExamDetails = catchAsyncErrors(
    async(req,res,next) =>{
    const {exampass} = req.body;
    if(!exampass){
        return next(new ErrorHandler("provid eexam pass",403))
    }
    const exam = await Exam.findById(req.params.id).populate("createdBy","userId");
    if(!exam){
      return next(new ErrorHandler("exam not found",404));
    }
    if(exam.exampass === exampass){
        if(req.user.role !== "admin"){
            const exams = req.user.exams;
            let correctexam=false;
               exams.forEach(exam=>{
                   if(exam._id.valueOf() === req.params.id && exam.isAttended===false){
                         exam.isAttended = true;
                         correctexam = true;
                   }
               })
              if(!correctexam){
                  return next(new ErrorHandler("exam already attended",403));
              }
               
               const updateduser = await User.findByIdAndUpdate(req.user._id,{exams},{
                   new:true,
                   runValidators:true,
                   useFindAndModify:false
               })
              
           }
           return res.status(200).json({success:true,exam})
    }
    return next(new ErrorHandler("wrong exam code",404));
})


exports.getAllExams = catchAsyncErrors(async(req,res) => {
        const exams = await Exam.find().select("_id examcode exampass");
        if(!exams){
          return next(new ErrorHandler("exam not found",404));
        }
        return res.status(200).json({success:true,exams});
})