import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { pool } from './db.js';
import fs from 'fs/promises'

dotenv.config();

const { DB_HOST = '127.0.0.1', DB_USER = 'root', DB_PASS = '', DB_NAME, DB_PORT } = process.env;
const parsedPass = DB_PASS

export async function initDb() {

  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: parsedPass,
      port: DB_PORT ? Number(DB_PORT) : 8080,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`Banco de dados "${DB_NAME}" verificado/criado.`);
    await connection.end();
  } catch (err) {
    console.error('Não foi possível conectar ao servidor MySQL para criar o DB:', err.message);
    throw err; 
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tipo_veiculo (
      id_tipo INT PRIMARY KEY,
      tipo VARCHAR(50) NOT NULL UNIQUE
    );
  `);

  await pool.query(`
    INSERT IGNORE INTO tipo_veiculo (id_tipo, tipo) VALUES
      (1, 'popular'),
      (2, 'luxo'),
      (3, 'super luxo');
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS proprietario (
      id_proprietario INT AUTO_INCREMENT PRIMARY KEY,
      cpf BIGINT UNIQUE,               -- NÃO é pk, conforme solicitado (BIGINT: não-string)
      nome VARCHAR(150) NOT NULL,
      fone VARCHAR(30),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS marca (
      id_marca INT AUTO_INCREMENT PRIMARY KEY,
      nome_marca VARCHAR(100) NOT NULL UNIQUE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS modelo (
      id_modelo INT AUTO_INCREMENT PRIMARY KEY,
      nome_modelo VARCHAR(100) NOT NULL,
      id_marca INT NOT NULL,
      FOREIGN KEY (id_marca) REFERENCES marca(id_marca) ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS veiculo (
      id_veiculo INT AUTO_INCREMENT PRIMARY KEY,
      placa_veiculo VARCHAR(10) NOT NULL UNIQUE,
      id_modelo INT NOT NULL,
      id_proprietario INT NOT NULL,
      preco_veiculo DECIMAL(12,2) NOT NULL,
      id_tipo INT NOT NULL,
      ano INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_modelo) REFERENCES modelo(id_modelo) ON DELETE RESTRICT ON UPDATE CASCADE,
      FOREIGN KEY (id_proprietario) REFERENCES proprietario(id_proprietario) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (id_tipo) REFERENCES tipo_veiculo(id_tipo) ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS servico (
      id_servico INT AUTO_INCREMENT PRIMARY KEY,
      nome_servico VARCHAR(100) NOT NULL,
      descr_servico VARCHAR(255)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS manutencao (
      id_manutencao INT AUTO_INCREMENT PRIMARY KEY,
      id_veiculo INT NOT NULL,
      id_servico INT NOT NULL,
      data_servico DATE NOT NULL,
      km INT,
      custo DECIMAL(12,2),
      observacoes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_veiculo) REFERENCES veiculo(id_veiculo) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (id_servico) REFERENCES servico(id_servico) ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuario (
      id_usuario INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      senha VARCHAR(255) NOT NULL,
      nome_completo VARCHAR(150),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const [servCount] = await pool.query('SELECT COUNT(*) AS cnt FROM servico');
  if (servCount[0].cnt === 0) {
    await pool.query(`
      INSERT INTO servico (nome_servico, descr_servico) VALUES
        ('Troca de óleo', 'Troca de óleo do motor e filtro'),
        ('Alinhamento', 'Alinhamento e balanceamento'),
        ('Pastilhas de freio', 'Substituição das pastilhas dianteiras');
    `);
  }

  await pool.query(`DROP TRIGGER IF EXISTS trg_veiculo_set_tipo;`);
  await pool.query(`
    CREATE TRIGGER trg_veiculo_set_tipo
    BEFORE INSERT ON veiculo
    FOR EACH ROW
    BEGIN
      IF NEW.preco_veiculo < 45000 THEN
        SET NEW.id_tipo = 1;
      ELSEIF NEW.preco_veiculo >= 45000 AND NEW.preco_veiculo < 90000 THEN
        SET NEW.id_tipo = 2;
      ELSE
        SET NEW.id_tipo = 3;
      END IF;
    END;
  `);

  await pool.query(`DROP PROCEDURE IF EXISTS sp_transferir_proprietario;`);
  await pool.query(`
    CREATE PROCEDURE sp_transferir_proprietario(IN p_placa VARCHAR(10), IN p_novo_prop INT)
    BEGIN
      START TRANSACTION;
        UPDATE veiculo
        SET id_proprietario = p_novo_prop
        WHERE placa_veiculo = p_placa;
      COMMIT;
    END;
  `);

  const [mcount] = await pool.query('SELECT COUNT(*) AS total FROM marca');
  if (mcount[0].total === 0) {
    await pool.query(`
      INSERT INTO marca (nome_marca) VALUES
        ('Toyota'),
        ('Chevrolet'),
        ('Volkswagen');
    `);

    await pool.query(`
      INSERT INTO modelo (nome_modelo, id_marca) VALUES
        ('Corolla', 1),
        ('Onix', 2),
        ('Gol', 3);
    `);
    console.log('Inserido dados de marca')
  const [ucount] = await pool.query('SELECT COUNT(*) AS total_usuarios FROM usuario')
  console.log(`result de ucount ${JSON.stringify(ucount)}`);
    await pool.query(`
      INSERT INTO usuario (username, senha, nome_completo) VALUES
      ('admin','admin','admin')
      `)
  }
  console.log('Banco de dados criado ')
  console.log('Criando as procidures')
  const procedureFilePath = './sqls/procedure/procedure_users.sql';
  try {
        const createProcedureSql = await fs.readFile(procedureFilePath, 'utf8');
        await pool.query(createProcedureSql);
        console.log('Procedure carregada do arquivo e criada.');
    } catch (error) {
        console.error(`Erro ao carregar ou executar a procedure do arquivo ${procedureFilePath}:`, error.message);
        throw error;
    }
  console.log('Criando as views')
  const viewFilePath = './sqls/views/views_users.sql'
  try {
      const createViews = await fs.readFile(viewFilePath, 'utf-8')
      await pool.query(createViews);
      console.log('View carregada do arquivo e criada')
  }catch(err){
    console.error(`Error ao carregar ou executar a view do arquivo ${procedureFilePath}:`, err.message)
  }
}
