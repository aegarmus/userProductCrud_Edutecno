import { Router } from "express";
import { actualizarProducto, crearNuevoProducto, obtenerProductoPorId, obtenerTodosLosProductos } from "../controllers/producto.controller.js";


const router = Router();

router.post('/producto', crearNuevoProducto);
router.get('/producto', obtenerTodosLosProductos);
router.get('/producto/:id', obtenerProductoPorId);
router.put('/producto/:id', actualizarProducto);

export default router;