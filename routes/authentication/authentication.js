const { Router } = require("express");
const authRoute = Router();
const bcrypt = require("bcryptjs");
const User = require("./../../models/user");

authRoute.get("/signin", (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("authentication/signin");
  }
});

authRoute.post("/signin", (req, res, next) => {
  console.log("signin page");
  const username = req.body.username;
  const password = req.body.password;
  let user;
  User.findOne({ username })
    .then((doc) => {
      user = doc;
      if (user) {
        return bcrypt.compare(password, user.hash);
      } else {
        return Promise.reject(new Error("This username doesn't exists"));
      }
    })
    .then((comparison) => {
      if (comparison) {
        req.session.userId = user._id;
        res.redirect("/");
      } else {
        return Promise.reject(new Error("This password doesn't match"));
      }
    })
    .catch((error) => {
      next(error);
    });
});

authRoute.get("/signup", (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("authentication/signup");
  }
});

authRoute.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let user;
  User.findOne({ username })
    .then((doc) => {
      user = doc;
      if (!user) {
        return bcrypt.hash(password, 10);
      } else {
        return Promise.reject("This username already exists");
      }
    })
    .then((hashedPw) => {
      return User.create({
        username,
        hash: hashedPw,
      });
    })
    .then((newUser) => {
      req.session.userId = newUser._id;
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/");
    });
});

authRoute.post("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = authRoute;
