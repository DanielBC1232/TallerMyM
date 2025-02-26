import sql from 'mssql';
import { connectDB } from '../../config/database';

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
export const getUsuarioByEmail = async (email: string): Promise<Usuario | null> => {
    const pool = await connectDB();

    try{
       const result = await pool.request()
       .input('email', sql.NVarChar, email)
       .query('SELECT * FROM USUARIO WHERE email = @email');

       if (result.recordset.length > 0) {
        return result.recordset[0];
      }

      return null; 
  } catch (error) {
      console.error('Error en la consulta de usuario por correo:', error);
      throw new Error('Error al acceder a la base de datos');
  } finally {
      pool.close(); 
  }
};