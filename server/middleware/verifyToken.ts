import jwt from 'jsonwebtoken';
import User from '../models/User';
import {Request, Response, NextFunction} from "express";
import {JWT_SECRET} from '../auth/signToken';
// function for verifying tokens
interface AuthRequest extends Request {
	user?: User;
	token?: string;
}
async function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
	// grab token from either headers, req.body, or query string
	const token = req.get('token') || req.body.token || req.query.token
	// if no token present, deny access
	if (!token) return res.status(401).json({success: false, message: "No token provided"})
	// otherwise, try to verify token
	// @ts-ignore
	jwt.verify(token, JWT_SECRET, async (err: Error, decodedData: any) => {
		// if problem with token verification, deny access
		if (err) return res.status(401).json({success: false, message: "Invalid token."})
		// otherwise, search for user by id that was embedded in token
		const user = await User.findOne({ where: {id: decodedData._id } });

		// if no user, deny access
		if (!user) return res.status(401).json({success: false, message: "Invalid token."});
		// otherwise, add user to req object
		req.user = user;
		// go on to process the route:
		next();
	})
}

module.exports = verifyToken;