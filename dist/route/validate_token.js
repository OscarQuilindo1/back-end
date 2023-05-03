"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    let token = req.headers["authorization"];
    //console.log(token);
    if (!token) {
        res.status(401).send({
            error: "Es necesario un token",
        });
        return;
    }
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
        console.log(token);
    }
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.KEY_SECRET || "1422", (error, decoded) => {
            if (error) {
                return res.json({
                    message: "Token no valido",
                });
            }
            else {
                req.body.decoded = decoded;
                next();
            }
        });
    }
};
//   if (token != undefined ) {
//     const bearer = 
//     next();
//   } else {
//     res.status(401).json({
//       error: "Es necesario un token",
//     });
//   }
exports.default = validateToken;
