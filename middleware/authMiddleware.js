import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET; 

export const verificaJWT = (req, res, next) => {

    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ auth: false, message: "Acesso negado: Nenhum token fornecido." });
    }

    jwt.verify(token, SECRET, (err, decoded) =>{
        if(err){
            return res.status(401).json({auth: false, message: "Token inválido ou expirado"})
        }
        req.userId = decoded.id
        next();
    })   
};