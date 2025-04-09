import { Usuario, UsuarioRepository } from "../../models/administrativo/admin.js";

const UsuarioRepo = new UsuarioRepository();

// Registrar un usuario
const registrarUsuario = async (req, res) => {
  try {
    const { username, email, password} = req.body;//parametros
    //------
    await UsuarioRepo.insertUser(username, email, password);
    res.status(201).json();
  } catch (error) {
    console.error("Error al insertar usuario:", error);
    res.status(500).json({ error: "Error al insertar el usuario" });
  }
};

//-----------------------------------------------

const actualizarUsuario = async (req, res) => {

  try {
    const idUsuario = req.params.idUsuario;
    const datosActualizados = req.body;
    const actualizacionExitosa = await UsuarioRepo.updateUsuario(idUsuario, datosActualizados);

    if (!actualizacionExitosa) {
      res.status(404).json({ error: "Usuario no encontrado o no se pudo actualizar" });
    } else {
      res.status(200).json({ message: "Datos del usuario actualizados exitosamente" });
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar los datos del usuario" });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    const UsuarioEliminado = await UsuarioRepo.deleteUsuario(idUsuario);

    if (!UsuarioEliminado) {
      res.status(404).json({ error: "Usuario no encontrado o no se pudo eliminar" });
    } else {
      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    }
  } catch (error) {
    console.error("Error al eliminar Usuario:", error);
    res.status(500).json({ error: "Error al eliminar Usuario" });
  }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    // Usar el método getAll del repositorio
    const usuarios = await UsuarioRepo.getAll();

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    res.status(500).json({ error: "Error al obtener todos los usuarios" });
  }
};

// Obtener un usuario por ID
const obtenerUsuario = async (req, res) => {
  try {
    // Usar el método getOneByID del repositorio
    const id = parseInt(req.params.id);
    const usuario = await UsuarioRepo.getOneByID(id);

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

export {
  registrarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarios,//plural
  obtenerUsuario,//singular
};