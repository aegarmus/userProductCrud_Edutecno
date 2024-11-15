import { Router } from "express";
import { crearNuevoProducto, obtenerProductoPorId, obtenerTodosLosProductos } from "../controllers/producto.controller.js";


const router = Router();

router.post('/producto', crearNuevoProducto);
router.get('/producto', obtenerTodosLosProductos);
router.get('/producto/:id', obtenerProductoPorId);

export default router;