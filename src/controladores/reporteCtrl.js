import { conmysql } from "../db.js";

export const getVentasPorFecha = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.query;
        
        if (!fecha_inicio || !fecha_fin) {
            return res.status(400).json({ 
                message: "Debe proporcionar fecha_inicio y fecha_fin" 
            });
        }
        
        const [ventas] = await conmysql.query(
            `SELECT p.PED_ID AS IDPEDIDO, 
                    CONCAT(c.CLI_NOMBRES, ' ', c.CLI_APELLIDOS) AS NOMBRECLIENTE, 
                    p.PED_FECHA AS FECHA, 
                    p.PED_TOTAL AS VALORTOTAL
             FROM pedidos p
             JOIN clientes c ON p.CLI_ID = c.CLI_ID
             WHERE p.PED_FECHA BETWEEN ? AND ?
             ORDER BY p.PED_FECHA DESC`,
            [fecha_inicio, fecha_fin]
        );
        
        res.json({ cant: ventas.length, data: ventas });
        
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener el reporte de ventas",
            error: error.message
        });
    }
};