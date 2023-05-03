"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPet = exports.getPets = void 0;
const pet_1 = require("../models/pet");
const getPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPets = yield pet_1.Pet.findAll();
    res.json(listPets);
});
exports.getPets = getPets;
const newPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, especie, raza, foto, fecha_nacimiento, } = req.body;
    try {
        // Se cargan los datos en la DB
        yield pet_1.Pet.create({
            nombre: nombre,
            especie: especie,
            raza: raza,
            fecha_nacimiento: fecha_nacimiento,
            foto: foto,
        });
        res.json({
            msg: `${nombre} creado`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error",
            error,
        });
    }
});
exports.newPet = newPet;
