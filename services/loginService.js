import jwt from 'jsonwebtoken'
import { loginModel } from '../models/loginModel.js';

const SECRET = process.env.JWT_SECRET

export const loginService = {
    async login(username, senha){
        const user = await loginModel.findByUsername(username);

        if (!user) {
            return {status: 404, message: 'Not found - User or Password not found'}
        }
        if (user.senha !== senha) return {status: 401, message: 'Unauthorized'}
        
        const payload = {
            id: user.id_usuario, 
            username: user.username
        };
    
    const token = jwt.sign(payload, SECRET, {expiresIn: 300})
    return { status: 200, user: { id: user.id_usuario, username: user.username}, token};

    },
    async listar_usuarios(){
        return await loginModel.getAll();
    },

    async create_new_user(username, password, fullname){
        return await loginModel.createUser(username, password, fullname);
    }
}

