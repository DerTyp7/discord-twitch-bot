const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const { v4 } = require("uuid");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = 3000;
const oneDay = 1000 * 60 * 60 * 24;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.set("view engine", "ejs");
app.use(
	session({
		secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
		saveUninitialized: true,
		cookie: { maxAge: oneDay },
		resave: false,
	})
);

app.get("/", (req, res) => {
	let discordAuthenticated = false;
	let twitchAuthenticated = false;

	if (req.session.discordCode && req.session.discordGuildId) {
		discordAuthenticated = true;
	}

	if (req.session.twtichCode) {
		twitchAuthenticated = true;
	}

	res.render("./index.ejs", {
		discordAuthenticated: discordAuthenticated,
		twitchAuthenticated: twitchAuthenticated,
	});
});

app.get("/logout", (req, res) => {
	req.session.destroy();
	res.redirect("/");
});

app.get("/authorize/twitch", (req, res) => {
	req.session.twtichCode = req.query.code;
	res.redirect("/");
});

app.get("/authorize/discord", (req, res) => {
	req.session.discordCode = req.query.code;
	req.session.discordGuildId = req.query.guild_id;
	res.redirect("/");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
