const express = require("express");
const mongoose = require("mongoose");
const { DB_STRING } = require("./config/server.config");
const app = express();

mongoose.connect(DB_STRING);

let db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("DB connected successfully"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//importing routes
require("./routes/auth.route")(app);
require("./routes/movies.route")(app);
require("./routes/theater.routes.js")(app)

app.listen(8080, () => console.log("server running is on port 8080"));
