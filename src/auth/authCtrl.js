import { conmysql } from '../db.js';

export const login = async (req, res) => {
  const { usuario, clave } = req.body;
  try {
    const [rows] = await conmysql.query(
      `SELECT u.USR_ID, u.USR_NOMBRES, u.PER_ID, p.PER_DECRIPCION FROM usuarios u
       JOIN perfil p ON u.PER_ID = p.PER_ID
       WHERE USR_USUARIO = ? AND USR_CLAVE = ? AND USR_ESTADO = 'A'`,
      [usuario, clave]
    );
    if (rows.length === 0) return res.status(401).json({ message: 'Credenciales incorrectas' });

    const usuarioEncontrado = rows[0];
    const [accesos] = await conmysql.query('SELECT ACC_NOMBRE, ACC_PAGINA FROM accesos WHERE PER_ID = ? AND ACC_ESTADO = "A"', [usuarioEncontrado.PER_ID]);
    res.json({ success: true, usuario: { id: usuarioEncontrado.USR_ID, nombre: usuarioEncontrado.USR_NOMBRES, perfil: usuarioEncontrado.PER_DECRIPCION, accesos } });
  } catch (error) {
    res.status(500).json({ message: 'Error al autenticar', error: error.message });
  }
};