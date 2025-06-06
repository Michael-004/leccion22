import express from 'express';
import multer from 'multer';
import { registrarProducto, registrarTalla } from '../controladores/prodcutosCtrl.js';
import { subirImagenes } from '../controladores/imagenCtrl.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/productos', registrarProducto);
router.post('/productos/:id/tallas', registrarTalla);
router.post('/productos/:id/imagenes', upload.array('imagenes', 10), subirImagenes);
export default router;
