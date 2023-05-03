"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pet_1 = require("../controller/pet");
const validate_token_1 = __importDefault(require("./validate_token"));
const router = (0, express_1.Router)();
router.post("/", pet_1.newPet);
router.get("/", validate_token_1.default, pet_1.getPets);
exports.default = router;
