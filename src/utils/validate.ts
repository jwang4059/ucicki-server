import { validationResponse } from "../types";

export const validateEmail = (email: string): Boolean => {
	if (!email) {
		return false;
	} else if (typeof email !== "string") {
		return false;
	} else if (email.endsWith("@uci.edu")) {
		return false;
	} else {
		return true;
	}
};

export const validatePassword = (password: string): Boolean => {
	if (!password) {
		return false;
	} else if (typeof password !== "string") {
		return false;
	} else if (password.length < 8) {
		return false;
	} else {
		return true;
	}
};

export const validateRegisterParameters = (
	userId: string,
	firstName: string,
	lastName: string,
	phone: string,
	email: string,
	password: string
): validationResponse => {
	const params = [userId, firstName, lastName, phone, email, password];

	if (!params.every(Boolean)) {
		return {
			valid: false,
			error: { field: "params", message: "Missing required parameters" },
		};
	} else if (
		![userId, firstName, lastName, phone, email, password].every(
			(param) => typeof param === "string"
		)
	) {
		return {
			valid: false,
			error: { field: "params", message: "Invalid parameter types" },
		};
	}

	// Add dob, email, password validation after frontend is done

	//Include username and password length validation

	return {
		valid: true,
		error: null,
	};
};

export const validateLoginParameters = (
	email: string,
	password: string
): validationResponse => {
	if (!email || !password) {
		return {
			valid: false,
			error: {
				field: "login",
				message: "Missing login credentials",
			},
		};
	} else {
		return {
			valid: true,
			error: null,
		};
	}
};
