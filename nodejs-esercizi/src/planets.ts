import { Request, Response } from "express"

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

const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets)
};

const getOneById = (req: Request, res: Response) => {
    const id = JSON.parse(req.params.id);
    const findUser = planets.find((planet) => planet.id === id);
    res.status(200).json(findUser);
};

const create = (req: Request, res: Response) => {
    const { id, name } = req.body
    const newPlanet = { id, name }
    planets = [...planets, newPlanet]
    res.status(201).json({ msg: 'Planet created.' })
};

const updateById = (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    planets = planets.map((p) => p.id === Number(id) ? ({ ...p, name }) : p)
    res.status(200).json({ msg: 'Planet updated.' })
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params
    planets = planets.filter((p) => p.id !== Number(id))
    res.status(200).json({ msg: 'Planet deleted.' })
}

export { getAll, getOneById, create, updateById, deleteById };