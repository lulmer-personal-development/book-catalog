var path = require('path');
var envFile = path.resolve(__dirname, "../.env")
require("dotenv").config({path: envFile});
var mysql = require("mysql");

var database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = database