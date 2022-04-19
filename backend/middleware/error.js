const Errorhandler = require('../utils/errorHandler');

module.exports = async(err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "internal server error";

    if(err.name === "CastError"){
        const message = `Resources not found, ${err.path}`;
        err = new Errorhandler(message,400);
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new Errorhandler(message,400)
    }

    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is invalid`;
        err = new Errorhandler(message,400)
    }

    if(err.name === "TokenExpiredError"){
        const message = `Json web token is invalid`;
        err = new Errorhandler(message,400)
    }

    res.status(err.statuscode).json({message: err.message});
}