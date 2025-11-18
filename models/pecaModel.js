import { pool } from '../config/db.js';

export const PecaModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM pecas');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM pecas WHERE id_peca = ?', [id]);
    return rows[0];
  },

  async create({ nome_peca, descr_peca }) {
    const [result] = await pool.query(
      'INSERT INTO pecas (nome_peca, descr_peca) VALUES (?, ?)',
      [nome_peca, descr_peca]
    );
    return { id_peca: result.insertId, nome_peca, descr_peca };
  },

  async update(id, { nome_peca, descr_peca }) {
    await pool.query(
      'UPDATE pecas SET nome_peca = ?, descr_peca = ? WHERE id_peca = ?',
      [nome_peca, descr_peca, id]
    );
    return this.getById(id);
  },

  async delete(id) {
    await pool.query('DELETE FROM pecas WHERE id_peca = ?', [id]);
    return { message: 'Peça removida com sucesso' };
  },

  async searchByName(nome) {
    const [rows] = await pool.query(
      'SELECT * FROM pecas WHERE nome_peca LIKE ?',
      [`%${nome}%`]
    );
    return rows;
  },
};
