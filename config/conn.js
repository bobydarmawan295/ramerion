const Sequelize = require('sequelize');

const db = new Sequelize('ramerion', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    db.authenticate();
    console.log('Koneksi berhasil');
  } catch (error) {
    console.error('Tidak dapat koneksi ke database:', error);
  }
module.exports = db;
