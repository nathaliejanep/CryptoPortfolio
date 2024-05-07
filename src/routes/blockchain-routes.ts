import express from 'express';
import {
  addBlock,
  getBlockchain,
  synchronizeChain,
} from '../controllers/blockchain-controller.js';

const router = express.Router();

router.route('/').get(getBlockchain);
router.route('/mine').post(addBlock);
router.route('/concensus').get(synchronizeChain);

export default router;
