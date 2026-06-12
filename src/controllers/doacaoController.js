const doacaoModel = require('../models/doacaoModel');

exports.getDoacoes = async (req, res) => {
    try {
        const doacoes = await doacaoModel.findAll();
        res.json(doacoes);
    } catch (err) {
        res.status(500).json({ error: 'Erro interno ao buscar doações' });
    }
};

exports.getDoacaoById = async (req, res) => {
    const { id } = req.params;
    try {
        const doacao = await doacaoModel.findById(id);
        if (!doacao) return res.status(404).json({ error: 'Doação não encontrada' });
        res.json(doacao);
    } catch (err) {
        res.status(500).json({ error: 'Erro interno ao buscar doação' });
    }
};

exports.createDoacao = async (req, res) => {
    const { id_turma, id_usuario, quantidade } = req.body;
    
    if (!id_turma || !id_usuario || !quantidade) {
        return res.status(400).json({ error: "Todos os campos da doação são obrigatórios" });
    }
    try {
        const newDoacao = await doacaoModel.create(id_turma, id_usuario, quantidade);
        res.status(201).json(newDoacao);
    } catch (err) {
        console.error("Erro no createDoacao:", err); 
        
        res.status(500).json({ error: "Erro interno ao criar doação" });
    }
};

exports.updateDoacao = async (req, res) => {
    const { id } = req.params;
    const { id_turma, id_usuario, quantidade } = req.body;
    try {
        const updated = await doacaoModel.update(id, id_turma, id_usuario, quantidade);
        if (!updated) return res.status(404).json({ error: 'Doação não encontrada.' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Erro interno ao atualizar doação' });
    }
};

exports.deleteDoacao = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await doacaoModel.delete(id);
        if (!deleted) return res.status(404).json({ error: "Doação não encontrada" });
        res.json({ message: "Doação removida com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro interno ao deletar doação" });
    }
};