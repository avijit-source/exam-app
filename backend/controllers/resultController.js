const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Exam = require("../models/examModel");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const Result = require("../models/resultModel");


// create new result 

exports.newresult = catchAsyncErrors(
    async(req,res,next) => {
        const {
           exam,
           answersheet
        } = req.body;

        const currExam = await Exam.findById(exam);
        const questionsArr = [...currExam.questions];
        
        let correct = 0;
        
        answersheet.forEach(obj => {
             correctFunc(obj)
        });

        function correctFunc(val){
            for(let question of questionsArr) {
                if(question._id.valueOf() === val._id.valueOf()
                 && Number(question.answer)=== Number(val.answer)) {
                      ++correct;
                }
           }
        }

        const countquestions = await currExam.questions.length;
        const attended = answersheet.length
        if(countquestions){
            req.body.total = countquestions
        }
        if(attended){
            req.body.attended = attended
        }

        req.body.correct = correct;
        req.body.student = req.user.id;
        const result = await Result.create(req.body);

        return res.status(200).json({success:true,result})
    }
)

// get single result

exports.getSingleResult = catchAsyncErrors(
    async function(req, res, next){
        const {id} = req.body;
        if(!id){
            return next(new ErrorHandler("enter result id",404));
        }
        const result = await Result.findById(id).populate([{path:"student",select:["userId","name"]},
        {path:"exam",select:["examcode","questions"]}]).exec();
        if(!result){
            return next(new ErrorHandler("enter result id",404));
        }
        return res.status(200).json({success:true,result})
    }
)

// all results

exports.results = catchAsyncErrors(
    async function(req, res, next){
       const {search,sort,paginate} = req.body;
       const page = paginate?.page || 1 ;
       const dataPerPage = paginate?.limit || 10;
       const skip = dataPerPage * (page-1);
       const sortval = sort || -1;

      const results = await Result.find().select("_id student total exam attended correct").
      populate([{path:"student",select:["userId","name"]},
      {path:"exam",select:"examcode"}]).sort({correct:sortval}).limit(dataPerPage).skip(skip).exec();

         const final = [];
         if(search){
            const key = Object.keys(search)[0];
            const value = search[key].toLowerCase();
            results.find(res=>{
                if(key==="name" && res.student.name.includes(value)){
                    final.push(res);
                }
                if(key==="examcode" && res.exam.examcode.includes(value)){
                    final.push(res);
                }
            })
            return res.status(200).json({success:true,final})  
         }else{
            return res.status(200).json({success:true,results})  
         }
     }
)

// delete result

exports.deleteresult = catchAsyncErrors(
    async function(req, res, next){
        const {id} = req.body;
        if(!id){
            return next(new ErrorHandler("enter result id",400));
        }
        const deleted = await Result.findByIdAndDelete(id).select("_id");
        if(!deleted){
            return next(new ErrorHandler("not found",404));
        }
        return res.status(200).json({success:true,deleted})
    }
)

