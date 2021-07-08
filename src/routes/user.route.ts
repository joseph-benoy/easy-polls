import userController from "../controllers/user.controller";
import express from 'express';
const jwt = require('../middlewares/jwt');

var router = express.Router();
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/getuserdata',jwt.validateToken,userController.getUserData);
router.patch('/updategeneral',jwt.validateToken,userController.updateGeneral);
router.patch('/updatepassword',jwt.validateToken,userController.updatePassword);
export default router;

