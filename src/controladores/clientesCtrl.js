import { conmysql } from '../db.js';

export const obtenerClientes = async (req, res) => {
    try{
  const [result] = await conmysql.query("SELECT * FROM clientes WHERE CLI_ESTADO = 'A'");
  res.json({ cant: result.length, data: result });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener los clientes",
            error: error.message,
    });

};
}

export const getClientePorCedula = async (req, res) => {
    try{
  const [rows] = await conmysql.query('SELECT * FROM clientes WHERE CLI_CEDULA = ?', 
    [req.params.cedula]);
  if (rows.length === 0) 
    return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json(rows[0]);
  }catch (error) {
        return res.status(500).json({
            message: "Error al obtener los clientes",
            error: error.message,});
    }
};

export const registrarCliente = async (req, res) => {
    try{
        const { cedula, nombres, apellidos, direccion, telefono, correo } = req.body;
        const [result] = await conmysql.query(`INSERT INTO clientes
        (CLI_CEDULA, CLI_NOMBRES, CLI_APELLIDOS, 
        CLI_DIRECCION, CLI_TELEFONO, CLI_CORREO, CLI_ESTADO)
        VALUES (?, ?, ?, ?, ?, ?, 'A')`, 
        [cedula, nombres, apellidos, direccion, telefono, correo]);
    res.json({ id: result.insertId });
    }catch(error){
            return res.status(500).json({message: "Error al obtener los clientes",
                error: error.message,})
}
};