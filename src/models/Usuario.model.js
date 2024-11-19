import { v4 as uuidv4 } from "uuid";
import { createDataFile, getActiveDatabyId, getAllActiveData, getAllData, getDataById, permaDeleteData, softDeleteData, updateData } from "../utils/fileUtils.js";


export class Usuario {
  #id;
  #name;
  #lastname;
  #email;
  #active;
  #rol;

  constructor(name, lastname, email, rol) {
    this.#id = uuidv4()
    this.#name = name; //Tenemos que validar esto
    this.#lastname = lastname;
    this.#email = email;
    this.#rol = rol;
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
    //validar name
    this.#name = newName
  }

  setLastname(newLastname) {
    //validar lastname
    this.#lastname = newLastname
  }

  setEmail(newEmail) {
    this.#email = newEmail
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
        console.error('Problemas al formatear la instancia de Usuario')
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
      throw new Error(`Fallo al crear un nuevo usuario, Error: ${error}`)
    }
  }

  static async encontrarTodos() {
    try {
      const usuarios = await getAllData('usuarios.json')
      return usuarios
    } catch (error) {
      throw new Error('Error al obtener los datos del usuario')
    }
  }

  static async encontrarPorId(id) {
    try {
      const usuario = await getDataById(id, 'usuarios.json')
      return usuario
    } catch (error) {
      throw new Error("Error al obtener los datos del usuario");
    }
  }

  static async actualizar(id, data) {
    try {
      const actualizarUsuario = await updateData(id, data, 'usuarios.json')
      return actualizarUsuario
    } catch (error) {
      throw new Error(`Fallo al actualizar el usuario, Error: ${error}`);
    }
  }

  static async borrarForEvaaa(id) {
    try {
      const usuarioBorrar = await permaDeleteData(id, 'usuarios.json');
      return usuarioBorrar
    } catch (error) {
      throw new Error(`Fallo al eliminar permanente el usuario, Error: ${error}`);
    }
  }

  static async delete(id) {
    try {
      await softDeleteData(id, 'usuarios.json', Usuario)
    } catch (error) {
      throw new Error(
        `Fallo al eliminar el usuario, Error: ${error}`
      );
    }
  }

  static async obtenerUsuariosActivos() {
    try {
      const usuarios = await getAllActiveData('usuarios.json');
      return usuarios
    } catch (error) {
      throw new Error("Error al obtener los datos del usuario");
    }
  }

  static async obtenerUsuarioActivoPorId(id) {
    try {
      const usuario = await getActiveDatabyId(id, 'usuarios.json');
      return usuario
    } catch (error) {
      throw new Error("Error al obtener los datos del usuario");
    }
  }
}


