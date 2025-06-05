import { conmysql } from '../db.js';
export const subirImagenes = async (req, res) => {
  const proId = req.params.id;
  const files = req.files;
  try {
    for (const file of files) {
      await conmysql.query(`INSERT INTO imagenes (PRO_ID, IMG_FOTO, IMG_ESTADO) VALUES (?, ?, 'A')`, [proId, `/uploads/${file.filename}`]);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Error subiendo imágenes', error: err.message });
  }
};
