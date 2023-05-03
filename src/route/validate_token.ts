import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
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
    jwt.verify(token, process.env.KEY_SECRET || "1422", (error, decoded) => {
      if (error) {
        return res.json({
          message: "Token no valido",
        });
      } else {
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


export default validateToken;
