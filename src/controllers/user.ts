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

const update = async (req: Request, res: Response) => {
	const { userId, firstName, lastName, phone, email, password } = req.body;

	const date = new Date();

	try {
		const { rows } = await db.query(
			"UPDATE users SET user_id = $1, first_name = $2, last_name = $3, dob = $4, phone = $5, email = $6, password_hash = $7, created_at = $8, updated_at = $9 WHERE user_id = $1",
			[userId, firstName, lastName, date, phone, email, password, date, date]
		);

		res.json(rows[0]);
	} catch (e) {
		console.log(e);
		res.status(400).json(e);
	}
};

const deactivate = async (req: Request, res: Response) => {
	const { userId } = req.body;

	try {
		const { rows } = await db.query("DELETE FROM users WHERE user_id = $1", [
			userId,
		]);

		res.json(rows[0]);
	} catch (e) {
		console.log(e);
		res.status(400).json(e);
	}
};

export default {
	register,
	login,
	update,
	deactivate,
};
