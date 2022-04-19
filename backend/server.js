const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

//handling uncaught exceptions

process.on('uncaughtException', function(err) {
    console.log(err.message);
    console.log("shutting down server due to uncaught exceptions");
    process.exit(1);
})

dotenv.config({path:"backend/config/config.env"});

// db connect

connectDB()

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})

// unhandled promise rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("shutting down server due to unhandled promise rejection");

    server.close(()=>{
        process.exit(1);
    })
})