const express = require('express');
const app = express();
const cors = require("cors");
const port = 2000; 



// middleware 
app.use(express.json());
app.use(cors());



// ROUTES
// Register and login routes
app.use("/auth", require("./routes/jwtAuth"))

//dashboard route

app.use("/dashboard" ,require("./routes/dashboard"))




app.listen(port, () => {
    console.log('Server started listening on port 2000')
})