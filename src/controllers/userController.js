const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const usuarioExistente = await userModel.findByEmail(email);
        if (usuarioExistente) {
            return res.status(409).json({ error: 'E-mail já cadastrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha, salt);

        const novoUsuario = await userModel.create(nome, email, senhaCriptografada);

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso',
            usuario: novoUsuario
        });
    } catch (err) {
        console.error('Erro no createUser:', err);
        res.status(500).json({ error: 'Erro interno ao cadastrar usuário' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const usuario = await userModel.findById(req.usuarioId); 
        
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(usuario);
    } catch (err) {
        console.error('Erro no getUserProfile:', err);
        res.status(500).json({ error: 'Erro interno ao buscar perfil' });
    }
};