"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var morgan = require('morgan');
require("express-async-errors");
var planets_1 = require("./Controllers/planets");
var port = 3000;
var app = express();
app.use(morgan("dev"));
app.use(express.json());
app.get('/planets', planets_1.getAll);
app.get('/planets/:id', planets_1.getOneById);
app.post('/planets', planets_1.create);
app.put('/planets/:id', planets_1.updateById);
app.delete('/planets/:id', planets_1.deleteById);
app.listen(port, function () {
    console.log("Example app listening on https://localhost:".concat(port));
});
