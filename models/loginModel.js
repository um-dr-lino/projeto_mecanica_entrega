import { pool } from '../config/db.js';

export const loginModel = {
  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM usuario where username = ?', [username]);
    return rows[0];
  },
  async getAll(){
    const [rows] = await pool.query('SELECT * FROM getallusers');
    return rows;
  },
  async createUser(username, senha, nome_completo) {
    const sql = 'CALL create_new_user(?, ?, ?)';
    const [result] = await pool.query(sql, [username, senha, nome_completo]); 
    return result;
}
}