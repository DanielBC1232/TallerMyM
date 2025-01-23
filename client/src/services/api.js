import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Cambia el puerto si es diferente

// Obtener todos los trabajadores
export const getTrabajadores = async () => {
  try {
    const response = await axios.get(`${API_URL}/trabajadores`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los trabajadores:', error);
    throw error;
  }
};

// Agregar un trabajador
export const addTrabajador = async (trabajador) => {
  try {
    const response = await axios.post(`${API_URL}/trabajadores`, trabajador);
    return response.data;
  } catch (error) {
    console.error('Error al agregar trabajador:', error);
    throw error;
  }
};
