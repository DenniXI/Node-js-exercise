import  { Request, Response }  from 'express';
import {db}  from './../db'

const getAll = async (req: Request, res: Response) => {
    const planets = await db.many(`SELECT * FROM planets`);
    res.status(200).json(planets)
};

const getOneById = async (req: Request, res: Response) => {
    const id = JSON.parse(req.params.id);    
    const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1`, Number(id));
    res.status(200).json(planet);
};
const create = async (req: Request, res: Response) => {
    const { name } = req.body
    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name)
    res.status(201).json({ msg: 'Planet created.' })
};
const updateById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])
    res.status(200).json({ msg: 'Planet updated.' })
};
const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params
    await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
    res.status(200).json({ msg: 'Planet deleted.' })
};

const createImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const filename = req.file?.path;
    if (filename) {
        db.none(`UPDATE planets SET image=$2 WHERE id=$1`,[id, filename]);
        res.status(200).json({ msg: "planet image uploaded successfully."})
    } else{
        res.status(400).json({ msg: "planet image failed to upload."})
    }
}

export { getAll, getOneById, create, updateById, deleteById, createImage };