const express = require("express");
var app = express();
const router = require("./src/routes/book-catalog.routes");

app.use(express.json());
app.use(router);

app.listen(10000, function () {
    console.log("Started application on port %d", 10000);
});