import { message } from "../types";

export const createErrorMsg = (msg: string): message => {
	return {
		status: "failed",
		message: msg,
	};
};

export const createSuccessMsg = (msg: string): message => {
	return {
		status: "success",
		message: msg,
	};
};
