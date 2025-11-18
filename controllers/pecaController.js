import { PecaService } from '../services/pecaService.js';

export const PecaController = {
  async listar(req, res) {
    try {
      const pecas = await PecaService.listar();
      res.json(pecas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const peca = await PecaService.buscarPorId(req.params.id);
      res.json(peca);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async criar(req, res) {
    try {
      const novaPeca = await PecaService.criar(req.body);
      res.status(201).json(novaPeca);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const pecaAtualizada = await PecaService.atualizar(req.params.id, req.body);
      res.json(pecaAtualizada);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const msg = await PecaService.deletar(req.params.id);
      res.json(msg);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async buscarPorNome(req, res) {
    try {
      const resultado = await PecaService.buscarPorNome(req.query.nome);
      res.json(resultado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
