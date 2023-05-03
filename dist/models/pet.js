"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
exports.Pet = connection_1.default.define("pets", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    especie: {
        type: sequelize_1.DataTypes.STRING,
    },
    raza: {
        type: sequelize_1.DataTypes.STRING,
    },
    fecha_nacimiento: {
        type: sequelize_1.DataTypes.STRING,
    },
    foto: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.Pet.belongsTo(user_1.User);
