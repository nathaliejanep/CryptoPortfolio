import express from 'express';
import { getCrypto } from '../controllers/crypto-controller.js';

const router = express.Router();

router.route('/:crypto').get(getCrypto);

export default router;
