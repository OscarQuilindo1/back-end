import { Request, Response } from "express";
import { Pet } from "../models/pet";

export const getPets = async (req: Request, res: Response) => {
  const listPets = await Pet.findAll();
  res.json(listPets);
};

export const newPet = async (req: Request, res: Response) => {
  const { nombre, especie, raza, foto, fecha_nacimiento, } = req.body;

  

  try {
    // Se cargan los datos en la DB
    await Pet.create({
      nombre: nombre,
      especie: especie,
      raza: raza,
      fecha_nacimiento: fecha_nacimiento,
      foto: foto,
    });
    res.json({
      msg: `${nombre} creado`,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Ocurrio un error",
      error,
    });
  }
};
