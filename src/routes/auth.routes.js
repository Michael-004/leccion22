import express from 'express';
import { login } from '../auth/authCtrl.js';
const router = express.Router();
router.post('/login', login);
export default router;
