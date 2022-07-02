const model = require("../models/users");
const controller = {};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN, { expiresIn: "1d" });
}

controller.retrieveAll = async function (req, res) {
  try {
    await model.findAll().then((result) => {
      if (result.length > 0) {
        res.status(200).json({
          message: "data user berhasil didapatkan",
          data: result,
        });
      } else {
        res.status(200).json({
          message: "data tidak ada",
          data: [],
        });
      }
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

controller.tampilregister = async function (req, res) {
  res.render("register");
}

controller.register = async function (req, res) {
  const { name, username, password, confPassword, role } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const usernameExist = await model.findOne({ where: { username: req.body.username} });
  if (usernameExist) return res.status(400).send("username sudah dipakai");

  try {
    await model.create({
      name: name,
      username: username,
      password: hashPassword,
      type: role,
    });
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
  }

  //redirect ke halaman login
};

controller.tampillogin = async function (req, res) {
  const token = req.cookies.token;
  if (token) return res.redirect('/');
  
  res.render("auth-login");
}

controller.login = async function (req, res) {
  //Cek username
  const user = await model.findOne({ where: { username: req.body.username } });
  if (!user) return res.status(400).send("username tidak ditemukan");

  //Cek Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password Salah");

  const nama = user.name;
  const username = user.username;
  const role = user.type;

  const token = generateAccessToken({ 
    username,nama,role
   });

  await model.update(
    { remember_token: token },
    {
      where: { username: req.body.username },
    }
  );

  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    // .json({token})
    .redirect("/");

};

controller.logout = async function (req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(200).json("Token tidak ada");
  const tokenDecoded = jwt.verify(token, process.env.TOKEN);
  const user = await model.findOne({
    where: {
      username: tokenDecoded.username,
    },
  });
  if (!user) return res.status(200).json("User tidak ada");
  const id = user.id;
  await model.update({ remember_token: null },
       { where: {id: id,},
    }
  );
  res
    .clearCookie("token")
    .redirect("/auth/login")
    // .locals = null;
    
  // res.sendStatus(200);

};

module.exports = controller;
