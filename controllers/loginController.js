import { loginService } from '../services/loginService.js'; 

export const loginController = {
    async login(req, res) {
        const { username, senha } = req.body || {};
        if (!username || !senha){
            return res.status(403).json({status: 403, message: "Forbidden - User and password are required"})
        }
        const result = await loginService.login(username, senha);

        if (result.status !== 200){
            return res.status(result.status).json({
                auth: false, 
                message: result.message
            });
        }else{
            return res.status(200).json({
                auth:true,
                token: result.token,
                user:result.user
            })
        }
    }
};
