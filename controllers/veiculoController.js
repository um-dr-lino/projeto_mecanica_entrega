import { veiculoService } from "../services/veiculoService.js";
import TipoVeiculo from "../models/TipoVeiculo.js";
import Veiculo from "../models/Veiculo.js";

export const veiculoController = {
  async getAll(req, res) {
    try {
      const items = await veiculoService.getAll();
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async create(req, res) {
    try {
      const preco = Number(req.body.preco_veiculo);

      let nomeTipo;

      if (preco <= 45000) nomeTipo = "popular";
      else if (preco <= 90000) nomeTipo = "luxo";
      else nomeTipo = "Super Luxo";

      const tipo = await TipoVeiculo.findOne({
        where: { tipo: nomeTipo }
      });

      if (!tipo) {
        return res.status(400).json({ error: "Tipo de veículo não encontrado no banco." });
      }

      const novoVeiculo = await Veiculo.create({
        placa_veiculo: req.body.placa_veiculo,
        id_proprietario: req.body.id_proprietario,
        preco_veiculo: preco,
        id_tipo: tipo.id_tipo,   
        ano: req.body.ano
      });

      res.json({
        message: "Veículo criado com sucesso!",
        tipo_veiculo: nomeTipo
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      await veiculoService.update(id, req.body);
      res.json({ message: "Veiculo atualizado!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

async delete(req, res) {
  try {
    const { id } = req.params;
    await veiculoService.delete(id);
    res.json({ message: "Veículo removido!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
};
