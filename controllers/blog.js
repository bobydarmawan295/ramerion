const model = require('../models/indexModel');
const { Op, QueryTypes  } = require("sequelize");
// const sequelize = model.dbconfig;
const controller = {};

controller.getAllBlog = async (req, res) => {
    try {
      await model.blog
        .findAll({
          attributes: ['id','user_id','judul','konten'],
          group: ['user_id']
          // raw: true,
        })
        .then((result) => {
          if (result.length > 0) {
            res.render("blog/allBlog", { items: result ,dasbordaktif: "", rpsaktif: "active" });
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

controller.getBlogById= async (req, res) => {
    try {
      await model.blog
        .findOne({
          attributes: ["id", "user_id", "judul", "konten"],
          where: {
            id: req.params.id,
          },
        })
        .then((result) => {
          if (result) {
            res.render("blog/editBlog", { items: result,dasbordaktif: "", rpsaktif: "active"  });
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

controller.addBlog = async (req, res) => {
    try {
        const { user_id, judul, konten } = req.body;
        await model.blog.create({
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

controller.updateBlog = async (req, res) => {
    try {
      const { user_id, judul, konten} = req.body;
      await model.blog.update(
        {
          user_id: user_id,
          judul: judul,
          konten: konten
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
  
controller.tambahKomentarBlog = async function(req, res){

    const { id_rps,  id_dosen } = req.body;

    try {
        await model.komentar_blog.create({
            course_plan_id: id_rps,
            lecturer_id: id_dosen,
            creator: 0
        });
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }

}

controller.deleteKomentarBlog = async (req, res) => {
    try {
      await model.komentar_blog.destroy({
        where: {
          id: req.params.id,
        },
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };


module.exports = controller;

