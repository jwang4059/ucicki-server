import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const query = (text: string, params: any[]) => {
	return pool.query(text, params);
};

export default {
	query,
};
