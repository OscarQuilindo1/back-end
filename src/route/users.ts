import { Router } from "express";
import { login, newUser } from "../controller/user";

const router = Router();

router.post("/", newUser);
router.post("/login", login);

export default router;
