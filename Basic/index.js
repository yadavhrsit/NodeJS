const config = require("config");
const Joi = require("joi");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const courses = require("./routes/courses");
const home = require("./routes/home");
const logger = require("./middleware/logger");
const express = require("express");
const app = express();

app.set("view engine", "pug"); // to enclude pug template engine

app.use(express.json());
app.use(express.static("public")); //built in middleware to store static assets
if (app.get("env") === "production") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan Enabled");
}
app.use("/api/courses", courses); // routing to courses router for all /api/courses requests
app.use("/", home); // routing to home router for all / or we can say root requests

dbDebugger("connected to Database");

// configuration
console.log("App name: " + config.get("name"));
console.log("Mail Server name: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

// app.get("/", (req, res) => {
//   res.send("Hello W");
// });

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started on Port : ${port}`);
});
