import { Proprietario } from "../models/Proprietario.js";

export const proprietarioService = {
  async getAll() {
    return await Proprietario.findAll();
  },

  async create(cpf, nome, fone) {
    return await Proprietario.create({
      cpf,
      nome,
      fone
    });
  },

  async delete(id) {
    return await Proprietario.destroy({ where: { id_proprietario: id } });
  },

  async update(id, dados) {
    return await Proprietario.update(dados, { where: { id_proprietario: id } });
  }
};
