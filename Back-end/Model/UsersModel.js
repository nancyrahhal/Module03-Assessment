import sequelize from "../databaseConfiguration/database.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", bcrypt.hashSync(value, 10));
    },
  },
  userType: {
    type: DataTypes.ENUM("user", "admin"),
    allowNull: false,
  },
});

User.sync();

export default User;
