const turmaModel = require('../models/turmaModel');

exports.getTurmas = async (req, res) => {
    try {
        const turmas = await turmaModel.findAll();
        res.json(turmas);
    } catch (err) {
        console.error('Erro ao buscar turmas: ', err);
        res.status(500).json({ error: 'Erro interno ao buscar turmas' });
    }
};

exports.getTurmaById = async (req, res) => {
    const { id } = req.params;
    try {
        const turma = await turmaModel.findById(id);
        if (!turma) return res.status(404).json({ error: 'Turma não encontrada' });
        res.json(turma);
    } catch (err) {
        res.status(500).json({ error: 'Erro interno ao buscar turma' });
    }
};

exports.createTurma = async (req, res) => {
    const { nome_curso, modulo_serie, periodo } = req.body;
    
    if (!nome_curso || !modulo_serie || !periodo) {
        return res.status(400).json({ error: "Os campos nome_curso, modulo_serie e periodo são obrigatórios" });
    }
    
    try {
        const newTurma = await turmaModel.create(nome_curso, modulo_serie, periodo);
        res.status(201).json(newTurma);
    } catch (err) {
        console.error('Erro ao criar turma', err);
        res.status(500).json({ error: "Erro interno ao criar turma" });
    }
};

exports.updateTurma = async (req, res) => {
    const { id } = req.params;
    const { nome_curso, modulo_serie, periodo, status } = req.body;
    
    if (!nome_curso || !modulo_serie || !periodo ) {
        return res.status(400).json({ error: 'Campos incompletos para atualização. nome_curso, modulo_serie e periodo são obrigatórios.' });
    }
    
    try {
        const updated = await turmaModel.update(id, nome_curso, modulo_serie, periodo, status);
        if (!updated) return res.status(404).json({ error: 'Turma não encontrada.' });
        res.json(updated);
    } catch (err) {
        console.error('Erro ao atualizar turma', err);
        res.status(500).json({ error: 'Erro interno ao atualizar turma' });
    }
};

exports.deleteTurma = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await turmaModel.delete(id);
        if (!deleted) return res.status(404).json({ error: "Turma não encontrada" });
        res.json({ message: "Turma removida com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro interno ao deletar turma" });
    }
};