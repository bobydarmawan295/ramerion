const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");
const users = require("./users");

const blog = sequelize.define('blog', {

    id : {
        type : DataTypes.BIGINT,
        allowNull : false,
        primaryKey : true,
        autoIncrement: true
    },
    user_id:
    {
        type : DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: users,
          key: 'id'
        }
    },
    judul : {
        type : DataTypes.STRING,
        allowNull : false
    },
    konten : {
        type : DataTypes.STRING,
        allowNull : false

    },
    created_at : {
        type : DataTypes.STRING,
        allowNull : false
    },

}, {
    tableName: 'blog',
    timestamps: true,
    // updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = blog;