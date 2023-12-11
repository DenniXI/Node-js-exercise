"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var morgan_1 = require("morgan");
require("express-async-errors");
var planets_1 = require("./controllers/planets");
var port = 3000;
var app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.get('/api/planets', planets_1.getAll);
app.get("/api/planets/:id", planets_1.getOneById);
app.post('/api/planets', planets_1.create);
app.put('/api/planets/:id', planets_1.updateById);
app.delete('/api/planets/:id', planets_1.deleteById);
app.listen(port, function () {
    console.log("Example app listening on https://localhost:".concat(port));
});
