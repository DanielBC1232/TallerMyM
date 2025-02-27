import{Router, Request, Response} from 'express';
import sql from 'mssql';
import { connectDB } from '../../config/database';

const router=Router();

interface Usuario {
    idUsuario: number;
    nombreUsuario: string;
    email: string;
    cedula: string;
    contrasenaHash: Buffer;
    estadoCuenta: string;
    fechaRegistro: Date;
    fechaUltimaSesion: Date;
}
// Obtener usuario por correo
const getUsuarioByEmail = async (email: string): Promise<Usuario | null> => {
    const pool = await connectDB();
    try {
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM USUARIO WHERE email = @email');

        return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
        console.error('Error en la consulta de usuario por correo:', error);
        throw new Error('Error al acceder a la base de datos');
    } finally {
        pool.close();
    }
};

// Ruta para obtener usuario por email
router.get('/get-by-email/:email', async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const usuario = await getUsuarioByEmail(email);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
});

// Ruta para enviar correo
router.post('/send-email', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, nombreUsuario, message } = req.body;

        if (!email || !nombreUsuario || !message) {
            res.status(400).json({ message: 'Faltan datos requeridos' });
            return;
        }

        console.log(`Enviando correo a ${email} con asunto "${nombreUsuario}"`);

        res.json({ message: 'Correo enviado exitosamente' });
    } catch (error: any) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el correo', error: error.message });
    }
});

export default router;