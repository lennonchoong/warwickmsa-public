const express = require("express");
const sql = require("./db.js");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use('/', express.static(path.join(__dirname, 'client/build')));
app.get('/admin', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')));

app.post('/api/member', (req, res) => {
    const name = req.body.name;
    const body = req.body.file;
    const desc = req.body.desc;
    const pos = req.body.position;
    const pictureHref = `./statics/members/${name.replace(" ", "_")}.jpeg`;
    if (!fs.existsSync("./client/build/statics/members")) {
        fs.mkdirSync("./client/build/statics/members", {recursive : true});
    }
    fs.writeFile("./client/build" + pictureHref.substr(1), body, "base64", (err) => err === null ? "" : console.log(err));
    const qstr = `INSERT INTO members VALUES (NULL, ${sql.escape(name)}, ${sql.escape(pos)}, ${sql.escape(desc)}, ${sql.escape(pictureHref)});`
    sql.query(qstr, (err, result) => {
        if (err) {
            res.status(500).send(err);
            throw err
        } 
        return res.status(200).send("OK");
    })
    
})

app.post('/api/event', (req, res) => {
    const title = req.body.title;
    const body = req.body.file;
    const desc = req.body.desc;
    const pictureHref = `./statics/events/${title.replace(" ", "_")}.jpeg`;
    if (!fs.existsSync("./client/build/statics/events")) {
        fs.mkdirSync("./client/build/statics/events", {recursive : true});
    }
    fs.writeFile("./client/build" + pictureHref.substr(1), body, "base64", (err) => err === null ? "" : console.log(err));
    const dateStr = new Date().toJSON().slice(0, 10);
    const qstr = `INSERT INTO events VALUES (NULL, ${sql.escape(title)}, ${sql.escape(desc)}, ${sql.escape(pictureHref)}, '${dateStr}');`
    sql.query(qstr, (err, result) => {
        if (err) {
            res.status(500).send(err);
            throw err;
        }
        return res.status(200).send("OK");
    })
    
})

app.post('/api/sponsor', (req, res) => {
    const name = req.body.name;
    const body = req.body.file;
    const desc = req.body.desc;
    const pictureHref = `./statics/sponsors/${name.replace(" ", "_")}.jpeg`;
    if (!fs.existsSync("./client/build/statics/sponsors")) {
        fs.mkdirSync("./client/build/statics/sponsors", {recursive : true});
    }
    fs.writeFile("./client/build" + pictureHref.substr(1), body, "base64", (err) => err === null ? "" : console.log(err));
    const qstr = `INSERT INTO sponsors VALUES (NULL, ${sql.escape(name)}, ${sql.escape(desc)}, ${sql.escape(pictureHref)});`
    sql.query(qstr, (err, result) => {
        if (err) {
            res.status(500).send(err);
            throw err
        } 
        return res.status(200).send("OK");
    })
    
})

app.post('/api/social', (req, res) => {
    const href = req.body.href;
    const social = req.body.social;
    const qstr = `INSERT INTO socials VALUES (NULL, ${sql.escape(href)}, ${sql.escape(social)});`
    sql.query(qstr, (err, result) => {
        if (err) {
            res.status(500).send(err);
            throw err
        } 
        return res.status(200).send("OK");
    })
})

app.get('/api/member', (req, res) => {
    sql.query('SELECT * FROM members;', (error, result, fields) => {
        if (error) {
            return res.status(400).send(new Error("DB Error"));
        }
        const responseBody = Object.values(JSON.parse(JSON.stringify(result)));
        res.status(200).json(JSON.stringify(responseBody));
    })
})

app.get('/api/event', (req, res) => {
    sql.query('SELECT * FROM events;', (error, result, fields) => {
        if (error) {
            return res.status(400).send(new Error("DB Error"));
        }
        const responseBody = Object.values(JSON.parse(JSON.stringify(result)));
        res.status(200).json(JSON.stringify(responseBody));
    })
})

app.get('/api/sponsor', (req, res) => {
    sql.query('SELECT * FROM sponsors;', (error, result, fields) => {
        if (error) {
            return res.status(400).send(new Error("DB Error"));
        }

        const responseBody = Object.values(JSON.parse(JSON.stringify(result)));
        res.status(200).json(JSON.stringify(responseBody));
    })
})

app.get('/api/social', (req, res) => {
    sql.query('SELECT * FROM socials;', (error, result, fields) => {
        if (error) {
            return res.status(400).send(new Error("DB Error"));
        }

        const responseBody = Object.values(JSON.parse(JSON.stringify(result)));
        res.status(200).json(JSON.stringify(responseBody));
    })
})

app.delete('/api/member', (req, res) => {
    sql.query(`DELETE FROM members WHERE id=${req.body.id};`, (error, result, fields) => {
        if (error) {
            return res.status(400).send(new Error("DB Error"));
        }
        fs.unlink("./client/build" + req.body.imgref.substr(1), (err) => err === null ? "" : console.log(err));
        res.status(200).send("OK");
    })
})

app.delete('/api/event', (req, res) => {
    sql.query(`DELETE FROM events WHERE id=${req.body.id};`, (error, result, fields) => {
        if (error) {
            return res.status(400).send(new Error("DB Error"));
        }
        fs.unlink("./client/build" + req.body.imgref.substr(1), (err) => err === null ? "" : console.log(err));
        res.status(200).send("OK");
    })
})

app.delete('/api/sponsor', (req, res) => {
    sql.query(`DELETE FROM sponsors WHERE id=${req.body.id};`, (error, result, fields) => {
        if (error) {
            return res.status(400).send(new Error("DB Error"));
        }
        fs.unlink("./client/build" + req.body.imgref.substr(1), (err) => err === null ? "" : console.log(err));
        res.status(200).send("OK");
    })
})

app.delete('/api/social', (req, res) => {
    sql.query(`DELETE FROM socials WHERE id=${req.body.id};`, (error, result, fields) => {
        if (error) {
            return res.status(400).send(new Error("DB Error"));
        }
        res.status(200).send("OK");
    })
})

app.post('/api/login', (req, res) => {
    sql.query(`SELECT * FROM user WHERE username='${req.body.username}';`, (error, result, fields) => {
        if (error) {
            return res.status(400).send(new Error("DB Error"));
        }

        const responseBody = Object.values(JSON.parse(JSON.stringify(result)));
        let auth = {auth: false};
        for (let row of responseBody) {
            if (req.body.password === row.password) {
                auth.auth = true;
            }
        }
        
        res.status(200).json(JSON.stringify(auth));
    })
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port " + (process.env.PORT || 5000));
})
