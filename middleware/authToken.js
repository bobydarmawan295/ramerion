const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

app.set("view engine", "ejs");
app.use(express.static("public"));

// function authenticateToken(req, res, next) {
//   const token = req.cookies.jwt;

//   if (token == null) return res.status(401).send(`Akses ditolak`);

//   jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
//     console.log(err)
//     if (err) return res.status(403).send(`Token tidak valid`)
//       next();
//   })
// }

const checkUser = (req,res,next) =>{
  const token = req.cookies.token

  if(token){
      jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.locals.user = null
          next()
        } else {
          res.locals.username= decodedToken.username;
          res.locals.nama= decodedToken.nama;
          res.locals.id= decodedToken.id;
          // console.log(res.locals);
          next();
        }
      });
  }else{
    res.locals.nama= "user";
    res.locals.id= 0;
      next()
  }
}

function isLogin(req, res, next) {
  const token = req.cookies.token

  if(token){
  jwt.verify(token, process.env.TOKEN, (err, decodedToken) =>{
      if(err){
          console.log(err.message)
          res.send('token error');  //505
      }else{
          console.log(decodedToken);
          // const role = decodedToken.role;
          // if (role != "mahasiswa") return res.render("eror403");
          next()
      }
  })
} else{
  res.render("eror403")
  }
}



module.exports = {isLogin ,checkUser};