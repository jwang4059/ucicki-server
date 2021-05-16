import express from "express";
import cors from "cors";

import User from "./controllers/user";

// Constants
const PORT = 4000;
const HOST = "0.0.0.0";

// App
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
	res.send("Hello World");
});

app.post("/register", (req, res) => {
	User.register(req, res);
});

app.post("/login", (req, res) => {
	User.login(req, res);
});

app.post("/deactivate", (req, res) => {
	User.deactivate(req, res);
});

app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});
