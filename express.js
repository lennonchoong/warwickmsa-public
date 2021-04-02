const express = require("express");
// const conn = require("db");
const app = express();
const cors = require("cors");

// app.use('/', express.static('src'));

app.get("/", function (req, res) {
    var responseText = "Hello World!<br>";
    responseText += "<small>Requested at: " + req.requestTime + "</small>";
    res.send(responseText);
});

app.listen(3000);
