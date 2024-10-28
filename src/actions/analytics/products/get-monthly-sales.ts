'use server';

import { db } from '@/lib/db';

// Define el tipo para las ventas mensuales
export type MonthlySales = {
  month: string;
  productos: number;
};

// Función asincrónica para obtener las ventas mensuales
export const getMonthlySales = async (): Promise<MonthlySales[]> => {
  // Obtener todas las ventas
  const sales = await db.salesHistory.findMany();

  // Obtener la fecha actual
  const currentDate = new Date();

  // Calcular la fecha de hace 6 meses
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

  // Crear un objeto para almacenar las ventas por mes
  const salesByMonth: Record<string, { month: string; productos: number }> = {};

  // Agrupar las ventas por mes solo para los últimos 6 meses
  sales.forEach((sale) => {
    const date = new Date(sale.date);

    // Filtrar por los últimos 6 meses
    if (date >= sixMonthsAgo) {
      const month = date
        .toLocaleString('default', { month: 'long' })
        .toLowerCase(); // Obtener el nombre del mes en minúsculas
      const year = date.getFullYear();

      // Crear una clave única para el año y mes
      const monthYearKey = `${month} ${year}`;

      // Inicializar el mes en el objeto si no existe
      if (!salesByMonth[monthYearKey]) {
        salesByMonth[monthYearKey] = { month, productos: 0 };
      }

      // Sumar la cantidad vendida
      salesByMonth[monthYearKey].productos += sale.quantity;
    }
  });

  // Convertir el objeto a un array
  const chartData = Object.values(salesByMonth);

  // Ordenar por el orden de los meses
  const monthOrder = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  // Ordenar el array de chartData por el índice del mes
  chartData.sort((a, b) => {
    return (
      monthOrder.indexOf(a.month.toLowerCase()) -
      monthOrder.indexOf(b.month.toLowerCase())
    );
  });

  // Devolver solo los últimos 6 meses
  return chartData.slice(-6);
};
