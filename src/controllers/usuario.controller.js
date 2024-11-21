import { NotFoundError } from "../error/typesError.js";
import { Usuario } from "../models/Usuario.model.js"

export const crearNuevoUsuario = async(req, res, next) => {
    try {
        const data = req.body
        const usuario = await Usuario.crear(data);
        
        res.status(201).json({
            message: 'Usuario Creado con éxito',
            status: 201,
            data: usuario
        })
    } catch (error) {
        next(error)
    }
}

export const obtenerTodosLosUsuarios = async(req, res) => {
    try {
        const data = await Usuario.encontrarTodos();

        if(!data) throw new NotFoundError('No existen los datos', `No se encontraron los datos solictadoes en la ruta correspondiente`)

        res.status(200).json({
            message: 'Usuarios Encontrados!',
            status: 200,
            data
        })
    } catch (error) {
        res.status(500).json({
          message: "Error al obtener los usuarios",
          status: 500,
          error,
        });
    }
}


export const obtenerUsuarioPorId = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await Usuario.encontrarPorId(id);

        if (!data) throw new NotFoundError("La data se encuentra vacía", `No encontramos el id: ${id}`);

        res.status(200).json({
            messsage: 'Usuario Encontrado',
            status: 200,
            data
        })
    } catch (error) {
         res.status(500).json({
           message: "Error al obtener el usuario",
           status: 500,
           error,
         });
    }
}

export const actualizarUsuario = async(req, res) => {
    try {
        const { id } = req.params
        const dataUsuario = req.body

        const actualizarUsuario = await Usuario.actualizar(id, dataUsuario)

        res.status(201).json({
            message: 'Usuario Actualizado',
            status: 201,
            oldData: actualizarUsuario,
            newData: dataUsuario
        })
    } catch (error) {
         res.status(500).json({
           message: "Error al actualizar el usuario",
           status: 500,
           error,
         });
    }
}


export const eliminarPermanenteUsuario = async(req, res) => {
    try {
        const { id } = req.params

        const usuarioBorrar = await Usuario.borrarForEvaaa(id)

        res.status(200).json({
            message: `Usuario con id ${id} Borrado con éxito`,
            status: 200,
            dataDeleted: usuarioBorrar
        })
    } catch (error) {
        res.status(500).json({
          message: "Error al Eliminar el usuario",
          status: 500,
          error,
        });
    }
}

export const borrarUsuario = async(req, res) => {
    try {
        const { id } = req.params
        await Usuario.delete(id);

         res.status(200).json({
            message: `Usuario con id ${id} Borrado con éxito`,
            status: 200,
        })

    }catch (error) {
        res.status(500).json({
          message: "Error al Eliminar el usuario",
          status: 500,
          error,
        });
    }
}

export const obtenerTodosLosUsuariosActivos = async(req, res) => {
    try {
        const usuarios = await Usuario.obtenerUsuariosActivos();

        res.status(200).json({
            message: "Usuarios obtenidos con éxito",
            status: 200,
            data: usuarios
        })
    } catch(error){
        res.status(500).json({
          message: "Error al obtener los usuarios",
          status: 500,
          error,
        });
    }
}

export const obtenerUsuarioActivoPorId = async(req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.obtenerUsuarioActivoPorId(id)

        res.status(200).json({
          message: "Usuarios obtenidos con éxito",
          status: 200,
          data: usuario,
        });
    } catch (error) {
        res.status(500).json({
          message: "Error al obtener los usuarios",
          status: 500,
          error,
        });
    }
}