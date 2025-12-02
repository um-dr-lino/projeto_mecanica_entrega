import { User } from "../models/User.js";

export const userService = {
  async findByUsername(username) {
    return await User.findOne({ where: { username } });
  },

  async getAll() {
    return await User.findAll();
  },

  async create(data) {
    return await User.create(data);
  },

  async delete(id) {
    return await User.destroy({ where: { id_usuario: id } });
  },

  async update(id, dados) {
    return await User.update(dados, { where: { id_usuario: id } });
  }
};
