var express = require("express");
var dotenv = require("dotenv");
var mysql = require("mysql");
var app = express();

app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dotenv.config({ path: "./.env" });

var db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Mysql connected");
  }
});

app.use("/", require("./routes/page"));
app.use("/auth", require("./routes/auth"));

app.listen(3000, function () {
  console.log("Server has been started on port 3000");
});
