import { transporter } from "./config.mail.js"
import { emailHTMLtemplate } from "./mailTemplate.js";


/**
 * Envia un correo electronico a uno o más destinatarios
 * @param {Array<string>} to - Lista de Destinatarios
 * @param {string} subject - Asunto del correo
 * @param {string} message - Contenido del correo
 * @returns - Detalle del envio
 */

export const sendMailService = async({ to, subject, message/* , title, despeidda */ }) => {
    try {

        /* const htmlTemplate = emailHTMLtemplate(title, message, despedida); */

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: to.join(', '),
            subject,
            text: message
           /*  html: htmlTemplate */
        }

        const infoData = await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito', infoData.messageId);
        return infoData;
    } catch (error) {
        console.error('Error al enviar el correo');
        throw new Error(error)
    }
}