import { PecaModel } from '../models/pecaModel.js';

export const PecaService = {
  async listar() {
    return await PecaModel.getAll();
  },

  async buscarPorId(id) {
    const peca = await PecaModel.getById(id);
    if (!peca) throw new Error('Peça não encontrada');
    return peca;
  },

  async criar(dados) {
    if (!dados.nome_peca) throw new Error('Nome da peça é obrigatório');
    return await PecaModel.create(dados);
  },

  async atualizar(id, dados) {
    const existente = await PecaModel.getById(id);
    if (!existente) throw new Error('Peça não encontrada');
    return await PecaModel.update(id, dados);
  },

  async deletar(id) {
    const existente = await PecaModel.getById(id);
    if (!existente) throw new Error('Peça não encontrada');
    return await PecaModel.delete(id);
  },

  async buscarPorNome(nome) {
    if (!nome) throw new Error('Informe o nome para busca');
    return await PecaModel.searchByName(nome);
  },
};
