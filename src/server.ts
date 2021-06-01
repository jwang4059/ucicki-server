import express from "express";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import cors from "cors";

import "./env";
import { __prod__, COOKIE_NAME } from "./constants";
import User from "./controllers/user";

declare module "express-session" {
	interface Session {
		userId: string;
	}
}

// App
const app = express();
const RedisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS_URL);

app.set("trust porxy", 1);
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use(
	session({
		store: new RedisStore({ client: redis }),
		name: COOKIE_NAME,
		cookie: {
			domain: __prod__ ? ".ucicirclek.xyz" : undefined,
			path: "/",
			httpOnly: true,
			sameSite: "lax",
			secure: __prod__,
			maxAge: 1000 * 60 * 60 * 7, // 7 days
		},
		secret: <string>process.env.SESSION_SECRET,
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

app.post("/logout", (req, res) => {
	User.logout(req, res);
});

app.post("/forgot-password", (req, res) => {
	User.forgotPassword(req, res, redis);
});

app.post("/change-password", (req, res) => {
	User.changePassword(req, res, redis);
});

app.post("/change-password-token", (req, res) => {
	User.validatePassswordToken(req, res, redis);
});

app.get("/user/info", (req, res) => {
	User.info(req, res);
});

app.post("/deactivate", (req, res) => {
	User.deactivate(req, res);
});

app.listen(parseInt(<string>process.env.PORT), () => {
	console.log(`Running on http://ucicirclek.xyz:${process.env.PORT}`);
});
