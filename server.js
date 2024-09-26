const app = require('./app')
const path = require('path')
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')


//Handling Uncaught Exception - means console.log(youtube) and youtube is not define 

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Uncaught Exception`)
    process.exit(1);
})


// config

dotenv.config({path:"config/config.env"});

//connecting to database
connectDatabase();



const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})



// Unhandled Promise Rejection --means jab env file mein kuch error aajei
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`)

    server.close(()=>{
        process.exit(1);
    })
})