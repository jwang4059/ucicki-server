import { Pool } from "pg";

const pool = new Pool({
	user: "postgres",
	host: "127.0.0.1",
	database: "ucicki",
	password: "mypassword",
	port: 5432,
});

const query = (text: string, params: any[]) => {
	return pool.query(text, params);
};

export default {
	query,
};
