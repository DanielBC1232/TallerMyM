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
export class UsuarioRepository {
  // Insertar nuevos usuarios
  async insertUser(usuario) {
    console.log(usuario);
    try {
      const pool = await connectDB();
      await pool
        .request()
        .input("username", sql.NVarChar(50), usuario.username)
        .input("email", sql.NVarChar(100), usuario.email)
        .input("password", sql.NVarChar(255), usuario.password) // ocupa hashear la contrasenia
        .input("idRol", sql.Int, usuario.idRol)
        .query(`INSERT INTO USUARIO (username, email, password, idRol)
                VALUES (@username, @email, @password, @idRol)`);

      console.log("Usuario insertado exitosamente");
    } catch (error) {
      console.error("Error en insert:", error);
      throw new Error("Error al insertar usuario");
    }
  }


  async updateUsuario(idUsuario, datosActualizados) {
    try {
      const pool = await connectDB();

      const { username, email, password, idRol } = datosActualizados;

      const result = await pool
        .request()
        .input("idUsuario", sql.Int, idUsuario)
        .input("username", sql.NVarChar(50), username)
        .input("email", sql.NVarChar(100), email)
        .input("password", sql.NVarChar(255), password) // ocupa hashear la contrasenia
        .input("idRol", sql.Int, idRol)
        .query(`
                    UPDATE USUARIO
                    SET username = @username, email = @email, password = @password, idRol = @idRol
                    WHERE idUsuario = @idUsuario
                `);

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
        .query(`
                    DELETE FROM USUARIO WHERE idUsuario = @idUsuario
                `);

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
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener el usuario por ID:", error);
      throw new Error("Error al obtener usuario");
    }
  }

  //select uno por ID para editar (campos específicos)
  async getOneByIDedit(idUsuario) {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("idUsuario", sql.Int, idUsuario)
        .query("SELECT idUsuario,username,email,password,idRol FROM USUARIO WHERE idUsuario = @idUsuario");
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener el usuario por ID para editar:", error);
      throw new Error("Error al obtener usuario para editar");
    }
  }
}