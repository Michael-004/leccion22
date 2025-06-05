import express from 'express';
import { crearPedido, obtenerPendientes, despacharPedido } from '../controladores/pedidos.ctrl.js';
const router = express.Router();
router.post('/pedidos', crearPedido);
router.get('/pedidos', obtenerPendientes);
router.put('/pedidos/:id', despacharPedido);
export default router;