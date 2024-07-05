import express from 'express';
import { changeDirectory, makeDirectory, listDirectories, printWorkingDirectory } from '../controllers/apiController';
import { login } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', login);
router.post('/cd', authenticateJWT, changeDirectory);
router.post('/mkdir', authenticateJWT, makeDirectory);
router.post('/ls', authenticateJWT, listDirectories);
router.get('/pwd', authenticateJWT, printWorkingDirectory);

export default router;
