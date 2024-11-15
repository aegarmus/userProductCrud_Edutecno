import { Router } from 'express'
import { actualizarUsuario, crearNuevoUsuario, obtenerTodosLosUsuarios, obtenerUsuarioPorId } from '../controllers/usuario.controller.js'


const router = Router();

router.post('/usuario', crearNuevoUsuario);
router.get('/usuario', obtenerTodosLosUsuarios);
router.get('/usuario/:id', obtenerUsuarioPorId);
router.put('/usuario/:id', actualizarUsuario);


export default router;