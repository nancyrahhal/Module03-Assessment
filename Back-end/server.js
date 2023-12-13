import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import articleRouter from "./Routes/ArticlesRoutes.js";
import userRouter from "./Routes/UsersRoutes.js";
import http from "http";
import bodyParser from "body-parser";

dotenv.config();


const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
// sequelize.sync({alter: true});   

app.use('/uploads', express.static('uploads'));


const server = http.createServer(app);


app.use('/articles', articleRouter );
app.use('/users', userRouter);


//app connection
server.listen(process.env.PORT, () => {
  console.log("app is running and listening on port 5000");
});
