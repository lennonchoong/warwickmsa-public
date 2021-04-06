const fs = require("fs");
if (!fs.existsSync("./client/build/statics/members")) {
    fs.mkdirSync("./client/build/statics/members", {recursive : true});
}
if (!fs.existsSync("./client/build/statics/events")) {
    fs.mkdirSync("./client/build/statics/events", {recursive : true});
}
if (!fs.existsSync("./client/build/statics/sponsors")) {
    fs.mkdirSync("./client/build/statics/sponsors", {recursive : true});
}