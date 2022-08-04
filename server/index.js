const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
//middleware

app.use(cors());    
app.use(express.json());//helps us to get request.body in json format

//ROUTES
//create a todo
app.post('/todo',async(req,res)=>{
    try {
        //console.log(req.body);
        const {work} =req.body;
        const newTodo = await pool.query("INSERT INTO todo (work) VALUES ($1) RETURNING *",[work]);
        res.json(newTodo);
         //res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
})
//get all todo

//get a todo

//update a todo

//delete a todo

app.listen(5000,()=>{console.log(`listening to the server at 5000`)});