import express from 'express';
import dotenv from 'dotenv'

import usuarioRouter from './routes/usuario.routes.js'
import productoRouter from './routes/producto.routes.js'
import emailRouter from './routes/email.routes.js'
import { errorHandler } from './middleware/errorHandler.js';
import { verifyConnectionMail } from './services/mails/config.mail.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use('/api/v1', usuarioRouter);
app.use('/api/v1', productoRouter);
app.use('/api/v1', emailRouter);

app.use(errorHandler)

app.listen(PORT, async() => {
    try {
        await verifyConnectionMail();
        console.log('El transportador de correos esta ready');
    } catch (error) {
        console.error('Problemas con el transportador de correos', error)
    }
    console.log(`El servidor esta arriba en el puerto: ${PORT} 👌`)
})