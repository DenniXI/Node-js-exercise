import * as dotenv from 'dotenv'
dotenv.config()
import {db} from "./../db"
import  { Request, Response }  from 'express';
import jwt from "jsonwebtoken"

const logIn = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const user = await db.one (`SELECT * FROM users WHERE username=$1`, username);
    if (user && user.password === password) {
        const payload = {
            id: user.id,
            username,
        }
        const {SECRET = ""} = process.env;
        const token = jwt.sign(payload, SECRET);
        await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token])
        res.status(200).json({id: user.id, username, token})
    } else {
        res.status(200).json({msg: "Username or password incorrect"});
    }
}



export {logIn}