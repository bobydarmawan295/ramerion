const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");

const komentar_forum = sequelize.define('komentar_forum', {

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
    forum_id:
    {
        type : DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: blog,
          key: 'id'
        }
    },
    komentar : {
        type : DataTypes.TEXT
    },
    created_at : {
        type : DataTypes.DATE
    },


},{
    tableName: 'komentar_forum',
    timestamps: true,
    // updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = komentar_forum;