import { Request, Response } from 'express';
import { sendEmail } from '../../services/emailServices';

export const sendEmailController = async (req: Request, res: Response): Promise<void> => {
    const { email, nombre } = req.body;

    if (!email || !nombre) {
        res.status(400).json({ error: 'Faltan datos requeridos' });
        return;
    }

    try {
       await sendEmail(email, nombre);
        res.json({ message: 'Correo enviado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
};