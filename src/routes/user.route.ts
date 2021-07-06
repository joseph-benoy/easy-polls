import userController from "../controllers/user.controller";
import express from 'express';

var router = express.Router();
router.post('/register',userController.register);
router.post('/login',userController.login);


export default router;

