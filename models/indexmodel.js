const indexmodel = {};

indexmodel.blog = require('./blog.js')
indexmodel.cart = require('./cart.js')
indexmodel.forum = require('./forum.js')
indexmodel.gambar_blog = require('./gambar_blog.js')
indexmodel.gambar_produk = require('./gambar_produk.js')
indexmodel.kategori_produk = require('./kategori_produk.js')
indexmodel.kategori_blog = require('./kategori_blog.js')
indexmodel.komentar_blog = require('./komentar_blog.js')
indexmodel.komentar_forum = require('./komentar_forum.js')
indexmodel.produk = require('./produk.js')
indexmodel.users = require('./users.js')

module.exports = indexmodel;