var dblite, path, db;
dblite = require("dblite");
path = require("path");

dblite.bin = path.join(__dirname, "../bin/sqlite3.exe");

db = dblite(path.join(__dirname, "./db.sqlite3"));

module.exports = db;
