const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_padrao_para_desenvolvimento';

exports.verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ error: 'Nenhum token fornecido' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token mal formatado' });
    }

    try {
        const decodificado = jwt.verify(token, JWT_SECRET);

        req.usuarioId = decodificado.id_usuario;
        
        next();
    } catch (err) {
        console.error('Erro na validação do token:', err);
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};