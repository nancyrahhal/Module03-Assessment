import express from "express";
import articlesControllers from "../Controller/ArticlesController.js";
import upload from "../MiddleWares/multer.js";


const articleRouter = express.Router();

// Create a new article
articleRouter.post('/create',upload.single('image'), articlesControllers.createArticle);

//get all larticles
articleRouter.get('/', articlesControllers.getArticles);

//get article by id
articleRouter.get('/:id', articlesControllers.findArticleById);

//update article
articleRouter.patch('/:id',upload.single('image'), articlesControllers.updateArticle);

//delete article
articleRouter.delete('/:id', articlesControllers.deleteArticle);




export default articleRouter;