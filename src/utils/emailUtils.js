import { sendMailService } from "../services/mails/sendMailService.js";
import { Validate } from "./Validaciones.js";


//Escoger una de las siguientes opciones (1 es más de programación y 2 es más de POO)

export const sendEmail = async(data) => {
    try {
        const { subject, message, recipients } = data;
        console.log(subject, message, recipients)

        const mailContents = Validate.emailContent(subject, message, recipients)
        
        const infoData = await sendMailService(mailContents)

        return infoData
    } catch (error) {
        throw new Error('Error al mandar el correo ', error )
    }
}


export class Email {
    static async sendEmail(data) {
        try {
            const { subject, message, recipients } = data.body;
            const mailContents = Validate.emailContent(subject, message, recipients)
        
            const infoData = await sendMailService(mailContents)

            return infoData
        } catch (error) {
            throw new Error('Error al mandar el correo ', error )
        }
    } 
}