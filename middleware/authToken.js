const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

app.set("view engine", "ejs");
app.use(express.static("public"));

function authenticateToken(req, res, next) {
  const token = req.cookies.jwt;

  if (token == null) return res.status(401).send(`Akses ditolak`);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
    console.log(err)
    if (err) return res.status(403).send(`Token tidak valid`)
      next();
  })
}

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await users.findByPk(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// function isDosen(req, res, next) {
//   const token = req.cookies.token

//   if(token){
//   jwt.verify(token, process.env.TOKEN, (err, decodedToken) =>{
//       if(err){
//           console.log(err.message)
//           res.send('token error');  //505
//       }else{
//           // console.log(decodedToken);
//           const role = decodedToken.role;
//           if (role != "D") return res.render("eror403");
//           next()
//       }
//   })
// } else{
//   res.render("eror403")
//   }
// }

// function isAdmin(req, res, next) {
//   const token = req.cookies.token

//   if(token){
//   jwt.verify(token, process.env.TOKEN, (err, decodedToken) =>{
//       if(err){
//           console.log(err.message)
//           res.send('token error');  //505
//       }else{
//           const role = decodedToken.role;
//           if (role != "T") return res.render("eror403");
//           next()
//       }
//   })
// } else{
//   res.render("eror403")
//   }
// }

// const checkUser = (req,res,next) =>{
//   const token = req.cookies.token

//   if(token){
//       jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
//         if (err) {
//           console.log(err.message);
//           res.locals.user = null
//           next()
//         } else {
//           res.locals.email= decodedToken.email;
//           res.locals.nama= decodedToken.nama;
//           res.locals.role= decodedToken.role;
//           // console.log(res.locals);
//           next();
//         }
//       });
//   }else{
//     res.locals.nama= "user";
//     res.locals.role= "M";
//       next()
//   }
// }

module.exports = {authenticateToken ,checkUser};