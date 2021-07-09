import express from 'express';
import voteController from '../controllers/vote.controller';

var router = express.Router();
router.get('/:slag',voteController.getPollData);


export default router;

