import app from './app.js';
import dotenv from 'dotenv';
import { initDb } from './config/initDb.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initDb();
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  } catch (err) {
    console.error('Erro ao inicializar o banco:', err.message);
    process.exit(1);
  }
}

startServer();