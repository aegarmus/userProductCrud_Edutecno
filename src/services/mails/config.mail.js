import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true", //Si el puerto es SSL aqui pongo true
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, //Contraseña de Aplicaciones
  },
});

export const verifyConnectionMail = async() => {
    try {
        await transporter.verify();
        console.log('Conexión exitosa con el servidor de correo');
    } catch (error) {
        console.error('Error al conectar con el servidor de correo:', error);
        throw new Error(error)
    }
}