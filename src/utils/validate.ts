import { message } from "../types";
import { createErrorMsg } from "./messages";

export const validateUserId = (userId: string): message | null => {
	if (!userId) {
		return createErrorMsg("Missing userId");
	}

	if (typeof userId !== "string") {
		return createErrorMsg("userId must be a string");
	}

	if (userId.length > 20) {
		return createErrorMsg("userId must be 20 characters or less");
	}

	return null;
};

export const validateFirstName = (firstName: string): message | null => {
	if (!firstName) {
		return createErrorMsg("Missing first name");
	}

	if (typeof firstName !== "string") {
		return createErrorMsg("First name must be a string");
	}

	if (firstName.length > 20) {
		return createErrorMsg("First name must be 20 characters or less");
	}

	return null;
};

export const validateLastName = (lastName: string): message | null => {
	if (!lastName) {
		return createErrorMsg("Missing last name");
	}

	if (typeof lastName !== "string") {
		return createErrorMsg("Last name must be a string");
	}

	if (lastName.length > 20) {
		return createErrorMsg("Last name must be 20 characters or less");
	}

	return null;
};

export const validateDob = (dob: Date): message | null => {
	if (!dob) {
		return createErrorMsg("Missing date of birth");
	}

	if (typeof dob !== "string") {
		return createErrorMsg("Date must be a string");
	}

	return null;
};

export const validatePhone = (phone: string): message | null => {
	if (!phone) {
		return createErrorMsg("Missing phone number");
	}

	if (typeof phone !== "string") {
		return createErrorMsg("Phone must be a string");
	}

	if (!phone.match(/^[1-9]\d{2}-\d{3}-\d{4}/)) {
		return createErrorMsg(
			"Phone must match the following format: xxx-xxx-xxxx"
		);
	}

	return null;
};

export const validateEmail = (email: string): message | null => {
	if (!email) {
		return createErrorMsg("Missing email address");
	}
	if (typeof email !== "string") {
		return createErrorMsg("Email must be a string");
	}

	if (!email.match(/(\W|^)[\w.-]{0,25}@uci\.edu(\W|$)/)) {
		return createErrorMsg("Email must be valid UCI email");
	}

	return null;
};

export const validatePassword = (password: string): message | null => {
	if (!password) {
		return createErrorMsg("Missing password");
	}
	if (typeof password !== "string") {
		return createErrorMsg("Password must be a string");
	}
	if (password.length < 8) {
		return createErrorMsg("Password must be at least 8 characters");
	}

	return null;
};

export const validateRegisterParameters = (
	userId: string,
	firstName: string,
	lastName: string,
	dob: Date,
	phone: string,
	email: string,
	password: string
): message | null => {
	let errors = null;

	errors = validateUserId(userId);
	if (errors) return errors;
	errors = validateFirstName(firstName);
	if (errors) return errors;
	errors = validateLastName(lastName);
	if (errors) return errors;
	errors = validateDob(dob);
	if (errors) return errors;
	if (phone) {
		errors = validatePhone(phone);
	}
	if (errors) return errors;
	errors = validateEmail(email);
	if (errors) return errors;
	errors = validatePassword(password);
	if (errors) return errors;

	return null;
};

export const validateLoginParameters = (
	userId: string,
	password: string
): message | null => {
	if (!userId || !password) {
		return createErrorMsg("Missing login credentials");
	}

	return null;
};
