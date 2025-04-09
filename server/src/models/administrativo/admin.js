import sql from 'mssql';
import { connectDB } from '../../config/database.js';

export class Usuario {
  constructor(username, email, password, idRol) {
    this.idUsuario = 0; // Se generará automáticamente en la BD
    this.username = username;
    this.email = email;
    this.password = password; // Se recomienda almacenar un hash en lugar del texto plano
    this.idRol = idRol;
    this.failedLoginAttempts = 0;
    this.isLocked = 0;
    this.resetToken = null;
    this.resetTokenExpiry = null;
    this.lastLogin = null;
    this.lastPasswordChange = null;
  }
}
//------------

//BCRYPT para encriptar (no desencripta pero es seguro)

export class UsuarioRepository {

  // Insertar nuevos usuarios
  async insertUser(username, email, password) {
    try {
      const pool = await connectDB();
      await pool
        .request()
        .input("username", sql.NVarChar(50), username)
        .input("email", sql.NVarChar(100), email)
        .input("password", sql.NVarChar(255), password) // ocupa hashear la contrasenia
        .input("idRol", sql.Int, usuario.idRol)
        .query(`INSERT INTO USUARIO (username, email, password, idRol)
        VALUES (@username, @email, @password, 2)`);

      console.log("Usuario insertado exitosamente");
    } catch (error) {
      console.error("Error en insert:", error);
      throw new Error("Error al insertar usuario");
    }
  }

  async updateUsuario(idUsuario, datosActualizados) {
    try {
      const pool = await connectDB();

      const { username, email, password } = datosActualizados;

      const result = await pool
        .request()
        .input("idUsuario", sql.Int, idUsuario)
        .input("username", sql.NVarChar(50), username)
        .input("email", sql.NVarChar(100), email)
        .input("password", sql.NVarChar(255), password) // ocupa hashear la contrasenia
        .query(`
        UPDATE USUARIO
        SET username = @username, email = @email, password = @password
        WHERE idUsuario = @idUsuario`);
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw new Error("Error al actualizar usuario");
    }
  }

  // Eliminar usuario
  async deleteUsuario(idUsuario) {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("idUsuario", sql.Int, idUsuario)
        .query(`DELETE FROM USUARIO WHERE idUsuario = @idUsuario`);

      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw new Error("Error al eliminar usuario");
    }
  }

  //select todos
  async getAll() {
    try {
      const pool = await connectDB();
      const result = await pool.request().query("SELECT * FROM USUARIO");
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      throw new Error("Error al obtener usuarios");
    }
  }

  //select uno por ID
  async getOneByID(idUsuario) {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("idUsuario", sql.Int, idUsuario)
        .query("SELECT * FROM USUARIO WHERE idUsuario = @idUsuario");
      return result.recordset[0];
    } catch (error) {
      console.error("Error al obtener el usuario por ID:", error);
      throw new Error("Error al obtener usuario");
    }
  }

}