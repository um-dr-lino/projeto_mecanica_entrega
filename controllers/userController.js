import { userService } from "../services/userService.js";

export const userController = {
  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await userService.create(req.body);
      res.json({ message: "Usuário criado com sucesso!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await userService.update(id, req.body);
      res.json({ message: "Usuário atualizado!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await userService.delete(id);
      res.json({ message: "Usuário removido!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
