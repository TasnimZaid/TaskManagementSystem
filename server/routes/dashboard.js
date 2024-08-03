const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
        // req.user has the payload

        // Querying the database for user_name based on user_id
        const userQuery = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [
            req.user.id  
        ]);

        if (userQuery.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send the user_name as a response
        res.json(userQuery.rows[0]);
    
});

module.exports = router;
