import express from 'express';
import usersControllers from '../Controller/UsersContoller.js';

const userRouter = express.Router();

// Create a new user
userRouter.post('/register', usersControllers.createUser);

//get all usets
userRouter.get('/', usersControllers.getAllUsers);

//get user by id
userRouter.get('/:id', usersControllers.findUserById)

//update user
userRouter.patch('/:id', usersControllers.updateUser)

//delete user
userRouter.delete('/:id', usersControllers.deleteUser)


export default userRouter;