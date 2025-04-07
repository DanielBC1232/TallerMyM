import { Usuario, UsuarioRepository } from "../../models/administrativo/admin.js";

const UsuairoRepo = new UsuarioRepository();

// Registrar un usuario
const registrarUsuario = async (req, res) => {
  try {
    const { username, email, password, idRol } = req.body;//parametros
    const newUsuario = new Usuario(username, email, password, idRol);
    //------
    await UsuairoRepo.insertUser(newUsuario);
    res.status(201).json(newUsuario);
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
    const actualizacionExitosa = await UsuairoRepo.updateUsuario(idUsuario, datosActualizados);

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
    const UsuarioEliminado = await UsuairoRepo.deleteUsuario(idUsuario);

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
const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    // Usar el método getAll del repositorio
    const usuarios = await UsuairoRepo.getAll();

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    res.status(500).json({ error: "Error al obtener todos los usuarios" });
  }
};

// Obtener un usuario por ID
const obtenerunUsuario = async (req, res) => {
  try {
    // Usar el método getOneByID del repositorio
    const idUsuario = parseInt(req.params.idUsuario);
    const usuarios = await UsuairoRepo.getOneByID(idUsuario);

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Obtener un usuario por ID para editar
const obtenerunUsuarioEdit = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (!idUsuario) {
      return res.status(400).json({ error: "El ID del usuario es requerido" });
    }

    const usuario = await UsuairoRepo.getOneByIDedit(idUsuario);

    if (!usuario || usuario.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
    } else {
      res.status(200).json(usuario[0]);
    }
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    res.status(500).json({ error: "Error al obtener usuario por ID" });
  }
};

export {
  registrarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerTodosLosUsuarios,
  obtenerunUsuario,
  obtenerunUsuarioEdit,
};