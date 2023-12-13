import { Sequelize } from "sequelize";


const sequelize = new Sequelize('articles_assessment', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
  });

  
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  export default sequelize;