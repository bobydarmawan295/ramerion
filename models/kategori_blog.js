const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");

const kategori_blog = sequelize.define('kategori_blog', {

    id : {
        type : DataTypes.BIGINT,
        allowNull : false,
        primaryKey : true,
        autoIncrement: true
    },
    nama: {
        type : DataTypes.STRING,
        allowNull : false
    },

},{
    tableName: 'kategori_blog',
    timestamps: false,
});

module.exports = kategori_blog;