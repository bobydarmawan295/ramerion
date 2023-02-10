// daftar controller
const indexcontroller = {};

indexcontroller.blog = require("./blog");
indexcontroller.marketplace = require("./marketplace");
indexcontroller.forum = require("./forum");
indexcontroller.users = require("./users");
indexcontroller.kelola = require("./kelola");

module.exports = indexcontroller;