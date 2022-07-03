const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");
const users = require("./users");
const cart = sequelize.define('cart', {

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
    
    produk_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },

    jumlah : {
        type : DataTypes.BIGINT,
        allowNull : false
    },

    status : {
        type : DataTypes.STRING,
        allowNull : false
    },
    created_at : {
        type : DataTypes.DATE
    },

},{
    tableName: 'cart',
    timestamps: false,
    // updatedAt: 'updated_at',
    // createdAt: 'created_at'
});

module.exports = cart;