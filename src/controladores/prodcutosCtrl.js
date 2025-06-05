import { conmysql } from '../db.js';

export const registrarProducto = async (req, res) => {
  const { codigo, nombre, descripcion, precio } = req.body;
  const [result] = await conmysql.query(`INSERT INTO producto (PRO_CODIGO, PRO_NOMBRE, PRO_DESCRIPCION, PRO_FOTO, PRO_PRECIO, PRO_ESTADO)
    VALUES (?, ?, ?, '', ?, 'A')`, [codigo, nombre, descripcion, precio]);
  res.json({ id: result.insertId });
};

export const registrarTalla = async (req, res) => {
  const proId = req.params.id;
  const { talla, stock } = req.body;
  const [check] = await conmysql.query(`SELECT * FROM tallas WHERE PRO_ID = ? AND TA_TALLA = ?`, [proId, talla]);
  if (check.length > 0) return res.status(400).json({ message: 'Talla ya registrada' });
  const [result] = await conmysql.query(`INSERT INTO tallas (PRO_ID, TA_TALLA, TA_STOCK, TA_ESTADO) VALUES (?, ?, ?, 'A')`, [proId, talla, stock]);
  res.json({ id: result.insertId });
  
};
