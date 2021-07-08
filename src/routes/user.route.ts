import userController from "../controllers/user.controller";
import express from 'express';
const jwt = require('../middlewares/jwt');

var router = express.Router();
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/getuserdata',jwt.validateToken,userController.getUserData);

export default router;

