import express from 'express';
import voteController from '../controllers/vote.controller';

var router = express.Router();
router.post('/:slag',voteController.getPollData);


export default router;

