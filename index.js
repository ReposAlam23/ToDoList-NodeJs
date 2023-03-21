const express = require("express")
const app = express()
const port = process.env.port || 3001
const ejs = require("ejs")
const path = require("path")

const ToDoDB = require("./models/todo")                  //===== models import 
const DBConnection = require("./connection/dbconnection")//====== DB import 
DBConnection()                                           // ====== DB connection

//============ setting view engine ===========
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "view"))

//=========== settign parsing of post data ======
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//=============== get request ===========
app.get("/", async(req, res)=>{
    try{
        const list = await ToDoDB.find()
        res.render("index", {todo: list})

    }catch(e){
        res.json({
            status: "failed to fetch todolist from db",
            message: e.message
        })
    }
})

//================ post request ===========
app.post("/todo", async(req,res)=>{
    try{
        const input_todo = req.body.task
        console.log(input_todo);
        const add_list = await ToDoDB.create({todoList: input_todo})
        res.redirect("/")
      
    }catch(e){
        console.log("fialed", e)
    }

})

//================= deleting list using get request ==========

app.get("/delete/todo/:id", async(req,res)=>{
    try{
        const deleteId = await ToDoDB.deleteOne({_id : req.params.id})
        console.log(deleteId, "deleted successfully");
        res.redirect("/")

    }catch(e){
        console.log("failed in del", e);
    }
})

app.listen(port, ()=>{console.log(`server is running at port ${port}`)})