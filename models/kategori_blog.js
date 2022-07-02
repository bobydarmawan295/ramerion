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
    created_at : {
        type : DataTypes.DATE
       
    },
  


},{
    tableName: 'kategori_blog',
    timestamps: true,
    // updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = kategori_blog;