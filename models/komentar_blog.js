const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");
const blog = require("./blog");
const users = require("./users");

const komentar_blog = sequelize.define('komentar_blog', {

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
    blog_id:
    {
        type : DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: blog,
          key: 'id'
        }
    },
    userNama:
    {
        type : DataTypes.STRING,
        allowNull: false
    },
    komentar : {
        type : DataTypes.TEXT
    },
    created_at : {
        type : DataTypes.DATE
    },

},{
    tableName: 'komentar_blog',
    timestamps: false,
    // updatedAt: 'updated_at',
    // createdAt: 'created_at'
});

module.exports = komentar_blog;