const express = require("express");
const sql = require("./db.js");
const path = require("path")
const app = express();

app.use('/', express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

app.post('/api/text', (req, res) => {
    let qstr = `INSERT INTO test VALUES (${sql.escape(req.body.data)});`
    sql.query(qstr, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port " + (process.env.PORT || 5000));
})
