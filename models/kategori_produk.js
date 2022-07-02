const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");

const kategori_produk = sequelize.define('kategori_produk', {

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
    tableName: 'kategori_produk',
    timestamps: true,
    // updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = kategori_produk;