import React, { useState, useEffect } from "react";
import { Stat, StatGroup, HStack } from "rsuite";
import axios from "axios";
import IngresosChart from "../components/IngresosChart";
import TopVentasChart from "../components/TopVentasChart";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const Dashboard = () => {
    const [finanzas, setFinanzas] = useState(null);
    const [gastos, setGastos] = useState(null);

    useEffect(() => {
        const getFinanzas = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/finanzas/obtener-ganancia-mes/`);
                setFinanzas(response.data);
            } catch (error) {
                console.error("Error al obtener ingresos:", error);
            }
        };

        const getGastos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/finanzas/obtener-gasto-mes/`);
                setGastos(response.data);
            } catch (error) {
                console.error("Error al obtener gastos:", error);
            }
        };

        getFinanzas();
        getGastos();
    }, []);

    return (
        <div>
            <div className="mx-5 mt-4">
                <StatGroup>
                    {/* Ingresos */}
                    <Stat>
                        <Stat.Label>Ingresos del mes anterior</Stat.Label>
                        <HStack spacing={10}>
                            <Stat.Value>₡ {finanzas?.totalMesAnterior?.toLocaleString() ?? "Cargando..."}</Stat.Value>
                        </HStack>
                    </Stat>

                    <Stat>
                        <Stat.Label>Ingresos de este mes</Stat.Label>
                        <HStack spacing={10}>
                            <Stat.Value>₡ {finanzas?.totalMesActual?.toLocaleString() ?? "Cargando..."}</Stat.Value>
                            <Stat.Trend
                                indicator={finanzas?.diferenciaPorcentaje > 0 ? "up" : "down"}
                            >
                                {finanzas?.diferenciaPorcentaje?.toFixed(2) ?? "0"}%
                            </Stat.Trend>
                        </HStack>
                    </Stat>

                    {/* Gastos */}
                    <Stat>
                        <Stat.Label>Gastos del mes anterior</Stat.Label>
                        <HStack spacing={10}>
                            <Stat.Value>₡ {gastos?.totalMesAnterior?.toLocaleString() ?? "Cargando..."}</Stat.Value>
                        </HStack>
                    </Stat>

                    <Stat>
                        <Stat.Label>Gastos de este mes</Stat.Label>
                        <HStack spacing={10}>
                            <Stat.Value>₡ {gastos?.totalMesActual?.toLocaleString() ?? "Cargando..."}</Stat.Value>
                            <Stat.Trend
                                indicator={gastos?.diferenciaPorcentual > 0 ? "up" : "down"}
                            >
                                {gastos?.diferenciaPorcentual?.toFixed(2) ?? "0"}%
                            </Stat.Trend>
                        </HStack>
                    </Stat>
                </StatGroup>
            </div>
            <div className="mx-5 mt-4">
                <IngresosChart />
            </div>
            <div className="mx-5 mt-4">
                <TopVentasChart />
            </div>
        </div>
    );
};

export default Dashboard;
