const model = require('../models/indexmodel');
const { Op, QueryTypes  } = require("sequelize");
const sequelize = require("../config/conn");
const controller = {};

controller.indexforum = async (req, res) => {
    res.render("kelola/index-forum")
}



module.exports = controller;
