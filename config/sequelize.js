import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: console.log, 
});

export async function initDb() {
  try {
    await sequelize.authenticate();
    console.log('Conexão SQLite bem-sucedida');

    await import('../models/associations.js');

    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas');

  } catch (error) {
    console.error('Erro ao inicializar SQLite:', error);
    throw error;
  }
}
