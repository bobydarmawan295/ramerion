const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");
const blog = require("./blog");

const users = sequelize.define('users', {

    id : {
        type : DataTypes.BIGINT,
        allowNull : false,
        primaryKey : true,
        autoIncrement: true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    username : {
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
        type : DataTypes.STRING,
        allowNull : true,
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

// users.hasOne(blog,{ foreignKey: "users_id" });


module.exports = users;