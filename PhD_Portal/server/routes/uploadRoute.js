import { Router } from 'express';
import { handleUpload } from '../controllers/uploadController.js';

const router = Router();

router.post('/', handleUpload);

export default router;
