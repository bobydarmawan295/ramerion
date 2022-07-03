const model = require('../models/indexModel');
const { Op, QueryTypes  } = require("sequelize");
// const sequelize = model.dbconfig;
const controller = {};

controller.getAllBlog = async (req, res) => {
    try {
      await model.blog
        .findAll({
          attributes: ['id','user_id','judul','summary', 'konten'],
          // group: ['user_id']
          // raw: true,
        })
        .then((result) => {
          if (result.length > 0) {
            // res.render("blog/allBlog", { items: result ,dasbordaktif: "", rpsaktif: "active" });
            res.status(200).json({
                message: 'mendapat data blog',
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

controller.getBlogById= async (req, res) => {
    try {
      await model.blog
        .findOne({
          attributes: ['id','user_id','judul','summary', 'konten'],
          where: {
            id: req.params.id,
          },
        })
        .then((result) => {
          if (result) {
            // res.render("blog/editBlog", { items: result,dasbordaktif: "", rpsaktif: "active"  });
            res.status(200).json({
              message: 'mendapat id blog',
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

controller.addBlog = async (req, res) => {
    try {
        const { user_id, kategori_id,judul,summary, konten } = req.body;
        await model.blog.create({
          user_id: user_id,
          kategori_id: kategori_id,
          judul: judul,
          summary: summary,
          konten: konten,
        });
        res.status(200).json({
          message: 'berhasil menambahkan blog',
        })
        //   res.redirect("/dosen/courses");
      } catch (error) {
        res.json({ message: error.message });
      }
  };

controller.updateBlog = async (req, res) => {
    try {
      const { user_id,kategori_id, judul, konten} = req.body;
      await model.blog.update(
        {
          user_id: user_id,
          kategori_id: kategori_id,
          judul: judul,
          summary: summary,
          konten: konten
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

controller.deleteBlog = async function(req, res){
  try {
      await model.blog.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: 'berhasil hapus blog',
      })
    } catch (error) {
      res.json({ message: error.message });
    }
}

controller.getAllComment = async (req, res) => {
  try {
    await model.komentar_blog
      .findAll({
        attributes: ['id','blog_id','user_id','komentar'],
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

  
controller.addBlogComment = async function(req, res){

    const { blog_id, user_id,komentar } = req.body;

    try {
        await model.komentar_blog.create({
            blog_id: blog_id,
            user_id: user_id,
            komentar: komentar
        });
        res.status(200).json({
          message: 'berhasil tambah komentar',
        })
    } catch (error) {
        console.log(error);
    }

}

controller.deleteBlogComment= async (req, res) => {
    try {
      await model.komentar_blog.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: 'berhasil hapus comment',
      })
    } catch (error) {
      res.json({ message: error.message });
    }
  };

  controller.deleteComment = async function(req, res){
    try {
        await model.model_komentar.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json({
          message: 'berhasil hapus comment',
        })
      } catch (error) {
        res.json({ message: error.message });
      }
  }


module.exports = controller;

