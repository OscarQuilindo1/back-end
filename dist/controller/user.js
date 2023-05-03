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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, contrasena, email, fecha_nacimiento } = req.body;
    //Validación usuario existente
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({
            msg: `Email ${email} ya existe`,
        });
    }
    //se crea la constante hashcontraseña para encriptar la contrasena
    const hashcontrasena = yield bcrypt_1.default.hash(contrasena, 10);
    try {
        // Se cargan los usuarios en la DB
        yield user_1.User.create({
            nombre: nombre,
            contrasena: hashcontrasena,
            email: email,
            fecha_nacimiento: fecha_nacimiento,
        });
        res.json({
            msg: `Usuario ${nombre} creado`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error",
            error,
        });
    }
});
exports.newUser = newUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contrasena } = req.body;
    //Validación de Usuario
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(400).json({
            msg: `Email ${email} no existe`,
        });
    }
    //Validación de contrasena
    const contrasenaValida = yield bcrypt_1.default.compare(contrasena, user.contrasena);
    if (!contrasenaValida) {
        return res.status(400).json({
            msg: `contraseña incorrecta`,
        });
    }
    //Generar Token
    const token = jsonwebtoken_1.default.sign({
        email: email,
    }, process.env.KEY_SECRET || "1422", { expiresIn: "3h" });
    res.json(token);
});
exports.login = login;
