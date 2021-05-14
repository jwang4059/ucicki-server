export interface errorMessage {
	field: string;
	message: string;
}

export interface validationResponse {
	valid: boolean;
	error: errorMessage | null;
}
