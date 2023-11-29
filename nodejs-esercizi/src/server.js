"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
app.get('/api/planets', function (req, res) {
    res.status(200).json(planets);
});
app.get("/api/planets/:id", function (req, res) {
    var id = JSON.parse(req.params.id);
    var findUser = planets.filter(function (planet) { return planet.id === id; });
    if (findUser.length > 0) {
        res.status(200).json(findUser);
    }
    else {
        res.status(500).send("Errore interno");
    }
});
app.post('/api/planets', function (req, res) {
    var _a = req.body, id = _a.id, name = _a.name;
    var newPlanet = { id: id, name: name };
    planets = __spreadArray(__spreadArray([], planets, true), [newPlanet], false);
    res.status(201).json({ msg: 'Planet created.' });
});
app.put('/api/planets/:id', function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    planets = planets.map(function (p) { return p.id === Number(id) ? (__assign(__assign({}, p), { name: name })) : p; });
    res.status(200).json({ msg: 'Planet updated.' });
});
app.delete('/api/planets/:id', function (req, res) {
    var id = req.params.id;
    planets = planets.filter(function (p) { return p.id !== Number(id); });
    res.status(200).json({ msg: 'Planet deleted.' });
});
app.listen(port, function () {
    console.log("Example app listening on https://localhost:".concat(port));
});
