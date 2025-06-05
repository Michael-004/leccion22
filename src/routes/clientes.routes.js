import{Router} from'express'
import{getClientes} from '../controladores/clientesCtrl.js'
const router=Router();
//armar las rutas  "URL"
router.get('/clientes',getClientes)
router.get('/clientes/:id',getClientexid);
router.post('/clientes', postCliente);

export default router