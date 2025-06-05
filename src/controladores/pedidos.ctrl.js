import { conmysql } from '../db.js';

export const crearPedido = async (req, res) => {
  const { cli_id, usr_id, items } = req.body;
  const [ivaParam] = await conmysql.query("SELECT PARAM_VALOR FROM parametros WHERE PARAM_CODIGO = 'IVA'");
  const IVA = ivaParam[0].PARAM_VALOR;
  let subtotal = 0;
  for (const item of items) subtotal += item.precio * item.cantidad;
  const iva = subtotal * (IVA / 100);
  const total = subtotal + iva;
  const [pedidoResult] = await conmysql.query(`INSERT INTO pedidos (CLI_ID, USR_ID, PED_FECHA, PED_SUBTOTAL, PED_IVA, PED_TOTAL, PED_ESTADO) VALUES (?, ?, NOW(), ?, ?, ?, 'A')`, [cli_id, usr_id, subtotal, iva, total]);
  const pedidoId = pedidoResult.insertId;
  for (const item of items) {
    await conmysql.query(`INSERT INTO detalle (TA_ID, PED_ID, DET_CANTIDAD, DET_PRECIO, DET_IVA, DET_TOTAL) VALUES (?, ?, ?, ?, ?, ?)`, [item.talla_id, pedidoId, item.cantidad, item.precio, item.precio * item.cantidad * (IVA / 100), item.precio * item.cantidad * (1 + IVA / 100)]);
  }
  res.json({ id: pedidoId });
};

export const obtenerPendientes = async (req, res) => {
  const [rows] = await conmysql.query(`SELECT * FROM pedidos WHERE PED_ESTADO = 'A'`);
  res.json(rows);
};

export const despacharPedido = async (req, res) => {
  const [result] = await conmysql.query(`UPDATE pedidos SET PED_ESTADO = 'D' WHERE PED_ID = ?`, [req.params.id]);
  if (result.affectedRows === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
  res.json({ message: 'Pedido despachado' });
};
