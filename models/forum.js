const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");
const komentar_forum = require("./komentar_forum");
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
        type : DataTypes.STRING,
        allowNull: false,
    },

    konten : {
        type : DataTypes.TEXT
    },

    created_at : {
        type : DataTypes.DATE
    },

},{
    tableName: 'forum',
    timestamps: false,
    // updatedAt: 'updated_at',
    // createdAt: 'created_at'
});

forum.hasMany(komentar_forum,{ foreignKey: "forum_id" });
komentar_forum.belongsTo(forum);

module.exports = forum;