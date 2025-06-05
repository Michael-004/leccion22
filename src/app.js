import express from 'express'
import cors from 'cors';
//para subir imagenes
import path from 'path';
import { fileURLToPath } from 'url';

//importar las rutas   ojo
import clientesRoutes from './routes/clientes.routes.js'
import accesoRoutes from './routes/acceso.routes.js'
import imagenRoutes from './routes/prodcutos.routes.js'
import authRoutes from './routes/auth.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js'
import prodcutosRoutes from './routes/prodcutos.routes.js'
import reporteRoutes from './routes/reporte.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'


//definir los módulos de entrada
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
//definir los permisos
const corsOptions={
    origin:'*',//la dirección del dominio del servidor
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}

const app=express();
app.use(cors(corsOptions));
app.use(express.json());//interpreta objetos json
app.use(express.urlencoded({extended:true}))//se añade para poder receptar formularios
app.use('/uploads',express.static(path.join(__dirname,'../uploads')));



// indicar que rutas se utiliza  ojo
app.use('/api',clientesRoutes)
app.use('/api', accesoRoutes )
app.use('/api', authRoutes)
app.use('/api', usuariosRoutes)
app.use('/api', prodcutosRoutes)
app.use('/api', reporteRoutes)
app.use('/api', pedidosRoutes)
app.use('/api', imagenRoutes)


app.use((req,resp,next)=>{
    resp.status(400).json({
        message:' Endponit not fount'
    })
})
export default app;
