import { Router } from "express";
import { getPets, newPet } from "../controller/pet";
import validateToken from "./validate_token";

const router = Router();
router.post("/", newPet);
router.get("/",validateToken, getPets);

export default router;
