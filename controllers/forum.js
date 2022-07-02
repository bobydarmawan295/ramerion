const model = require('../models/indexmodel');
const { Op, QueryTypes  } = require("sequelize");
const sequelize = model.dbconfig;
const controller = {};


controller.getAllForum = async (req, res) => {
    try {
      await model.forum.blog
        .findAll({
          attributes: ['id','user_id','judul','konten'],
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

controller.detailForum = async function(req, res){

    try {
        await model.forum.blog
          .findAll({
            attributes: ['id','user_id','judul','konten'],
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

controller.getForumById= async (req, res) => {
    try {
      await model.forum
        .findOne({
          attributes: ['id','user_id','judul','konten'],
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

  controller.addForum = async (req, res) => {
    try {
        const { user_id,judul,konten} = req.body;
        await model.forum.create({
            user_id: user_id,
            judul: judul,
            konten: konten,
        });
        //   res.redirect("/dosen/courses");
      } catch (error) {
        res.json({ message: error.message });
        // res.redirect("/dosen/add-course");
      }
  };

controller.updateForum = async (req, res) => {
    try {
      const { user_id,judul,konten} = req.body;
      await model.forum.update(
        {
            user_id: user_id,
            judul: judul,
            konten: konten,
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
  
controller.deleteForum= async (req, res) => {
    try {
      await model.forum.destroy({
        where: {
          id: req.params.id,
        },
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };


  controller.tambahKomentarForum = async function(req, res){

    const { user_id,judul,konten} = req.body;

    try {
        await model.komentar_forum.create({
            user_id: user_id,
            judul: judul,
            konten: konten,
        });
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }

}

controller.deleteKomentarBlog = async (req, res) => {
    try {
      await model.komentar_forum.destroy({
        where: {
          id: req.params.id,
        },
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  
module.exports = controller;