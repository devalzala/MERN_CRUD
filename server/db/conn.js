const mongoose = require("mongoose");

const DB = "mongodb+srv://DevalsinhZala:12102000@mern-crud.zfkvlpi.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("Connected to DB")).catch((error)=> console.log(error.message));