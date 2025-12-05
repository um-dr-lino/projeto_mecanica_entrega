import fs from 'fs';
import path from 'path';

const caminhoDb = './database.sqlite';

try {
  if (fs.existsSync(caminhoDb)) {
    fs.unlinkSync(caminhoDb);
    console.log('Banco de dados deletado com sucesso!');
  } else {
    console.log('Arquivo database.sqlite não encontrado.');
  }
  process.exit(0);
} catch (error) {
  console.error('Erro ao deletar banco de dados:', error.message);
  process.exit(1);
}
