"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var morgan = require('morgan');
require("express-async-errors");
var port = 3000;
var app = express();
app.use(morgan("dev"));
var planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
app.get("/", function (req, res) {
    res.status(200).json({ msg: "Hello World" });
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
