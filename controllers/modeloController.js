import { modeloService } from "../services/modeloService.js";
import { Veiculo } from "../models/Veiculo.js";
import { Modelo } from "../models/Modelo.js";

export const modeloController = {
  async getAll(req, res) {
    try {
      const items = await modeloService.getAll();
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await modeloService.create(req.body);
      res.json({ message: "Modelo criado!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await modeloService.update(id, req.body);
      res.json({ message: "Modelo atualizado!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

async delete(req, res) {
    try {
      const { id } = req.params;

      const modelo = await Modelo.findByPk(id);
      if (!modelo) {
        return res.status(404).json({ message: "Modelo não encontrado" });
      }

      const count = await Veiculo.count({
        where: { id_modelo: id }
      });

      if (count > 0) {
        return res.status(400).json({
          error: "Não é possível remover: existem veículos vinculados a este modelo."
        });
      }

      await modeloService.delete(id);

      res.json({ message: "Modelo removido!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};
