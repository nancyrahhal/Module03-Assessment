import User from "../Model/UsersModel.js";
import validator from "validator";
import bcrypt from 'bcrypt';
import { Op, fn, col } from "sequelize";



class usersControllers {

//create a new user
    static async createUser(req, res) {
        try {
            console.log(req.body);

          const {password, username, userType } = req.body;
          const errors = [];
         
          if (!password) {
            errors.push("Password is required");
          } else if (!validator.isStrongPassword(password)) {
            errors.push("Password not strong enough");
          }
    
          if (!username) {
            errors.push("Username is required");
          }
    
          if (!userType) {
            errors.push("User type is required");
          }
    
          if (errors.length > 0) {
              return res.status(400).json({ errors });
            }
      
          try {
            // Check if username or email already exists
            const existingUser = await User.findOne({
              where: {
                [Op.or]: [{ username: username }],
              },
            });
    
            if (existingUser) {
              errors.push("Username already exists");
              return res.status(400).json({errors});
            }
            
    
            const newUser = await User.create({
              password,
              username,
              userType
            });
    
            if (!newUser) {
              errors.push("Error creating user");
              return  res.status(500).json({ errors });
            }
    
            return res.status(201).json({ newUser});
          } catch (sequelizeError) {
            return res.status(500).json({ message: sequelizeError.message });
          }
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      }

    //get all users
    static async getAllUsers(req, res) {
        try {
          const users = await User.findAll();
          if (users.length === 0) {
            return res.status(404).json("there are no available users");
          }
          return res.status(200).json(users);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      }

      //update a use by id
  static async updateUser(req, res) {
    try {
      const [updatedUser] = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!updatedUser) {
       return res.status(404).json('please enter the fields you want to edit');
      }
      const user= await User.findByPk(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  }

  //delete a user
  static async deleteUser(req, res) {
    try {
      const deleteduser = await User.findByPk(req.params.id)
      if (!deleteduser) {
      return res.status(404).json('the user was not found');
      }

      await User.destroy({
        where:{
          id:req.params.id,
        },
      })
      return res.status(200).json({ deleteduser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //find user by id
  static async findUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json('user not found');
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default usersControllers;