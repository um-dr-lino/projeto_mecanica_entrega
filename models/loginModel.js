import { User } from './User.js';

export const loginModel = {
    async findByUsername(username) {
        return await User.findOne({ where: { username } });
    },
    async getAll() {
        return await User.findAll();
    },
    async createUser(username, senha, nome_completo) {
        return await User.create({ username, senha, nome_completo });
    },
    async deleteUser(id) {
        return await User.destroy({ where: { id_usuario: id } });
    },
    async updateUser(id, dados) {
        return await User.update(dados, { where: { id_usuario: id } });
    }
};
