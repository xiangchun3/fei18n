var express = require('express');
var path = require("path");
var logger = require('morgan');
var bodyParser = require('body-parser');
var route = require("./route");
var app = express();

app.use(logger('dev'));
app.use(function(req, res, next) {
    res.successJSON = function(data) {
        res.json({code: 200, data: data || null});
    };
    res.errorJSON = function(msg, data) {
        res.json({code: 500, msg: msg || "", data: data || null});
    }
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
route(app);

app.listen(4000, function() {
  console.log('Express server listening on port 4000');
});

module.exports = app;
