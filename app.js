const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')


const app= express();
const cookieParser = require('cookie-parser')

const errMiddleware = require('./middleware/error')

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());


//Route import

const dashboard = require('./routes/dashboardRoute');
const user = require('./routes/userRoute'); //userRoutes

app.use("/api/v1",dashboard);
app.use("/api/v1",user)

// middleware for error
app.use(errMiddleware);

module.exports = app;