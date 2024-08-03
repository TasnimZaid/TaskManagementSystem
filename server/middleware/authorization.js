const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT token
const authorization = (req, res, next) => {
    const jwtToken = req.header("Authorization");

    if (!jwtToken) {
        return res.status(403).json("Not Authorized");
    }

    try {
        const payload = jwt.verify(jwtToken.split(' ')[1], process.env.jwtSecret);
        req.user = payload.user;
        next();
    } catch (err) {
        return res.status(403).json("Not Authorized");
    }
};

module.exports = authorization;
