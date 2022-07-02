const users = require("../models/users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const controller = {};

controller.login = async function (email, password) {
  const user = await users.findOne({ where: { email: email } });
  if (user) {
    const auth = await users.findOne({ where: { password: password } });
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

// handle errors
controller.handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
dotenv.config();
let secret = process.env.TOKEN_SECRET;
const createToken = (id, type) => {
  return jwt.sign({ id, type }, secret, {
    expiresIn: maxAge,
  });
};

controller.signup_get = (req, res) => {
  res.render("signup");
};

controller.login_get = (req, res) => {
  res.render("login");
};

controller.signup_post = async (req, res) => {
  const { name, email, password, confPassword, type } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const emailExist = await users.findOne({ where: { email: req.body.email } });
  if (emailExist) return res.status(400).send("Email sudah dipakai");

  try {
    await users.create({
      name: name,
      email: email,
      password: hashPassword,
      type: type,
    });
    res.redirect("/auth/login");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

ccontroller.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    if (!user) return res.status(400).send("Email tidak ditemukan");

    // Cek Password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Password Salah");

    let today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;

    const token = createToken(user.id, user.type);
    const type = user.type;

    await users.update(
      {
        remember_token: token,
        email_verified_at: dateTime,
      },
      {
        where: { email: req.body.email },
      }
    );

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }).cookie("type", type, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user: user.id });
    // res.redirect('/')
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

controller.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("type", "", { maxAge: 1 });
  // res.clearCookie('jwt');
  res.redirect("/auth/login");
};

module.exports = controller;
