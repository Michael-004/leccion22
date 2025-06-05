import express from 'express';
import { registrarUsuarios } from '../controladores/usuariosCtrl.js';
const router = express.Router();
router.post('/usuarios', registrarUsuarios);
export default router;