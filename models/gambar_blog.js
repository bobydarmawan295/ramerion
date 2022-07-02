const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");

const gambar_blog = sequelize.define('gambar_blog', {

    id : {
        type : DataTypes.BIGINT,
        allowNull : false,
        primaryKey : true,
        autoIncrement: true
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
    tableName: 'gambar_blog',
    timestamps: true,
    // updatedAt: 'updated_at',
    createdAt: 'created_at'
});

module.exports = gambar_blog;