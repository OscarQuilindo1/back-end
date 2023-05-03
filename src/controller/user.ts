import { Request, Response } from "express";
import bcryp, { hash } from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

export const newUser = async (req: Request, res: Response) => {
  const { nombre, contrasena, email, fecha_nacimiento } = req.body;

  //Validación usuario existente
  const user = await User.findOne({ where: { email: email } });

  if (user) {
    return res.status(400).json({
      msg: `Email ${email} ya existe`,
    });
  }

  //se crea la constante hashcontraseña para encriptar la contrasena
  const hashcontrasena = await bcryp.hash(contrasena, 10);

  try {
    // Se cargan los usuarios en la DB
    await User.create({
      nombre: nombre,
      contrasena: hashcontrasena,
      email: email,
      fecha_nacimiento: fecha_nacimiento,
    });
    res.json({
      msg: `Usuario ${nombre} creado`,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Ocurrio un error",
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, contrasena } = req.body;

  //Validación de Usuario
  const user: any = await User.findOne({ where: { email: email } });

  if (!user) {
    return res.status(400).json({
      msg: `Email ${email} no existe`,
    });
  }
  //Validación de contrasena
  const contrasenaValida = await bcryp.compare(contrasena, user.contrasena);

  if (!contrasenaValida) {
    return res.status(400).json({
      msg: `contraseña incorrecta`,
    });
  }

  //Generar Token
  const token = jwt.sign(
    {
      email: email,
    },
    process.env.KEY_SECRET || "1422",
    { expiresIn: "3h" }
  );

  res.json(token);
};