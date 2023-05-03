"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pet_1 = require("./pet");
const user_1 = require("./user");
pet_1.Pet.belongsTo(user_1.User);
user_1.User.hasMany(pet_1.Pet);
