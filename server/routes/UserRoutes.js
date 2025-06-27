import express from 'express'
import { login, register } from '../controllers/UserController.js';


const UserRoutes = express.Router();

UserRoutes.post('/register', register)

UserRoutes.post('/login', login)




export default UserRoutes