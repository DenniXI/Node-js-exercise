import express from 'express';
import morgan from 'morgan';
import 'express-async-errors'
import { getAll, getOneById, create, updateById, deleteById } from "./controllers/planets"

const port = 3000
const app = express()
app.use(morgan("dev"))


app.get('/api/planets', getAll)

app.get("/api/planets/:id", getOneById);

app.post('/api/planets', create)

app.put('/api/planets/:id', updateById)

app.delete('/api/planets/:id', deleteById)

app.listen(port, ()=>{
    console.log(`Example app listening on https://localhost:${port}`)
})
