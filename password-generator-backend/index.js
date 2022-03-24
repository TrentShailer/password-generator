import path, { dirname } from "path";
import http from "http";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import verbs from "./verbs.js";
import adjectives from "./adjectives.js";
import nouns from "./nouns.js";

import express from "express";
let app = express();

let httpServer = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/build")));

app.set("trust proxy", 1);

app.get("/", (req, res) => {
	res.sendFile("index.html");
});

app.get("/generate/*/*", (req, res) => {
	let passwords = [];
	let limits = req.params["1"].split(",");
	for (let i = 0; i < req.params["0"]; i++) {
		passwords.push(GeneratePassword([limits[0], limits[1]]));
	}
	res.send({ success: true, passwords: passwords });
});

function GeneratePassword(charLimit) {
	let password = "";

	let verb = verbs[Math.floor(Math.random() * verbs.length)];
	verb = `${verb[0].toUpperCase()}${verb.substring(1, verb.length)}`;

	let adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	adjective = `${adjective[0].toUpperCase()}${adjective.substring(1, adjective.length)}`;

	let noun = nouns[Math.floor(Math.random() * nouns.length)];
	noun = `${noun[0].toUpperCase()}${noun.substring(1, noun.length)}`;

	password += `${verb}-${adjective}-${noun}-${Math.floor(Math.random() * 10)}${Math.floor(
		Math.random() * 10
	)}`;

	if (password.length > charLimit[1] || password.length < charLimit[0]) {
		password = GeneratePassword(charLimit);
	}
	return password;
}

app.get("*", (req, res) => {
	console.log(req.path);
	res.redirect("/");
});

httpServer.listen(2003);
