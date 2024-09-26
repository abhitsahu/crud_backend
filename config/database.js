const mongoose = require('mongoose');


const connectDatabase = ()=>{

    mongoose.connect(process.env.DB_CONN)
    .then((data)=>{
        console.log(`mongodb connect with server: ${data.connection.host}`)
    })
}

module.exports = connectDatabase