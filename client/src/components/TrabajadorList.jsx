import React, { useState, useEffect } from 'react';
import { getTrabajadores } from '../services/api';

const TrabajadorList = () => {
  const [trabajadores, setTrabajadores] = useState([]);

  useEffect(() => {
    const fetchTrabajadores = async () => {
      try {
        const data = await getTrabajadores();
        setTrabajadores(data);
      } catch (error) {
        console.error('Error al cargar trabajadores:', error);
      }
    };

    fetchTrabajadores();
  }, []);

  return (
    <div>
      <h2>Lista de Trabajadores</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Cédula</th>
            <th>Salario</th>
            <th>Seguro Social</th>
          </tr>
        </thead>
        <tbody>
          {trabajadores.map((trabajador) => (
            <tr key={trabajador.idTrabajador}>
              <td>{trabajador.idTrabajador}</td>
              <td>{trabajador.nombreCompleto}</td>
              <td>{trabajador.cedula}</td>
              <td>{trabajador.salario}</td>
              <td>{trabajador.seguroSocial}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrabajadorList;
