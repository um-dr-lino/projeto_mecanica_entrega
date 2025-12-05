import jwt from 'jsonwebtoken';
import { loginModel } from '../models/loginModel.js';
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET;

export const loginService = {
    async login(username, senha){
        if (!SECRET) {
            throw new Error("JWT_SECRET não configurado no .env");
        }

        const user = await loginModel.findByUsername(username);

        if (!user) {
            return {status: 404, message: 'Not found - User or Password not found'};
        }

        if (user.senha !== senha) {
            return {status: 401, message: 'Unauthorized'};
        }

        const payload = {
            id: user.id_usuario,
            username: user.username
        };

        const token = jwt.sign(payload, SECRET, { expiresIn: 300 });

        return {
            status: 200,
            user: { id: user.id_usuario, username: user.username },
            token
        };
    }
};
