import {User} from '../models/User';
import {Request, Response} from "express";
import bcrypt from 'bcrypt';

const signToken = require('../auth/signToken');

const validPassword = (password: string, userPassword: string) => bcrypt.compareSync(password, userPassword);

const generateHash = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

module.exports = {
	// list all users (select * from)
	index: async (req: Request, res: Response) => {
		const users = await User.findAll();
		return res.json(users);
	},

	// get one user (select distinct from users where email = ?)
	show: async (req: Request, res: Response) => {
		const user = await User.findOne({
			where: {email: req.body.email}
		});

		return user;
	},

	// create a new user (insert into users email = ?, password = ?)
	create: async (req: Request, res: Response) => {
		try {
			const newUser = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: generateHash(req.body.password)
			})

			const token = signToken(newUser);

			res.json({success: true, message: "User created. Token attached.", token});
		} catch (e) {
			if (e instanceof Error) {
				return res.status(409).json({success: false, message: e.message});
			}
		}
	},

	// update an existing user (update users set password = ? where email = ?)
	update: async (req: Request, res: Response) => {
		try {
			const user = await User.findOne({
				where: {email: req.params.id} // .email
			});

			if (user) {
				Object.assign(user, req.body);

				if (req.body.password) {
					user.password = generateHash(req.body.password);
				}

				await user.save();
			}

			return res.json({success: true, message: 'User updated.', user});
		} catch (e) {
			if (e instanceof Error) {
				return res.status(409).json({success: false, message: e.message});
			}
		}
	},

	// delete an existing user (delete from users where email = ?)
	destroy: async (req: Request, res: Response) => {
		try {
			const user = await User.findOne({
				where: {email: req.params.id} // .email
			});

			if (user) {
				await user.destroy();
			}

			return res.json({success: true, message: 'User deleted.', user});
		} catch (e) {
			if (e instanceof Error) {
				return res.status(409).json({success: false, message: e.message});
			}
		}
	},

	// the login route
	authenticate: async (req: Request, res: Response) => {
		try {
			// check if the user exists (select distinct from users where email = ?)
			const user = await User.findOne({
				where: {email: req.body.email} // .id
			});
			// if there's no user or the password is invalid
			if(!user || !validPassword(req.body.password, user.password)) {
				// deny access
				return res.status(401).json({success: false, message: "Invalid credentials."})
			}

			const token = signToken(user)
			return res.json({success: true, message: "Token attached.", token});
		} catch (e) {
			if (e instanceof Error) {
				return res.status(409).json({success: false, message: e.message});
			}
		}
	}
}