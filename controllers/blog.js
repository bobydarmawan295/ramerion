const model = require('../models/indexModel');
const { Op, QueryTypes  } = require("sequelize");
const slugify = require('slugify')
const controller = {};



controller.getAllBlog = async (req, res) => {
    try {
      await model.blog
        .findAll({
          order: [ ['created_at', 'DESC']  ], 
        })
        .then((result) => {
          if (result.length > 0) {
            res.render("blog/allBlog", {items : result, blogActive: "active", forumActive: "", ecommerceActive:""});
          } else {
            res.status(404).json({
                message: "data tidak ada",
                data: [],
            });
          }
        });
    } catch (error) {
      res.render("eror500", {error});
    }
  };

controller.getBlogBySlug= async (req, res) => {
    try {
      await model.blog
        .findOne({
          include: [
            {
              model: model.komentar_blog,
              attributes: ["id", "blog_id","user_id","user","komentar", "created_at"],
              required: false,
              order: [
                ['id', 'ASC']
              ]
            }
          ],
          where: {
            slug: req.params.slug,
          },
        })

        .then((result) => {
          if (result) {
            res.render("blog/detailBlog", { items: result, blogActive: "active", forumActive: "", ecommerceActive:"" });
            // res.json(result)
          } else {
            res.status(404).json({
              message: "data tidak ada",
              data: [],
            });
          }
        });
    } catch (error) {
        res.render("eror500", {error});
    }
  };

controller.addBlog = async (req, res) => {
    try {
        const { user_id, kategori_blog,judul, summary, konten, user} = req.body;
        const slug = slugify(judul);
        const gambar = req.file.filename
        await model.blog.create({ user_id, user, kategori_blog, judul, gambar, slug, summary, konten,});
        res.status(200)
          .redirect("/blog");
      } catch (error) {
        res.json({ message: error.message });
      }
  };

controller.updateBlog = async (req, res) => {
    try {
      const { user_id,kategori_id, judul, konten} = req.body;
      await model.blog.update(
        { user_id, kategori_id, judul, summary, konten},
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
        attributes: ['id','blog_id','user_id','user','komentar'],
        // group: ['user_id']
        // raw: true,
      })
      .then((result) => {
        if (result.length > 0) {
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

    const { blog_id, user_id,komentar,user } = req.body;

    try {
        await model.komentar_blog.create({ blog_id, user_id, user, komentar});
       res.redirect('back');
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
        message: 'berhasil hapus komen',
      })
    } catch (error) {
      res.json({ message: error.message });
    }
  };

  controller.tampilTambahBlog= async (req, res) => {
    try {
      await model.kategori_blog
        .findAll()
        .then((result) => {
          if (result.length > 0) {
            res.render("blog/addBlog", {items: result,blogActive: "active", forumActive: "", ecommerceActive:"" });
            // console.log(result)
          } else {
            res.status(200).json({
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

module.exports = controller;

