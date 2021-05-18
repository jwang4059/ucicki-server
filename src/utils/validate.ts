import { errorMessage } from "../types";

export const validateUserId = (userId: string): errorMessage | null => {
	if (!userId) {
		return { field: "userId", message: "Missing userId" };
	}

	if (typeof userId !== "string") {
		return { field: "userId", message: "userId must be a string" };
	}

	if (userId.length > 20) {
		return { field: "userId", message: "userId must be 20 characters or less" };
	}

	return null;
};

export const validateFirstName = (firstName: string): errorMessage | null => {
	if (!firstName) {
		return { field: "firstName", message: "Missing first name" };
	}

	if (typeof firstName !== "string") {
		return { field: "firstName", message: "First name must be a string" };
	}

	if (firstName.length > 20) {
		return {
			field: "firstName",
			message: "First name must be 20 characters or less",
		};
	}

	return null;
};

export const validateLastName = (lastName: string): errorMessage | null => {
	if (!lastName) {
		return { field: "lastName", message: "Missing last name" };
	}

	if (typeof lastName !== "string") {
		return { field: "lastName", message: "Last name must be a string" };
	}

	if (lastName.length > 20) {
		return {
			field: "lastName",
			message: "Last name must be 20 characters or less",
		};
	}

	return null;
};

export const validateDob = (dob: Date): errorMessage | null => {
	if (!dob) {
		return { field: "dob", message: "Missing date of birth" };
	}

	if (typeof dob !== "string") {
		return { field: "dob", message: "Date must be a string" };
	}

	return null;
};

export const validatePhone = (phone: string): errorMessage | null => {
	if (!phone) {
		return { field: "phone", message: "Missing phone" };
	}

	if (typeof phone !== "string") {
		return { field: "phone", message: "Phone must be a string" };
	}

	if (!phone.match(/^[1-9]\d{2}-\d{3}-\d{4}/)) {
		return {
			field: "phone",
			message: "Phone must match the following format: xxx-xxx-xxxx",
		};
	}

	return null;
};

export const validateEmail = (email: string): errorMessage | null => {
	if (!email) {
		return { field: "email", message: "Missing email" };
	}

	if (typeof email !== "string") {
		return { field: "email", message: "Email must be a string" };
	}

	if (!email.match(/(\W|^)[\w.-]{0,25}@uci\.edu(\W|$)/)) {
		return { field: "email", message: "Email must be valid UCI email" };
	}

	return null;
};

export const validatePassword = (password: string): errorMessage | null => {
	if (!password) {
		return { field: "password", message: "Missing password" };
	}
	if (typeof password !== "string") {
		return { field: "password", message: "Password must be a string" };
	}
	if (password.length < 8) {
		return {
			field: "password",
			message: "Password must be at least 8 characters",
		};
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
): errorMessage | null => {
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
): errorMessage | null => {
	if (!userId || !password) {
		return {
			field: "login",
			message: "Missing login credentials",
		};
	}

	return null;
};
