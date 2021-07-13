import express from 'express';
import voteController from '../controllers/vote.controller';
const jwt = require('../middlewares/jwt');

var router = express.Router();
router.get('/:slag',jwt.validateToken,voteController.getPollData);
router.post('/:slag/cast',jwt.validateToken,voteController.castVote);


export default router;

