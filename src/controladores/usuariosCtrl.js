import { conmysql } from '../db.js';

export const registrarUsuarios = async (req, res) => {
  const { nombres, usuario, clave } = req.body;
  const [result] = await conmysql.query(`INSERT INTO usuarios (USR_NOMBRES, USR_USUARIO, USR_CLAVE, PER_ID, USR_ESTADO)
    VALUES (?, ?, ?, 3, 'A')`, [nombres, usuario, clave]);
  res.json({ id: result.insertId });
};
