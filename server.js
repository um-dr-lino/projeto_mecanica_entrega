import express from 'express';
import { initDb } from './config/sequelize.js';
import { User } from './models/User.js';
import loginRoutes from './routes/loginRoutes.js';
import Proprietario from './models/Proprietario.js';
import TipoVeiculo from './models/TipoVeiculo.js';
import Veiculo from './models/Veiculo.js';
import './models/associations.js';

const app = express();
app.use(express.json());
app.use('/auth', loginRoutes);

async function seedDatabase() {
  try {
    console.log('\nInserindo dados iniciais...\n');

    const userCount = await User.count();
    if (userCount === 0) {
      await User.create({
        username: 'admin',
        senha: 'admin',
        nome_completo: 'Administrador'
      });
      console.log('Usuário criado: admin');
    }

    const tipoCount = await TipoVeiculo.count();
    if (tipoCount === 0) {
      const tipos = [
        { id_tipo: 1, tipo: 'popular' },
        { id_tipo: 2, tipo: 'luxo' },
        { id_tipo: 3, tipo: 'Super Luxo' }
      ];
      await TipoVeiculo.bulkCreate(tipos);
      console.log('Tipos de veículo inseridos: 3 tipos');
    }
    const proprietarioCount = await Proprietario.count();
    if (proprietarioCount === 0) {
      const proprietarios = [
        { cpf: 12345678901, nome: 'João Silva', fone: '11999999999' },
        { cpf: 98765432109, nome: 'Maria Santos', fone: '11988888888' },
        { cpf: 55555555555, nome: 'Pedro Oliveira', fone: '11977777777' }
      ];
      await Proprietario.bulkCreate(proprietarios);
      console.log('Proprietários inseridos: 3 proprietários');
    }
    const veiculoCount = await Veiculo.count();
    if (veiculoCount === 0) {
      const veiculos = [
        { placa_veiculo: 'ABC1234', id_proprietario: 1, preco_veiculo: 85000.00, id_tipo: 1, ano: 2020 },
        { placa_veiculo: 'XYZ5678', id_proprietario: 2, preco_veiculo: 90000.00, id_tipo: 1, ano: 2021 },
        { placa_veiculo: 'DEF9012', id_proprietario: 3, preco_veiculo: 75000.00, id_tipo: 2, ano: 2019 }
      ];
      await Veiculo.bulkCreate(veiculos);
      console.log('Veículos inseridos: 3 veículos');
    }
    console.log('\nDados iniciais carregados com sucesso!\n');

  } catch (error) {
    console.error('Erro ao inserir dados iniciais:', error);
  }
}

async function startServer() {
  try {
    await initDb();
    await seedDatabase();
    app.get('/users', async (req, res) => {
      const users = await User.findAll();
      res.json(users);
    });
    app.post('/users', async (req, res) => {
      const user = await User.create(req.body);
      res.json(user);
    });
    app.delete('/users/:id', async (req, res) => {
      await User.destroy({ where: { id: req.params.id } });
      res.json({ message: 'Deletado com sucesso' });
    });
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
}

startServer();
