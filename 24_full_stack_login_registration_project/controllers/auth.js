var mysql = require("mysql");
var bcrypt = require("bcryptjs");
var async = require("hbs/lib/async");
var db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.register = function (req, res) {
  const { name, email, password, passwordConfirm } = req.body;
  db.query(
    "select email from users where email = ?",
    [email],
    function (error, results) {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.render("register", {
          message: "That email is already token",
        });
      } else if (password != passwordConfirm) {
        return res.render("register", {
          message: "password do not match",
        });
      }
      let hashPassword = bcrypt.hash(password, 8);
      console.log(hashPassword);
      db.query(
        "insert into users SET ?",
        { name: name, email: email, password: hashPassword },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
            return res.render("register", {
              message: "User registered",
            });
          }
        }
      );
    }
  );
};

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("login", {
        message: "Kechirasiz, email yoki password xato",
      });
    }
    db.query(
      "select * from users where email = ?",
      [email],
      async (error, results) => {
        console.log(results);
        if (results || !(await bcrypt.compare(password, results[0].password))) {
          res.status(401).render("login", {
            message: "Email or Password is incorrect",
          });
        } else {
          const id = results[0].id;
          res.status(200).redirect("/");
        }
      }
    );
  } catch {
    console.log(error);
  }
};
