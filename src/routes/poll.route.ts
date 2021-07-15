import express from 'express';
const jwt = require('../middlewares/jwt');
import pollController from '../controllers/poll.controller';

var router = express.Router();
router.post('/create',jwt.validateToken,pollController.createPoll);
router.patch('/update',jwt.validateToken,pollController.updatePoll);
router.get("/getall",jwt.validateToken,pollController.getAll);
export default router;

