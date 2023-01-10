var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    res.render("home", { user: req.session.user, name: req.session.name });
  } else {
    res.redirect("/login");
  }
});

const credential = [
  {
    email: "sample1@gmail.com",
    password: "password1",
  },
  {
    email: "sample2@gmail.com",
    password: "password2",
  },
];
var errmsg = null;

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("index", { title: "Sample Login Page", err_msg: errmsg });
    errmsg = null;
  }
});

//login user
router.post("/login", (req, res) => {
  for (x of credential) {
    if (
      req.body.email == x.email &&
      req.body.password == x.password
    ) {
      flag = 0;
      req.session.user = req.body.email;
      req.session.name = x.name;
      res.redirect("/login");
      break;
    } else {
      flag = 1;
    }
  }
  if (flag == 1) {
    errmsg = "Invalid Username or Password";
    res.redirect("/login");
  }
});

//route for logout
router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.send("Error");
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;