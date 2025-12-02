import { Veiculo } from "../models/Veiculo.js";
import TipoVeiculo from "../models/TipoVeiculo.js";
import Proprietario from "../models/Proprietario.js";

export const veiculoService = {
  async getAll() {
  return await Veiculo.findAll({
    include: [
      {
        model: TipoVeiculo,
        attributes: ['tipo'] 
      },
      {
        model: Proprietario,
        attributes: ['nome']  
      }
    ]
  });
},

  async create(data) {
    return await Veiculo.create(data);
  },

  async delete(id) {
    return await Veiculo.destroy({ where: { id_veiculo: id } });
  },

  async update(id, dados) {
  if (dados.preco_veiculo) {
    const preco = Number(dados.preco_veiculo);
    let nomeTipo;

    if (preco <= 45000) nomeTipo = "popular";
    else if (preco <= 90000) nomeTipo = "luxo";
    else nomeTipo = "Super Luxo";

    const tipo = await TipoVeiculo.findOne({ where: { tipo: nomeTipo } });

    if (!tipo) {
      throw new Error("Tipo de veículo não encontrado na tabela TipoVeiculo.");
    }

    dados.id_tipo = tipo.id_tipo;
  }

  return await Veiculo.update(dados, { where: { id_veiculo: id } });
}
};
