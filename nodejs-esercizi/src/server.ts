import express from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import { getAll, getOneById, create, updateById, deleteById, createImage } from "./controllers/planets";
import multer from "multer"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({storage});

const port = 3000
const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

app.get('/planets', getAll);

app.get("/planets/:id", getOneById);

app.post('/planets', create);

app.put('/planets/:id', updateById);

app.delete('/planets/:id', deleteById);

app.post('planets/:id/image', upload.single("image"), createImage);

app.listen(port, ()=>{
    console.log(`Example app listening on https://localhost:${port}`)
})
