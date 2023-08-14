import jwt from 'jsonwebtoken';
import User from '../models/User';

// const { JWT_SECRET } = process.env;
export const JWT_SECRET = 'jwt_secret';
// function for creating tokens

interface UserData {
    password?: string;
    name: string;
    email: string;
    id: number;
}

function signToken(user: User) {
    // toJSON() returns a basic js object with only the info from the db
    const userData: UserData = {...user.toJSON()};
    delete userData.password;
    // @ts-ignore
    return jwt.sign(userData, JWT_SECRET)
}

module.exports = signToken;