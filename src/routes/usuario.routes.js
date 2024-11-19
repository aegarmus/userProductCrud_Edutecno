import { Router } from 'express'
import { 
    actualizarUsuario, 
    borrarUsuario, 
    crearNuevoUsuario, 
    eliminarPermanenteUsuario, 
    obtenerTodosLosUsuarios, 
    obtenerTodosLosUsuariosActivos, 
    obtenerUsuarioActivoPorId, 
    obtenerUsuarioPorId 
} from '../controllers/usuario.controller.js'


const router = Router();

router.post('/usuario', crearNuevoUsuario);
router.get('/usuario/admin/all', obtenerTodosLosUsuarios); //Administrador solamente
router.get('/usuario/admin/:id', obtenerUsuarioPorId); //Administrador Solamente
router.put('/usuario/:id', actualizarUsuario);
router.put("/usuario/delete/:id", borrarUsuario);
router.delete("/usuario/:id", eliminarPermanenteUsuario);
router.get('/usuario', obtenerTodosLosUsuariosActivos);
router.get("/usuario/:id", obtenerUsuarioActivoPorId);


export default router;