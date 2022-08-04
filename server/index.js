const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const { json } = require('express');

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
        res.json(newTodo.rows[0]);
         //res.sendStatus(200);
    } catch (error) {
        console.log(error.message);
    }
})
//get all todo
app.get('/todo',async(req,res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})
//get a todo
app.get('/todo/:id',async(req,res)=>{
   
    try { 
        const {id} = req.params;
        const todoItem = await pool.query("SELECT * FROM todo WHERE tid =$1",[id]);
        res.json(res.json(todoItem.rows[0]));
    } catch (error) {
        console.log(error.message);
    }
})
//update a todo
 app.put('/todo/:id',async(req,res)=>{
    try {
        const {id}=req.params;//used for id' where' we are targeting 
        const {work} = req.body;//used for 'set'
         const updateItem = await pool.query("UPDATE todo SET work = $1 WHERE tid = $2",[work,id]);
         res.json("todo list was updated");
    } catch (error) {
        console.log(error.message);
    }
   
 })
//delete a todo
app.delete('/todo/:id',async(req,res)=>{
    try {
        const {id}=req.params;
       
        const deleteItem = await pool.query("DELETE FROM todo WHERE tid = $1",[id]);
        res.json("Item successfully deleted");
    } catch (error) {
        console.log(error.message);
    }
})
app.listen(5000,()=>{console.log(`listening to the server at 5000`)});