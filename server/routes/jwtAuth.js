const express = require('express');
const router = express.Router();
const pool = require("../db");
const bcrypt = require('bcrypt')
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

// GET route
router.get('/', (req, res) => {
    res.send('Hello, world!');
});



// POST route for registering
router.post('/register',validInfo, async (req, res) => {

    const { name, email, password } = req.body; 
    const result = await pool.query(
        "SELECT * FROM users WHERE  user_email = $1 ", 
        [ email]
    );



 // to check if user exist 
    if (result.rows.length > 0) {
        return res.status(400).json({ error: "User already exists" });
    }


// Encrypt pass :
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);



//4. to insert all inf for user and output 

    const newUser = await pool.query(
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword]
    );

// 5. generate jwt token 
const token = jwtGenerator(newUser.rows[0].user_id);
res.json({ token });


});



router.post('/login',validInfo, async (req, res) => {
    const { email, password } = req.body; 
    
        // Check if user exists
        const result = await pool.query(
            "SELECT * FROM users WHERE user_email = $1", 
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json("Password or email is incorrect");
        }

        // Compare passwords
        const user = result.rows[0]; 

        const validPassword = await bcrypt.compare(password, user.user_password);

        if (!validPassword) {
            return res.status(401).json("Password or email is incorrect");
        }

        // Password is correct, generate JWT token
        const token = jwtGenerator(user.user_id);

        // Return token in response
        res.json({ token });
    
});


router.get("/is-verify", authorization, async (req, res) => {
    res.json(true);
});


module.exports = router;