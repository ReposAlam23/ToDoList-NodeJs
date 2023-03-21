const mongoose = require("mongoose")

const connection = async ()=>{
    try{
        mongoose.connect("mongodb://localhost:27017/TodoListNodeJs")
        console.log("connection to DB success");
    } catch(e){
        console.log("connection to DB failed")
    }
}

module.exports = connection