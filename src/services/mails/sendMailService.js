import { transporter } from "./config.mail.js"
import { emailHTMLtemplate } from "./mailTemplate.js";


/**
 * Envia un correo electronico a uno o más destinatarios
 * @param {Array<string>} to - Lista de Destinatarios
 * @param {string} subject - Asunto del correo
 * @param {string} message - Contenido del correo
 * @returns - Detalle del envio
 */

export const sendMailService = async({ to, subject, message, title }) => {
    try {

        const htmlTemplate = emailHTMLtemplate(title, message);
        
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: to.join(', '),
            subject,
            html: htmlTemplate
        }

        const infoData = await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito', infoData.messageId);
        return infoData;
    } catch (error) {
        console.error('Error al enviar el correo');
        throw new Error(error)
    }
}