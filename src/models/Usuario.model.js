import { v4 as uuidv4 } from "uuid";
import { createDataFile, getAllData, getDataById, updateData } from "../utils/fileUtils.js";


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

  setActive() {
    this.#active = !this.#active
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
}


