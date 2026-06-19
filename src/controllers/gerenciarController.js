const gerenciarModel = require('../models/gerenciarModel');

exports.getGerenciars = async (req, res) => {
    try {
        const gerenciars = await gerenciarModel.findAll();
        res.json(gerenciars);
    } catch (err) {
        console.error('Erro em getGerenciars:', err);
        res.status(500).json({ error: 'Erro interno ao buscar organizações' });
    }
};

exports.getGerenciarById = async (req, res) => {
    const { id } = req.params;
    try {
        const gerenciar = await gerenciarModel.findById(id);
        if (!gerenciar) {
            return res.status(404).json({ error: 'Organização não encontrada' });
        }
        res.json(gerenciar);
    } catch (err) {
        console.error('Erro em getGerenciarById:', err);
        res.status(500).json({ error: 'Erro interno ao buscar organização' });
    }
};

exports.createGerenciar = async (req, res) => {
    const { nome_ong, categoria, contato } = req.body;

    if (!nome_ong || !categoria || !contato) {
        return res.status(400).json({ error: 'Todos os campos da organização são obrigatórios' });
    }

    try {
        const newGerenciar = await gerenciarModel.create(nome_ong, categoria, contato);
        res.status(201).json(newGerenciar);
    } catch (err) {
        console.error('Erro no createGerenciar:', err);
        res.status(500).json({ error: 'Erro interno ao criar organização' });
    }
};

exports.updateGerenciar = async (req, res) => {
    const { id } = req.params;
    const { nome_ong, categoria, contato } = req.body;

    try {
        const updated = await gerenciarModel.update(id, nome_ong, categoria, contato);
        if (!updated) {
            return res.status(404).json({ error: 'Organização não encontrada' });
        }
        res.json(updated);
    } catch (err) {
        console.error('Erro em updateGerenciar:', err);
        res.status(500).json({ error: 'Erro interno ao atualizar organização' });
    }
};

exports.deleteGerenciar = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await gerenciarModel.delete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Organização não encontrada' });
        }
        res.json({ message: 'Organização removida com sucesso' });
    } catch (err) {
        console.error('Erro em deleteGerenciar:', err);
        res.status(500).json({ error: 'Erro interno ao deletar organização' });
    }
};
