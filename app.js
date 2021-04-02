const express = require("express");
// const conn = require("db");
const path = require("path")
const app = express();

app.use('/', express.static(path.join(__dirname, 'client/build')));
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build'));
// });

// app.get("/", function (req, res) {
//     var responseText = "Hello World!<br>";
//     responseText += "<small>Requested at: " + req.requestTime + "</small>";
//     res.send(responseText);
// });

app.listen(3000);
