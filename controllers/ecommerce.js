const model = require('../models/indexModel');
const { Op, QueryTypes  } = require("sequelize");
const sequelize = model.dbconfig;
const controller = {};

controller.getAllProduk = async (req, res) => {
    try {
      await model.produk.blog
        .findAll({
          attributes: ['id','user_id','id_kategori','konten','nama','gambar','deskripsi','rate','harga_before','harga_after'],
          group: ['id_kategori']
          // raw: true,
        })
        .then((result) => {
          if (result.length > 0) {
            res.render("blog/allProduk", { items: result ,dasbordaktif: "", rpsaktif: "active" });
            // res.status(200).json({
            //     message: 'mendapat data dosen',
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


controller.detailProduk = async function(req, res){

    try {
        await model.produk.blog
          .findAll({
            attributes: ['id','user_id','id_kategori','konten','nama','gambar','deskripsi','rate','harga_before','harga_after'],
            group: ['id_kategori']
            // raw: true,
          })
          .then((result) => {
            if (result.length > 0) {
              res.render("blog/allProduk", { items: result ,dasbordaktif: "", rpsaktif: "active" });
              // res.status(200).json({
              //     message: 'mendapat data dosen',
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

};

controller.getProdukById= async (req, res) => {
    try {
      await model.produk
        .findOne({
          attributes: ['id','user_id','id_kategori','konten','nama','gambar','deskripsi','rate','harga_before','harga_after'],
          where: {
            id: req.params.id,
          },
        })
        .then((result) => {
          if (result) {
            res.render("blog/editProduk", { items: result,dasbordaktif: "", rpsaktif: "active"  });
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
        const { user_id,id_kategori,konten,nama,gambar,deskripsi,rate,harga_before,harga_after} = req.body;
        await model.produk.create({
            user_id: user_id,
            id_kategori: id_kategori,
            konten: konten,
            nama: nama,
            gambar: gambar,
            deskripsi: deskripsi,
            rate: rate,
            harga_before: harga_before,
            harga_after: harga_after
        });
        //   res.redirect("/dosen/courses");
      } catch (error) {
        res.json({ message: error.message });
        // res.redirect("/dosen/add-course");
      }
  };

controller.updateProduk = async (req, res) => {
    try {
      const {  user_id,id_kategori,konten,nama,gambar,deskripsi,rate,harga_before,harga_after} = req.body;
      await model.produk.update(
        {
            user_id: user_id,
            id_kategori: id_kategori,
            konten: konten,
            nama: nama,
            gambar: gambar,
            deskripsi: deskripsi,
            rate: rate,
            harga_before: harga_before,
            harga_after: harga_after
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
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
    } catch (error) {
      res.json({ message: error.message });
    }
  };

controller.getAllCart = async function(req, res){
    try {
        await model.cart
          .findOne({
            attributes: ['id','user_id','produk_id','jumlah','status'],
            where: {
              id: req.params.id,
            },
          })
          .then((result) => {
            if (result) {
              res.render("blog/allCart", { items: result,dasbordaktif: "", rpsaktif: "active"  });
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
          const { id, user_id,} = req.body;
          await model.produk.create({
              user_id: user_id,
              id_kategori: id_kategori,
              konten: konten,
              nama: nama,
              gambar: gambar,
              deskripsi: deskripsi,
              rate: rate,
              harga_before: harga_before,
              harga_after: harga_after
          });
          //   res.redirect("/dosen/courses");
        } catch (error) {
          res.json({ message: error.message });
          // res.redirect("/dosen/add-course");
        }
}

controller.deleteCart = async function(req, res){
    try {
        await model.produk.destroy({
          where: {
            id: req.params.id,
          },
        });
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



