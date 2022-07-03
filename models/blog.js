const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/conn");
const users = require("./users");
const komentar_blog = require("./komentar_blog");
const kategori_blog = require("./kategori_blog");

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
        allowNull: true,
        references: {
          model: users,
          key: 'id'
        }
    },
    kategori_id:
    {
        type : DataTypes.BIGINT,
        allowNull: false
        
    },
    judul : {
        type : DataTypes.STRING,
        allowNull : false
    }, 
    gambar : {
        type : DataTypes.BLOB,
        allowNull : true
    },
    summary: {
        type : DataTypes.TEXT,
        allowNull : false

    },
    konten : {
        type : DataTypes.TEXT,
        allowNull : false

    },
    created_at : {
        type : DataTypes.STRING,
        allowNull : true
    },

}, {
    tableName: 'blog',
    timestamps: false,
    // updatedAt: 'updated_at',
    // createdAt: 'created_at'
});

blog.hasMany(komentar_blog,{ foreignKey: "blog_id" });
komentar_blog.belongsTo(blog);

// blog.hasOne(kategori_blog,{ foreignKey: "kategori_id" });
// kategori_blog.belongsTo(blog);

module.exports = blog;