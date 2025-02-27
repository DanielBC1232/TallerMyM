import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';

// Componente para el formulario de agregar trabajadores (GTR-001)
const AgregarTrabajadorForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        cedula: '',
        salario: '',
        seguroSocial: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ nombreCompleto: '', cedula: '', salario: '', seguroSocial: '' });
    };

    return (
        <Card>
            <CardContent>
                <h2 className='text-xl mb-4'>Agregar Nuevo Trabajador</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4'>
                        <Input placeholder='Nombre Completo' name='nombreCompleto' value={formData.nombreCompleto} onChange={handleChange} required />
                        <Input placeholder='Cédula' name='cedula' value={formData.cedula} onChange={handleChange} required />
                        <Input placeholder='Salario' name='salario' type='number' value={formData.salario} onChange={handleChange} required />
                        <Input placeholder='Seguro Social' name='seguroSocial' value={formData.seguroSocial} onChange={handleChange} required />
                    </div>
                    <Button type='submit' className='mt-4'>Guardar</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AgregarTrabajadorForm;
