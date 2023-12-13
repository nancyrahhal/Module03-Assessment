import Article from "../Model/ArticlesModel.js";
import sequelize from "../databaseConfiguration/database.js";
import fs from 'fs';
import path from 'path';

class articlesControllers {
    //create an article
 
  static async createArticle(req, res) {
    try {
        const image=req.file.filename;
        
      const newArticle = await Article.create({...req.body, image: image});
      if (!newArticle) {
        return res.status(500).json({ error: "Error creating an Article" });
      }
      return res.status(200).json(newArticle);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //get all articles
  static async getArticles(req, res) {
    try {
      const articles = await Article.findAll();
      if (articles.length === 0) {
        return res.status(404).json("there are no available artciles");
      }
      return res.status(200).json(articles);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //get articles by id
  static async findArticleById(req, res) {
    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(404).json('artcile not found');
      }
      return res.status(200).json(article);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //delete an article
  static async deleteArticle(req, res) {
    try {
      const deletedarticle = await Article.findByPk(req.params.id);
      if (!deletedarticle) {
      return res.status(404).json('the article was not found');
      }

      const imageToDelete= deletedarticle.image

      await Article.destroy({
        where:{
          id:req.params.id,
        },
      });

      if (imageToDelete) {
        const imagePath = path.join('./uploads', imageToDelete);
        fs.unlinkSync(imagePath);
      }

      return res.status(200).json({ deletedarticle });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //update an article
  static async updateArticle(req,res){
    try{
        const oldArticle= await Article.findByPk(req.params.id);
        const oldImage=oldArticle.image;

        const newData = { ...req.body };

        if (req?.file?.filename) {
            newData.image = req?.file?.filename;
          }

          const [updatedArticle] = await Article.update(newData, {
            where: {
              id: req.params.id,
            },
          });
        if(!updatedArticle){
            return res.status(404).json('enter all fields')
        }

        if (oldImage) {
            const oldImagePath = path.join("/uploads", "uploads", oldImage);
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            } else {
              console.error("File not found:", oldImagePath);
            }
          }

          const newArticle = await Article.findByPk(req.params.id);
          return res.status(200).json(newArticle);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
        
    }
  }


export default articlesControllers
