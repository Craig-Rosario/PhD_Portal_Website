import express from 'express';
import registerRoute from './registerRoute.js';
import uploadRoute from './uploadRoute.js';

const router = express.Router();

router.use('/register', registerRoute);
router.use('/upload', uploadRoute);

export default router;
