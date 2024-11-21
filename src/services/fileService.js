import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { YeisonError } from '../error/typesError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const createFile = async(data, pathData) => {
    try {
        const datafilePath = path.join(__dirname, `../data/${pathData}`)
        
        await fs.mkdir(path.dirname(datafilePath) , { recursive: true })

        await fs.writeFile(datafilePath, JSON.stringify(data, null, 4), 'utf8');
    } catch (error) {
        throw new YeisonError('Error al Crear el archivo', error)
    }
}


export const readFile = async (pathData) => {
    try {
        const datafilePath = path.join(__dirname, `../data/${pathData}`)

        const data = await fs.readFile(datafilePath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        console.error(`No pudemos leer el archivo: ${error}` )
        throw new YeisonError("Error al Leer el archivo", error);
    }
}