import express from "express";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import cors from "cors";

import { __prod__, COOKIE_NAME } from "./constants";
import User from "./controllers/user";

// Constants
const PORT = 4000;
const HOST = "0.0.0.0";

// App
const app = express();
const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

app.set("trust porxy", 1);
app.use(cors());

app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		name: COOKIE_NAME,
		cookie: {
			maxAge: 1000 * 60 * 60 * 7, // 7 days
			httpOnly: true,
			sameSite: "lax",
			secure: __prod__,
		},
		secret: "secret",
		saveUninitialized: false,
		resave: false,
	})
);

app.use(express.json());

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
