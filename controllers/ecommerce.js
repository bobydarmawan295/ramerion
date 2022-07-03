const model = require('../models/indexModel');
const { Op, QueryTypes  } = require("sequelize");
const sequelize = model.dbconfig;
const controller = {};

controller.getAllProduk = async (req, res) => {
    try {
      await model.produk
        .findAll({
          attributes: ['id','user_id','id_kategori','nama','gambar','deskripsi','rate','hargabefore','hargaafter'],
          // group: ['id_kategori']
          // raw: true,
        })
        .then((result) => {
          if (result.length > 0) {
            res.render("e-commerce/allProduk", { items: result ,blogActive: "", forumActive: "", ecommerceActive:"active" });
            // res.status(200).json({
            //     message: 'mendapat data produk',
            //     data: result
            // })
          } else {
            res.status(404).json({
                message: "data tidak ada",
                data: [],
            });
          }
        });
    } catch (error) {
      res.status(404).json({
        message: error,
      });
    }
}



controller.getProdukById= async (req, res) => {
    try {
      await model.produk
        .findOne({
          attributes: ['id','user_id','id_kategori','nama','gambar','deskripsi','rate','hargabefore','hargaafter'],
          where: {
            id: req.params.id,
          },
        })
        .then((result) => {
          if (result) {
            // res.render("blog/editProduk", { items: result,dasbordaktif: "", rpsaktif: "active"  });
            res.status(200).json({
              message: 'mendapat id produk',
              data: result
          })
          } else {
            res.status(404).json({
              message: "data tidak ada",
              data: [],
            });
          }
        });
    } catch (error) {
      res.status(404).json({
        message: error,
      });
    }
  };

controller.addProduk = async (req, res) => {
    try {
        const { user_id,id_kategori,konten,nama,gambar,deskripsi,rate,hargabefore,hargaafter} = req.body;
        await model.produk.create({
            user_id: user_id,
            id_kategori: id_kategori,
            nama: nama,
            deskripsi: deskripsi,
            rate: rate,
            hargabefore: hargabefore,
            hargaafter: hargaafter
        });
        res.status(200).json({
          message: 'berhasil menambah produk',
      })
        //   res.redirect("/dosen/courses");
      } catch (error) {
        res.json({ message: error.message });
        // res.redirect("/dosen/add-course");
      }
  };

controller.updateProduk = async (req, res) => {
    try {
      const {  user_id,id_kategori,konten,nama,gambar,deskripsi,rate,hargabefore,hargaafter} = req.body;
      await model.produk.update(
        {
          user_id: user_id,
          id_kategori: id_kategori,
          nama: nama,
          deskripsi: deskripsi,
          rate: rate,
          hargabefore: hargabefore,
          hargaafter: hargaafter
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        message: 'berhasil edit data',

    })
    } catch (error) {
      res.json({ message: error.message });
      // res.redirect("/dosen/add-course");
    }
  };
  
controller.deleteProduk = async (req, res) => {
    try {
      await model.produk.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: 'berhasil hapus data',

    })
    } catch (error) {
      res.json({ message: error.message });
    }
  };

controller.getAllCart = async function(req, res){
    try {
        await model.cart
          .findAll({
            attributes: ['id','user_id','produk_id','jumlah','status'],
          })
          .then((result) => {
            if (result) {
              // res.render("blog/allCart", { items: result,dasbordaktif: "", rpsaktif: "active"  });
              res.status(200).json({
                message: 'mendapat cart',
                data: result
            })
            } else {
              res.status(404).json({
                message: "data tidak ada",
                data: [],
              });
            }
          });
      } catch (error) {
        res.status(404).json({
          message: error,
        });
      }
    };
  
  controller.addCart = async (req, res) => {
      try {
          const { user_id,produk_id, jumlah, status} = req.body;
          await model.cart.create({
              user_id: user_id,
              produk_id: produk_id,
              jumlah: jumlah,
              status: status
          });
          res.status(200).json({
            message: 'berhasil menambah cart',
        })
          //   res.redirect("/dosen/courses");
        } catch (error) {
          res.json({ message: error.message });
          // res.redirect("/dosen/add-course");
        }
}

controller.deleteCart = async function(req, res){
    try {
        await model.cart.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json({
          message: 'berhasil hapus id',
      })
      } catch (error) {
        res.json({ message: error.message });
      }
}

controller.checkout= async function(req, res){      //checkout

    // try {
    //     const { id, user_id,} = req.body;
    //     await model.produk.create({
    //         user_id: user_id,
    //         id_kategori: id_kategori,
    //         konten: konten,
    //         nama: nama,
    //         gambar: gambar,
    //         deskripsi: deskripsi,
    //         rate: rate,
    //         harga_before: harga_before,
    //         harga_after: harga_after
    //     });
    //     //   res.redirect("/dosen/courses");
    //   } catch (error) {
    //     res.json({ message: error.message });
    //     // res.redirect("/dosen/add-course");
    // }

}


// controller.tampilProduk= async function(req, res){
//     const ekomers = await model.produk.findAll({
//         attributes: ['id', 'name']
//     });
//     res.render("rpsadmin", { kurikulum ,dasbordaktif: "", rpsaktif: "active" });
// }


module.exports = controller;

