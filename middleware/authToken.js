const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

app.set("view engine", "ejs");
app.use(express.static("public"));

function isDosen(req, res, next) {
  const token = req.cookies.token

  if(token){
  jwt.verify(token, process.env.TOKEN, (err, decodedToken) =>{
      if(err){
          console.log(err.message)
          res.send('token error');  //505
      }else{
          // console.log(decodedToken);
          const role = decodedToken.role;
          if (role != "D") return res.render("eror403");
          next()
      }
  })
} else{
  res.render("eror403")
  }
}

function isAdmin(req, res, next) {
  const token = req.cookies.token

  if(token){
  jwt.verify(token, process.env.TOKEN, (err, decodedToken) =>{
      if(err){
          console.log(err.message)
          res.send('token error');  //505
      }else{
          const role = decodedToken.role;
          if (role != "T") return res.render("eror403");
          next()
      }
  })
} else{
  res.render("eror403")
  }
}

const checkUser = (req,res,next) =>{
  const token = req.cookies.token

  if(token){
      jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.locals.user = null
          next()
        } else {
          res.locals.email= decodedToken.email;
          res.locals.nama= decodedToken.nama;
          res.locals.role= decodedToken.role;
          // console.log(res.locals);
          next();
        }
      });
  }else{
    res.locals.nama= "user";
    res.locals.role= "M";
      next()
  }
}

module.exports = {isDosen, isAdmin ,checkUser};