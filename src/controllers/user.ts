import db from "../db";
import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
	const { userId, firstName, lastName, phone, email, password } = req.body;

	const date = new Date();

	try {
		const { rows } = await db.query(
			"INSERT INTO users(user_id, first_name, last_name, dob, phone, email, password_hash, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
			[userId, firstName, lastName, date, phone, email, password, date, date]
		);

		res.json(rows[0]);
	} catch (e) {
		console.log(e);
		res.status(400).json(e);
	}
};

const login = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);

		res.json(rows[0]);
	} catch (e) {
		console.log(e);
		res.status(400).json(e);
	}
};

const updateUser = () => {
	console.log("updating");
};

const deleteUser = () => {
	console.log("deleting");
};

export default {
	register,
	login,
	updateUser,
	deleteUser,
};
