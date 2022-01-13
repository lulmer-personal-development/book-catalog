const express = require("express");
var app = express();
const router = require("./src/routes/book-catalog.routes");


// sql = "CREATE TABLE books (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), author VARCHAR(255), PRIMARY KEY (id))"

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected");
//     connection.query(sql, function(err){
//         if (err) throw err;
//         console.log("Table Created")
//     })
// })


// app.get("/",function(request,response){
//     response.send("Hello World!");
// })

app.use(express.json());
app.use(router);

app.listen(10000, function () {
    console.log("Started application on port %d", 10000);
});