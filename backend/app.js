const express = require('express');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

// route imports

const examroute = require('./routes/examRoute');
const userroute = require('./routes/userRoute');
const resultroute = require('./routes/resultRoute');

app.use('/api/v1',userroute);
app.use('/api/v1',examroute);
app.use('/api/v1/',resultroute);
// error middleware

app.use(errorMiddleware);

module.exports = app;