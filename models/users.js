const { Sequelize, DataTypes } = require('sequelize');
const db = require(".,/config/conn.js");


const users = db.define('users', {

    id : {
        type : DataTypes.BIGINT,
        allowNull : false,
        primaryKey : true,
        autoIncrement: true
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    name: {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    remember_token : {
        type : DataTypes.STRING
    },
    role : {
        type : DataTypes.ENUM('A','M'),
        allowNull : false,
    },
    created_at : {
        type : DataTypes.DATE
       
    },
    updated_at : {
        type : DataTypes.DATE
        
    }

}, {
    tableName: 'users',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'

});

module.exports = users;