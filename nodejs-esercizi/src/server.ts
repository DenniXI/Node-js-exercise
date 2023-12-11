import express  from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./Controllers/planets"
import multer from "multer"
import { logIn, signUp } from './Controllers/users'
import "./passport.js"
import { sign } from 'crypto'


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const port = 3000

const app = express()

app.use("./uploads",express.static("uploads"));

app.use(morgan("dev"))

app.use(express.json())

app.get('/planets', getAll)
app.get('/planets/:id', getOneById);
app.post('/planets', create)
app.put('/planets/:id', updateById)
app.delete('/planets/:id', deleteById)

app.post('/users/login', logIn);
app.post('/users/signup', signUp);

app.listen(port, ()=>{
    console.log(`Example app listening on https://localhost:${port}`)
})
