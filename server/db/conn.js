const mongoose = require("mongoose");

const DB = process.env.DATABASE;


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("Connected to DB")).catch((error)=> console.log(error.message));