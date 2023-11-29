const express = require('express');
const morgan = require('morgan')
import 'express-async-errors'

const port = 3000;
const app = express();

app.use(morgan("dev"))

type Planet = {
  id: number,
  name: string,
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.get("/",(req,res) =>{
  res.status(200).json({msg: "Hello World"})
})

app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}`)
})