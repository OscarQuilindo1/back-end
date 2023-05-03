"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.newUser = void 0;
const newUser = (req, res) => {
    const { body } = req;
    res.json({
        msg: "New User",
        body,
    });
};
exports.newUser = newUser;
const login = (req, res) => {
    const { body } = req;
    res.json({
        msg: "Login User",
        body,
    });
};
exports.login = login;
