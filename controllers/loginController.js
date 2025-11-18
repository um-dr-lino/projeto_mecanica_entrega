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
    },
    async listar_usuarios(req, res) {
        try{
            const listagem = await loginService.listar_usuarios()
            res.json(listagem)
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async criarUsuario(req, res) {
        const { username, senha, nome_completo } = req.body;
        if (!username || !senha || !nome_completo) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios (username, senha, nome_completo)." });
        }
        try {
            await loginService.create_new_user(username, senha, nome_completo);
            res.status(201).json({message: "Usuario criado com sucesso!"})       
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return res.status(500).json({ message: error.sqlMessage });
        }
    }
};
