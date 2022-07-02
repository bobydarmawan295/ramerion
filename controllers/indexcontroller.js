// daftar controller
const indexcontroller = {};

indexcontroller.blog = require("./blog");
indexcontroller.ecommerce = require("./ecommerce");
indexcontroller.forum = require("./forum");
indexcontroller.users = require("./users");

module.exports = indexcontroller;