import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';

// Componente para mostrar la lista de trabajadores (GTR-002)
const ObtenerTrabajadoresComponent = ({ trabajadores }) => {
    return (
        <Card>
            <CardContent>
                <h2 className='text-xl mb-4'>Lista de Trabajadores</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre Completo</TableCell>
                            <TableCell>Cédula</TableCell>
                            <TableCell>Salario</TableCell>
                            <TableCell>Seguro Social</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trabajadores.map((trabajador) => (
                            <TableRow key={trabajador.idTrabajador}>
                                <TableCell>{trabajador.idTrabajador}</TableCell>
                                <TableCell>{trabajador.nombreCompleto}</TableCell>
                                <TableCell>{trabajador.cedula}</TableCell>
                                <TableCell>{trabajador.salario}</TableCell>
                                <TableCell>{trabajador.seguroSocial}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ObtenerTrabajadoresComponent;
