import sequelize from "../db/connection";
import { DataTypes } from "sequelize";
import { User } from "./user";

export const Pet = sequelize.define(
  "pets",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    especie: {
      type: DataTypes.STRING,
    },
    raza: {
      type: DataTypes.STRING,
    },
    fecha_nacimiento: {
      type: DataTypes.STRING,
    },
    foto: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);

Pet.belongsTo(User);

