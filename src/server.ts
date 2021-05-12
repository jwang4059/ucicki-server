import express from "express";
import cors from "cors";

import User from "./controllers/user";

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
	res.send("Hello World");
});

app.post("/user/add", () => {
	User.createUser();
});

app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});
