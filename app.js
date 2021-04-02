const express = require("express");
const sql = require("./db.js");
const path = require("path")
const app = express();

app.use('/', express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

app.post('/api/text', (req, res) => {
    const {id} = req.params;
    const {text} = req.body;

    res.status(200).send({
        headers: id,
        text: text
    })
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port " + (process.env.PORT || 5000));
})
