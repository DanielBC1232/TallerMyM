import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Componente para actualizar el salario de un trabajador (GTR-005)
const GestionarSalarioComponent = ({ onSubmit }) => {
    const [id, setId] = useState('');
    const [salario, setSalario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id, salario });
        setId('');
        setSalario('');
    };

    return (
        <Card>
            <CardContent>
                <h2 className='text-xl mb-4'>Actualizar Salario de Trabajador</h2>
                <form onSubmit={handleSubmit}>
                    <Input placeholder='ID del Trabajador' value={id} onChange={(e) => setId(e.target.value)} required />
                    <Input placeholder='Nuevo Salario' type='number' value={salario} onChange={(e) => setSalario(e.target.value)} required />
                    <Button type='submit' className='mt-4'>Actualizar Salario</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default GestionarSalarioComponent;
