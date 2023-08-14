"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const { JWT_SECRET } = process.env;
exports.JWT_SECRET = 'jwt_secret';
function signToken(user) {
    // toJSON() returns a basic js object with only the info from the db
    const userData = { ...user.toJSON() };
    delete userData.password;
    // @ts-ignore
    return jsonwebtoken_1.default.sign(userData, exports.JWT_SECRET);
}
module.exports = signToken;
