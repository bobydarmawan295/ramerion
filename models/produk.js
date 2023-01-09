const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");
const users = require("./users");
const kategori_produk = require("./kategori_produk");

const produk = sequelize.define('produk', {

    id : {
        type : DataTypes.BIGINT,
        allowNull : false,
        primaryKey : true,
        autoIncrement: true
    },

    user_id : {
        type : DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: users,
          key: 'id'
        }
    },

    id_kategori : {
        type : DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: kategori_produk,
          key: 'id'
        }
    },
    nama : {
        type : DataTypes.STRING,
        allowNull : false
    },
    gambar : {
        type : DataTypes.BLOB,
        allowNull : true
    },

    deskripsi : {
        type : DataTypes.TEXT,
        allowNull : false
    },

    rate : {
        type : DataTypes.STRING,
        allowNull : false
    },
<<<<<<< HEAD
    harga: {
=======
    harga : {
>>>>>>> de866534c4ad89fc2715bc9b4d616f6a95ba01d8
        type : DataTypes.INTEGER,
        allowNull : false
    },
    created_at : {
        type : DataTypes.DATE
    },
    updated_at : {
        type : DataTypes.DATE
    },

},{
    tableName: 'produk',
    timestamps: false,
    // updatedAt: 'updated_at',
    // createdAt: 'created_at'
});

module.exports = produk;