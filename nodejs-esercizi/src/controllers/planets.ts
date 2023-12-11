import { Request, Response } from "express"
import pgPromise from 'pg-promise'

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/video")
console.log(db)

const setupDb = async () => {
    await db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets(
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL 
        )
    `)
    await db.none(`INSERT INTO planets (name) VALUES ('Earth')`)
    await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)

    // const planets = await db.many(`SELECT * FROM planets`);
    // console.log(planets)
}
setupDb()

// type Planet = {
//     id: number,
//     name: string,
// };

// type Planets = Planet[];

// let planets: Planets = [
//     {
//         id: 1,
//         name: "Earth",
//     },
//     {
//         id: 2,
//         name: "Mars",
//     },
// ];

const getAll = async (req: Request, res: Response) => {
    const planets = await db.many(`SELECT * FROM planets`);
    res.status(200).json(planets)
};

const getOneById = async (req: Request, res: Response) => {
    const id = JSON.parse(req.params.id);    
    const planet = await db.oneOrNone
    (`SELECT * FROM planets WHERE id=$1`, Number(id));
    res.status(200).json(planet);
};

const create = async (req: Request, res: Response) => {
    const { id, name } = req.body
    const newPlanet = { id, name }
    // planets = [...planets, newPlanet]
    res.status(201).json({ msg: 'Planet created.' })
};

const updateById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    // planets = planets.map((p) => p.id === Number(id) ? ({ ...p, name }) : p)
    res.status(200).json({ msg: 'Planet updated.' })
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params
    // planets = planets.filter((p) => p.id !== Number(id))
    res.status(200).json({ msg: 'Planet deleted.' })
}

export { getAll, getOneById, create, updateById, deleteById };