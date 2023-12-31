//importing the dependencies(modules)
var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

//created an app and use those modules
const app=express()
app.use(bodyParser.json())
app.use(express.static('public'))//we are gng to add html files in public folder
app.use(bodyParser.urlencoded({
    extended:true
}))

//connecting to mongodb database
mongoose.connect('mongodb://127.0.0.1:27017/Database')
var db=mongoose.connection
db.on('error',()=>console.log("Error in connecting to Database"))
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name=req.body.name
    var age=req.body.age
    var email=req.body.email
    var phn=req.body.phn
    var gender=req.body.gender
    var password=req.body.password

    //creating a object
    var data={
        "name":name,
        "age":age,
        "email":email,
        "phn":phn,
        "gender":gender,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
    return res.redirect('signup_success.html')

})
//establish a connection b/w localhost and our file

app.get("/",(req,res) => {
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000")