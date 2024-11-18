import { v4 as uuidv4 } from 'uuid';
import { 
    createDataFile, 
    getAllData, 
    getDataById, 
    permaDeleteData, 
    updateData 
} from '../utils/fileUtils.js';

export class Producto {
    #id
    #name
    #description
    #price
    #stock
    #visible

    constructor(name, description, price, stock) {
        this.#id = uuidv4()
        this.#name = name;
        this.#description = description;
        this.#price = price;
        this.#stock = stock;
        this.#visible = stock > 0
    }

    get id() {
        return this.#id
    }

    get name() {
        return this.#name
    }
    
    get description() {
        return this.#description
    }

    get price() {
        return this.#price
    }

    get stock() {
        return this.#stock
    }

    setName(newName) {
        //validar
        this.#name = newName
    }

    setDescription(newDescription) {
        //validar
        this.#description = newDescription
    }

    setPrice(newPrice) {
        //validar
        this.#price = newPrice
    }

    setStock(newStock) {
        this.#stock = newStock
    }

    getAllProperties() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            price: this.#price,
            stock: this.#stock,
            visible: this.#visible
        }
    }


    static async crear(data) {
        try {
            const { name, description, price, stock } = data;
            const product = new Producto(name, description, price, stock);
            const productObject = product.getAllProperties();

            await createDataFile(productObject, 'productos.json');

            return productObject;
        } catch (error) {
            throw new Error(`Error al crear un producto ERROR: ${error}`)
            
        }
    }

    static async encontrarTodos() {
        try {
            const productos = await getAllData('productos.json')
            return productos
        } catch (error) {
            throw new Error("Error al obtener los datos de los productos");
        }
    }

    static async encontrarPorId(id) {
        try {
            const producto = await getDataById(id, 'productos.json');
            return producto
        } catch (error) {
            throw new Error("Error al obtener los datos del producto");
        }
    }

    static async actualizar(id, data) {
        try {
            const actualizarProducto = await updateData(id, data, 'productos.json')
            return actualizarProducto
        } catch (error) {
            console.error(`Fallo al actualizar el producto, Error: ${error}`);
        } 
    }

    static async eliminarTheReal(id) {
        try {
            const productoBorrar = await permaDeleteData(id, 'productos.json');
            return productoBorrar
        } catch (error) {
            throw new Error(
              `Fallo al eliminar permanente el producto, Error: ${error}`
            );
        }

    }
}