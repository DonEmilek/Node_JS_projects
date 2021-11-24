const PORT = "3030";
const express = require('express')
const mysql = require('mysql')
const app = express()

app.use('/src', express.static(__dirname+'/src'))
app.use(express.json());
app.use(express.urlencoded({extended: false}))

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "expenseapp"
})
con.connect(err=>{
    if(err)
        throw err;
    console.log("connected!");
    
})

app.get("/data",(req,resp)=>{
    let array = {}
    let queryName = "SELECT * from `expenses`";
    con.query(queryName, (err,res)=>{
        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        resp.json(res)
    })
})

app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/add", (req,res)=>{
    res.sendFile(__dirname+"/add.html")
})

app.post("/add", (req,res)=>{
    let array = [req.body.product, req.body.cost]
    let sqlquery = "INSERT INTO `expenses` (name, cost) VALUES (?)";
    con.query(sqlquery, [array], (err,res)=>{
        if(err){
            console.log(err);
            res.sendStatus(500)
            return;
        }
        console.log("saved new product");
    })
    res.sendFile(__dirname+"/add.html")
})



app.listen(PORT, ()=>console.log(`Server's running on PORT ${PORT}`))