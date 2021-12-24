const fs = require("fs");
const path = require("path");
const http = require("http");

const express = require("express");
let app = express();

let httpServer = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/build")));

app.set("trust proxy", 1);

app.get("/", (req, res) => {
	res.sendFile("index.html");
});

app.get("*", (req, res) => {
	console.log(req.path);
	res.redirect("/");
});

httpServer.listen(2003);
