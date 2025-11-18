import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
let DB_HOST = process.env.DB_HOST || '127.0.0.1'
let DB_USER = process.env.DB_USER || 'root'
let DB_PASS = process.env.DB_PASS || ''
let DB_NAME = process.env.DB_NAME || 'db_pecas' 
let DB_PORT = process.env.DB_PORT || 8080

const parsedPass = DB_PASS;

export const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: parsedPass,
  database: DB_NAME,
  port: DB_PORT ? Number(DB_PORT) : 8080,
  waitForConnections: true,
  connectionLimit: 10,
  multipleStatements: true
});