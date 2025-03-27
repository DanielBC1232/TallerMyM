const { Usuario,UsuarioRepository} = require("../../models/administrativo/admin");

const UsuairoRepo = new UsuarioRepository();

// Insertar un vehiculo
const registrarUsuario = async (req, res) => {
  try {
    const { username,email,password,idRol } = req.body;//parametros
    const newUsuario = new Usuario(username,email,password,idRol );
//------
    await UsuairoRepo.insertUser(newUsuario);
    res.status(201).json(newUsuario);
  } catch (error) {
    console.error("Error al insertar cliente:", error);
    res.status(500).json({ error: "Error al insertar el cliente" });
  }
};

//-----------------------------------------------


const actualizarUsuario = async (req, res) => {
  
  try {
    const idUsuario = req.params.idUsuario;
    const datosActualizados = req.body;
    const actualizacionExitosa = await UsuairoRepo.updateUsuario(idUsuario, datosActualizados);

    if (!actualizacionExitosa) {
      res.status(404).json({ error: "Vehiculo no encontrado o no se pudo actualizar" });
    } else {
      res.status(200).json({ message: "Datos del cliente actualizados exitosamente" });
    }
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error al actualizar los datos del cliente" });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    const UsuarioEliminado = await UsuairoRepo.deleteUsuario(idUsuario);

    if (!UsuarioEliminado) {
      res.status(404).json({ error: "Vehiculo no encontrado oooo no se pudo eliminar" });
    } else {
      res.status(200).json({ message: "Vehiculo eliminado exitosamente" });
    }
  } catch (error) {
    console.error("Error al eliminar Vehiculo:", error);
    res.status(500).json({ error: "Error al eliminar Vehiculo" });
  }
};

// Obtener todos los vehiculos
const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    // Usar el método getAll del repositorio
    const usuarios = await UsuairoRepo.getAll();

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener todos los clientes:", error);
    res.status(500).json({ error: "Error al obtener todos los clientes" });
  }
};

// Obtener todos los vehiculos
const obtenerunUsuario = async (req, res) => {
  try {
    // Usar el método getAll del repositorio
    const idUsuario = parseInt(req.params.idUsuario);
    const usuarios = await UsuairoRepo.getOneByID(idUsuario);

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener todos los clientes:", error);
    res.status(500).json({ error: "Error al obtener todos los clientes" });
  }

  
};
// Obtener todos los vehiculos
const obtenerunUsuarioEdit = async (req, res) => {
  try {
    const { idUsuario } = req.params; // Obtener la cédula del query string /params 268570349 y /query cliente?cedula=268570349

    if (!idUsuario) {
      return res.status(400).json({ error: "La cédula es requerida" });
    }

    const usuario = await UsuairoRepo.getOneByIDedit(idUsuario);

    if (!usuario || usuario.length === 0) {
      res.status(404).json({ error: "Cliente no encontrado" });
    } else {
      res.status(200).json(usuario[0]); // Devuelve el primer cliente encontrado
    }
  } catch (error) {
    console.error("Error al obtener cliente por cédula:", error);
    res.status(500).json({ error: "Error al obtener cliente por cédula" });
  }
};





module.exports = { 
  registrarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerTodosLosUsuarios,
  obtenerunUsuario,
  obtenerunUsuarioEdit,
};
