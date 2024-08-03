const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
const pool = require("./db1")
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


app.post('/todo', async (req, res) => {
 
    const { description } = req.body; 
    const result = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
    res.status(201).json(result.rows[0]); //عشان تطلعلي القيمة المحدده من جيسون
    
});


//get data 
app.get("/todo" , async(req, res)=>{
    const allTodos = await pool.query("SELECT * FROM todo")
    res.status(201).json(allTodos.rows); 
});

// get specific todo
app.get("/todo/:id", async (req, res) => {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        if (todo.rows.length > 0) {
            res.status(200).json(todo.rows[0]);
        }
   
});


// update
app.put("/todo/:id", async (req, res) => {
        const { id } = req.params;
        const { description } = req.body;
        const result = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        if (result.rowCount > 0) {
            res.status(200).send("Todo was updated"); 
        } 
    
});




//delete 
app.delete("/todo/:id" , async(req,res)=>{
    const {id} = req.params ;
    const result = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    if (result.rowCount > 0) {
        res.status(200).send("Todo was Deleted"); 
    } 

})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
