import express from 'express';
import { getReporteVentas } from '../controladores/reporteCtrl.js';
const router = express.Router();
router.get('/reportes/ventas', authorize([1]), getReporteVentas);
export default router;
