import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    contrasena: {
      type: DataTypes.STRING,
    },
    fecha_nacimiento: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

