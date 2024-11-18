import { createFile, readFile } from "../services/fileService.js"

export const createDataFile = async (data, dataPath) => {
    try {
        const datafile = await readFile(dataPath);
        let dataJson = null
    
        !datafile || datafile.length === 0 ? (dataJson = [data]) : dataJson = [ ...datafile, data ]
    
        await createFile(dataJson, dataPath)
        
    } catch (error) {
        throw new Error(`Error al gestionar la creación del archivo con la data. ERROR: ${error}`)
    }
}


export const getAllData = async(pathData) => {
    try {
        const data = await readFile(pathData)
        return data
    } catch (error) {
        throw new Error('No pudimos acceder a los datos')
    }
}


export const getDataById = async(id, pathData) => {
    try {
        const data = await readFile(pathData)
        const dataFound = data.find(dataFound => dataFound.id === id)

        return dataFound
    } catch (error) {
        throw new Error('No pudimos encontrar el dato por el id')
    }
}


export const updateData = async(id, newData, pathData) => {
    try {
        const data = await readFile(pathData);
        const indexData  = data.findIndex(dataFound => dataFound.id === id);

        if(indexData === -1) console.error('No pudimos Encontrar el dato que buscas')
        
        //Cortesía: Devolver el dato anterior para comparar
        const oldData = {...data[indexData]}
        
        data[indexData] = { id, ...newData, active: true };
        await createFile(data, pathData)

        //Cortesía: devuelvo la data vieja
        return oldData

    } catch (error) {
        console.error('No pudimos actualizar la data')
    }
}


export const permaDeleteData = async(id, pathData) => {
    try {
        const data = await readFile(pathData);

        const indexData = data.findIndex( dataFound => dataFound.id === id );

        if(indexData === -1) throw new Error(`No pudimos encontrar la data`);

        const dataDelete = data[indexData]
        data.splice(indexData, 1)

        await createFile(data, pathData )

        return dataDelete
    } catch (error) {
        console.error("No pudimos actualizar la data");
    }
}


export const softDeleteData = async(id, pathData) => {
    try {
        const data = await readFile(pathData);

        const indexData = data.findIndex(dataFound => dataFound.id === id)
        if (indexData === -1) throw new Error(`No pudimos encontrar la data`);

        console.log(data[indexData])

        console.log(data[indexData].desactivate());
        data[indexData].desactivate();
        console.log(data)

        await createFile(data, pathData)
    } catch (error) {
        console.error("No pudimos actualizar la data");
    }
}