const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthUser = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("unauthorized ,please login to access",401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

exports.authorizeRoles = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    if(user.role!=="admin"){
        return next(new ErrorHandler("unauthorized ,you dont have permission to access this route",403));
    }
    next();
});