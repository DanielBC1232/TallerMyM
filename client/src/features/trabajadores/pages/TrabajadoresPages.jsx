import React, { useEffect, useState } from 'react';
import AgregarTrabajadorComponent from '@/components/features/trabajadores/AgregarTrabajadorComponent';
import ObtenerTrabajadoresComponent from '@/components/features/trabajadores/ObtenerTrabajadoresComponent';
import GestionarSalarioComponent from '@/components/features/trabajadores/GestionarSalarioComponent';

const TrabajadoresPage = () => {
    const [trabajadores, setTrabajadores] = useState([]);

    // Obtener la lista de trabajadores al cargar la página
    useEffect(() => {
        fetch('/api/trabajadores')
            .then((response) => response.json())
            .then((data) => setTrabajadores(data))
            .catch((error) => console.error('Error al obtener los trabajadores:', error));
    }, []);

    // Función para agregar un trabajador
    const handleAgregarTrabajador = (formData) => {
        fetch('/api/trabajadores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then(() => {
                alert('Trabajador agregado exitosamente');
                window.location.reload();
            })
            .catch((error) => console.error('Error al agregar el trabajador:', error));
    };

    // Función para actualizar el salario de un trabajador
    const handleActualizarSalario = ({ id, salario }) => {
        fetch(`/api/trabajadores/${id}/salario`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ salario })
        })
            .then((response) => response.json())
            .then(() => {
                alert('Salario actualizado exitosamente');
                window.location.reload();
            })
            .catch((error) => console.error('Error al actualizar el salario:', error));
    };

    return (
        <div className='p-4 space-y-8'>
            <AgregarTrabajadorComponent onSubmit={handleAgregarTrabajador} />
            <ObtenerTrabajadoresComponent trabajadores={trabajadores} />
            <GestionarSalarioComponent onSubmit={handleActualizarSalario} />
        </div>
    );
};

export default TrabajadoresPage;
