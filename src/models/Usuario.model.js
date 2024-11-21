import { v4 as uuidv4 } from "uuid";
import { createDataFile, getActiveDatabyId, getAllActiveData, getAllData, getDataById, permaDeleteData, softDeleteData, updateData } from "../utils/fileUtils.js";
import { Validate } from "../utils/Validaciones.js";

import { VALID_ROLES } from "../utils/constants/validRoles.js";
import { InternalServerError, ValidationError } from "../error/typesError.js";


export class Usuario {
  #id;
  #name;
  #lastname;
  #email;
  #active;
  #rol;

  constructor(name, lastname, email, rol) {
    this.#id = uuidv4()
    this.#name = Validate.userName(name, 'Nombre'); 
    this.#lastname = Validate.userName(lastname, 'Apellido');
    this.#email = Validate.email(email);
    this.#rol = Validate.rol(rol, VALID_ROLES);
    this.#active = true;
  }

  get id() {
    return this.#id
  }

  get nameComplete() {
    return `${this.#name} ${this.#lastname}`
  }

  get name() {
    return this.#name
  }

  get lastname() {
    return this.#lastname
  }

  get email() {
    return this.#email
  }

  get rol() {
    return this.#rol
  }

  get active() {
    return this.#active
  }

  setId(newId) {
    this.#id = newId
  }

  setName(newName) {
    try {
      Validate.userName(newName, 'Nombre');
      this.#name = newName
      
    } catch (error) {
      throw new ValidationError('Error al modificar el campo nombre',error)
    }
  }

  setLastname(newLastname) {
    try {
      Validate.userName(newLastname, 'Apellido');
      this.#lastname = newLastname
      
    } catch (error) {
      throw new ValidationError('Error al modificar el campo apellido',error);
    }
  }

  setEmail(newEmail) {
    try {
      Validate.email(email)
      this.#email = newEmail
      
    } catch (error) {
      throw new ValidationError('Error al modificar el campo email',error);
    }
  }

  setRol(newRol) {
    try {
      Validate.rol(newRol, VALID_ROLES)
      this.#rol = newRol
    } catch (error) {
      throw new ValidationError('Error al modificar el campo rol',error);
    }
  }

/*   setActive() {
    this.#active = !this.#active
  } */

  desactive() {
    console.log(this.#active)
    this.#active = false
  }

  active() {
    this.#active = true
  }

  getAllProperties() {
    return {
        id: this.#id,
        name: this.#name,
        lastname: this.#lastname,
        email: this.#email,
        rol: this.#rol,
        active: this.#active
    }
  }

  static formatearInstancea(objeto) {
    try {
        const { id, name, lastname, email, rol } = objeto;
        const nuevaInstancia = new Usuario(name, lastname, email, rol);
        nuevaInstancia.setId(id)

        return nuevaInstancia
    } catch (error) {
        throw new InternalServerError('Problemas al formatear la instancia de Usuario', error)
    }
  }

  static async crear(data) {
    try {
      const { name, lastname, email, rol } = data
      const usuario = new Usuario(name, lastname, email, rol)
      const usuarioObject = usuario.getAllProperties()
  
      await createDataFile(usuarioObject, 'usuarios.json')
  
      return usuarioObject
    } catch (error) {
      throw new InternalServerError(`Fallo al crear un nuevo usuario`, error)
    }
  }

  static async encontrarTodos() {
    try {
      const usuarios = await getAllData('usuarios.json')
      return usuarios
    } catch (error) {
      throw new InternalServerError('Error al obtener los datos del usuario', error)
    }
  }

  static async encontrarPorId(id) {
    try {
      const usuario = await getDataById(id, 'usuarios.json')
      return usuario
    } catch (error) {
      throw new InternalServerError("Error al obtener los datos del usuario", error);
    }
  }

  static async actualizar(id, data) {
    try {
      const actualizarUsuario = await updateData(id, data, 'usuarios.json')
      return actualizarUsuario
    } catch (error) {
      throw new InternalServerError(`Fallo al actualizar el usuario`, error);
    }
  }

  static async borrarForEvaaa(id) {
    try {
      const usuarioBorrar = await permaDeleteData(id, 'usuarios.json');
      return usuarioBorrar
    } catch (error) {
      throw new InternalServerError(`Fallo al eliminar permanente el usuario`, error);
    }
  }

  static async delete(id) {
    try {
      await softDeleteData(id, 'usuarios.json', Usuario)
    } catch (error) {
      throw new InternalServerError(`Fallo al eliminar el usuario`, error);
    }
  }

  static async obtenerUsuariosActivos() {
    try {
      const usuarios = await getAllActiveData('usuarios.json');
      return usuarios
    } catch (error) {
      throw new InternalServerError("Error al obtener los datos del usuario", error);
    }
  }

  static async obtenerUsuarioActivoPorId(id) {
    try {
      const usuario = await getActiveDatabyId(id, 'usuarios.json');
      return usuario
    } catch (error) {
      throw new InternalServerError("Error al obtener los datos del usuario", error);
    }
  }
}


