const model = require('../models/indexmodel');
const { Op, QueryTypes  } = require("sequelize");
const sequelize = require("../config/conn");
const controller = {};

controller.home = async (req, res) => {
    res.render("kelola/index")
}



module.exports = controller;
