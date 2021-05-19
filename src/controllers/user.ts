import db from "../db";
import { Request, Response } from "express";
import { RedisClient } from "redis";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import {
	validateRegisterParameters,
	validateLoginParameters,
	validateEmail,
} from "../utils/validate";
import { createErrorMsg, createSuccessMsg } from "../utils/messages";
import { sendEmail } from "../utils/sendEmail";

const register = async (req: Request, res: Response) => {
	const { userId, firstName, lastName, dob, phone, email, password } = req.body;

	const errors = validateRegisterParameters(
		userId,
		firstName,
		lastName,
		dob,
		phone,
		email,
		password
	);

	if (errors) {
		res.status(400).json(errors);
		return;
	}

	try {
		const passwordHash = await argon2.hash(password);

		await db.query(
			"INSERT INTO users(user_id, first_name, last_name, dob, phone, email, password_hash, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8)",
			[userId, firstName, lastName, dob, phone, email, passwordHash, new Date()]
		);

		req.session.userId = userId;

		res.json(createSuccessMsg("Successfully registered account"));
	} catch (e) {
		if (e.code === "23505") {
			res.status(400).json(createErrorMsg("User already exists"));
		} else {
			res.status(400).json(createErrorMsg(e.detail));
		}
	}
};

const login = async (req: Request, res: Response) => {
	const { userId, password } = req.body;

	const errors = validateLoginParameters(userId, password);

	if (errors) {
		res.status(400).json(errors);
		return;
	}

	try {
		const { rows } = await db.query(
			"SELECT password_hash FROM users WHERE user_id = $1",
			[userId]
		);

		if (!rows[0]) {
			res.status(400).json(createErrorMsg("Invalid login credentials"));
			return;
		}

		const passwordHash = rows[0].password_hash;

		if (await argon2.verify(passwordHash, password)) {
			req.session.userId = userId;
			res.json(createSuccessMsg("Successfully logged in"));
		} else {
			res.status(400).json(createErrorMsg("Invalid login credentials"));
		}
	} catch (e) {
		res.status(400).json(e);
	}
};

const logout = (req: Request, res: Response) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
			res.status(400).json(createErrorMsg("Unable to logout"));
			return;
		}

		res.clearCookie(COOKIE_NAME);
		res.json(createSuccessMsg("Successfully logged out"));
	});
};

const forgotPassword = async (
	req: Request,
	res: Response,
	client: RedisClient
) => {
	const { email } = req.body;

	const errors = validateEmail(email);

	if (errors) {
		res.status(400).json(errors);
		return;
	}

	try {
		const { rows } = await db.query(
			"SELECT user_id FROM users WHERE email = $1",
			[email]
		);

		const token = uuidv4();
		client.set(
			FORGET_PASSWORD_PREFIX + token,
			rows[0].user_id,
			"EX",
			60 * 60 * 24
		);

		await sendEmail(
			email,
			`<a href="http://localhost:3000/change-password/${token}">reset password</a>`
		);

		res.json(createSuccessMsg("Successfully sent email."));
	} catch (e) {
		res.status(400).json(e);
	}
};

const info = async (req: Request, res: Response) => {
	if (!req.session.userId) {
		res.status(400).json(createErrorMsg("Must be logged in to view this page"));
		return;
	}

	try {
		const { rows } = await db.query(
			"SELECT user_id, first_name, last_name, dob, phone, email, created_at FROM users WHERE user_id = $1",
			[req.session.userId]
		);

		res.json(rows[0]);
	} catch (e) {
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
	logout,
	forgotPassword,
	info,
	update,
	deactivate,
};
