import { Producto } from "../models/Producto.model.js";

export const crearNuevoProducto = async(req, res) => {
    try {
        const data = req.body;
        const producto = await Producto.crear(data)

        res.status(201).json({
            message: 'Producto creado con éxito',
            status: 201,
            data: producto
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el producto',
            status: 500,
            error
        })
    }
}


export const obtenerTodosLosProductos = async(req, res) => {
    try {
        const data = await Producto.encontrarTodos();
        if (!data) throw new Error("No existen los datos");

        res.status(200).json({
            message: 'Productos Encontrados!',
            status: 200,
            data
        })
    } catch (error) {
        res.status(500).json({
            message: 'No pudimos encontrar los productos',
            status: 500,
            error
        })
    }
}


export const obtenerProductoPorId = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await Producto.encontrarPorId(id);

        if(!data) throw new Error('La data se encuentra vacía')

        res.status(200).json({
            message: 'Producto encontrado',
            status: 200,
            data
        })
    } catch (error) {
        res.status(500).json({
          message: "Error al obtener el producto",
          status: 500,
          error,
        });
    }
}


export const actualizarProducto = async(req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const actualizarProducto = await Producto.actualizar(id, data)

        res.status(201).json({
            message: 'Producto Actualizado',
            status: 201,
            oldData: actualizarProducto,
            newData: data
        })
    } catch (error) {
        res.status(500).json({
          message: "Error al actualizar el producto",
          status: 500,
          error,
        });
    }
}