import express from 'express';
import { login } from '../auth/authCtrl';
const router = express.Router();
router.post('/login', login);
export default router;