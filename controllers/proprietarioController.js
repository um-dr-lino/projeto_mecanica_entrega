import { proprietarioService } from "../services/proprietarioService.js";
import { Veiculo } from "../models/Veiculo.js";

export const proprietarioController = {
  async getAll(req, res) {
    try {
      const items = await proprietarioService.getAll();
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { cpf = null, nome = null, fone = null } = req.body;
      console.log("Dados recebidos para criar proprietário:", req.body);
      if (!cpf || !nome || !fone) {
        return res.status(400).json({ error: "Campos 'cpf', 'nome' e 'fone' são obrigatórios" });
      }
      await proprietarioService.create(cpf, nome, fone);

      res.json({ message: "Proprietário criado!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await proprietarioService.update(id, req.body);
      res.json({ message: "Proprietário atualizado!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
async delete(req, res) {
  try {
    const { id } = req.params;

    const count = await Veiculo.count({
      where: { id_proprietario: id }
    });

    if (count > 0) {
      return res.status(400).json({
        error: "Não é possível remover: o proprietário possui veículos cadastrados."
      });
    }

    await proprietarioService.delete(id);

    res.json({ message: "Proprietário removido!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

};
