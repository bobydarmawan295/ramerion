const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");
const users = require("./users");
const forum = sequelize.define('forum', {

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

    judul : {
        type : DataTypes.STRING
    },

    konten : {
        type : DataTypes.TEXT
    },

    created_at : {
        type : DataTypes.DATE
    },

},{
    tableName: 'forum',
    timestamps: true,
    // updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = forum;