const express = require('express')
const morgan =  require('morgan')
import 'express-async-errors'
const port = 3000
const app = express()
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


app.get('/api/planets', (req, res) => {
    res.status(200).json(planets)
})

app.get('/api/planets/:id', (req, res) => {
    const { id } = res.params
    const planet = planets.find(p => p.id === Number(id))
    res.status(200).json(planet)
})

app.post('/api/planets', (req, res) => {
    const { id, name } = req.body
    const newPlanet = { id, name}
    planets = [...planets, newPlanet]
    res.status(201).json({msg:'Planet created.'})
})

app.put('/api/planets/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  planets = planets.map((p) => p.id === Number(id) ? ({...p, name}) : p)
  res.status(200).json({msg:'Planet updated.'})
})

app.delete('/api/planets/:id', (req, res) => {
  const { id } = req.params
  planets = planets.filter((p)=> p.id !== Number(id))
  res.status(200).json({msg: 'Planet deleted.'})
})

app.listen(port, ()=>{
    console.log(`Example app listening on https://localhost:${port}`)
})
