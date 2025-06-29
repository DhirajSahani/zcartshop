import express from 'express'
import { isAuth, login, logout, register } from '../controllers/UserController.js';
import authUser from '../middlewares/authUser.js';


const UserRoutes = express.Router();

UserRoutes.post('/register', register)
UserRoutes.post('/login', login)
UserRoutes.get('/is-auth',  authUser, isAuth)
UserRoutes.get('/logout', authUser , logout)






export default UserRoutes