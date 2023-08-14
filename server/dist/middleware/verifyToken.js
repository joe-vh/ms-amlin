"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const signToken_1 = require("../auth/signToken");
// function for verifying tokens
async function verifyToken(req, res, next) {
    // grab token from either headers, req.body, or query string
    const token = req.get('token') || req.body.token || req.query.token;
    // if no token present, deny access
    if (!token)
        return res.status(401).json({ success: false, message: "No token provided" });
    // otherwise, try to verify token
    // @ts-ignore
    jsonwebtoken_1.default.verify(token, signToken_1.JWT_SECRET, async (err, decodedData) => {
        // if problem with token verification, deny access
        if (err)
            return res.status(401).json({ success: false, message: "Invalid token." });
        // otherwise, search for user by id that was embedded in token
        const user = await User_1.default.findOne({ where: { id: decodedData._id } });
        // if no user, deny access
        if (!user)
            return res.status(401).json({ success: false, message: "Invalid token." });
        // otherwise, add user to req object
        req.user = user;
        // go on to process the route:
        next();
    });
}
module.exports = verifyToken;
