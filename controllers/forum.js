const model = require('../models/indexmodel');
const { Op, QueryTypes  } = require("sequelize");
const sequelize = model.dbconfig;
const controller = {};


controller.getAllForum = async (req, res) => {
    try {
      await model.forum
        .findAll({
          attributes: ['id','user_id','judul','konten'],
         
        })
        .then((result) => {
          if (result.length > 0) {
            res.render("forum/allForum", { items: result, blogActive: "", forumActive: "active", ecommerceActive:"" });
            // res.status(200).json({
            //     message: 'mendapat data forum',
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


controller.getForumById= async (req, res) => {
    try {
      await model.forum
        .findOne({
          attributes: ['id','user_id','judul','konten'],
          include: [
            {
              model: model.komentar_forum,
              attributes: ["id", "forum_id","user_id","komentar"],
              required: true,
            },
            
          // group: ['id_kategori']
          // raw: true,
          ],
          where: {
            id: req.params.id,
          },
        })
        .then((result) => {
          if (result) {
            res.render("blog/editProduk", { items: result,blogActive: "", forumActive: "active", ecommerceActive:""  });
          //   res.status(200).json({
          //     message: 'mendapat data forum',
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

  controller.addForum = async (req, res) => {
    try {
        const { user_id,judul,konten} = req.body;
        await model.forum.create({
            user_id: 2,
            judul: judul,
            konten: konten,
        });
          res.redirect("/forum");
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
      res.status(200).json({
        message: 'berhasil edit blog',
      })
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
      res.status(200).json({
        message: 'berhasil happus data',
      })
    } catch (error) {
      res.json({ message: error.message });
    }
  };

  controller.getAllComment = async (req, res) => {
    try {
      await model.komentar_forum
        .findAll({
          attributes: ['id','forum_id','user_id','komentar'],
          // group: ['user_id']
          // raw: true,
        })
        .then((result) => {
          if (result.length > 0) {
            // res.render("blog/allBlog", { items: result ,dasbordaktif: "", rpsaktif: "active" });
            res.status(200).json({
                message: 'mendapat data komentar',
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


  controller.addForumComment = async function(req, res){

    const { user_id,forum_id,komentar} = req.body;

    try {
        await model.komentar_forum.create({
          forum_id: forum_id,
          user_id: user_id,
          komentar: komentar
        });
        res.status(200).json({
          message: 'berhasil menambah data komentar',
        })
        // res.redirect('back');
    } catch (error) {
        console.log(error);
    }

}

controller.deleteForumComment = async (req, res) => {
    try {
      await model.komentar_forum.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: 'berhasil hapus data komentar',
      })
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  
module.exports = controller;