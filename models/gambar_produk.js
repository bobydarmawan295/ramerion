const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");

const gambar_produk = sequelize.define('gambar_produk', {

    id : {
        type : DataTypes.BIGINT,
        allowNull : false,
        primaryKey : true,
        autoIncrement: true
    },
    id_produk:
    {
        type : DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: produk,
          key: 'id'
        }
    },
    gambar: {
        type : DataTypes.BLOB,
        allowNull : false
    },
    keterangan : {
        type : DataTypes.TEXT,
        allowNull : false

    },
    created_at : {
        type : DataTypes.DATE
    },


},{
    tableName: 'gambar_produk',
    timestamps: true,
    // updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = gambar_produk;