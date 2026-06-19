const configModel = require('../models/configModel');

exports.getConfiguracoes = async (req, res) => {
    try {
        const configuracoes = await configModel.findAll();
        res.json(configuracoes);
    } catch (err) {
        console.error('Erro ao buscar configuracoes: ', err);
        res.status(500).json({ error: 'Erro interno ao buscar configuracoes' });
    }
};

exports.getConfiguracaoById = async (req, res) => {
    const { id } = req.params;
    try {
        const configuracao = await configModel.findById(id);
        if (!configuracao) {
            return res.status(404).json({ error: 'Configuração não encontrada' });
        }
        res.json(configuracao);
    } catch (err) {
        console.error('Erro ao buscar configuração: ', err);
        res.status(500).json({ error: 'Erro interno ao buscar configuração' });
    }
};

exports.createConfiguracao = async (req, res) => {
    const { meta_global, ano_edicao } = req.body;

    if (meta_global === undefined || ano_edicao === undefined) {
        return res.status(400).json({ error: 'Os campos meta_global e ano_edicao são obrigatórios' });
    }

    try {
        const newConfiguracao = await configModel.create(meta_global, ano_edicao);
        res.status(201).json(newConfiguracao);
    } catch (err) {
        console.error('Erro ao criar configuração', err);
        res.status(500).json({ error: 'Erro interno ao criar configuração' });
    }
};

exports.updateConfiguracao = async (req, res) => {
    const { id } = req.params;
    const { meta_global, ano_edicao } = req.body;

    if (meta_global === undefined || ano_edicao === undefined) {
        return res.status(400).json({ error: 'Os campos meta_global e ano_edicao são obrigatórios' });
    }

    try {
        const updated = await configModel.update(id, meta_global, ano_edicao);
        if (!updated) {
            return res.status(404).json({ error: 'Configuração não encontrada' });
        }
        res.json(updated);
    } catch (err) {
        console.error('Erro ao atualizar configuração', err);
        res.status(500).json({ error: 'Erro interno ao atualizar configuração' });
    }
};

exports.deleteConfiguracao = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await configModel.delete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Configuração não encontrada' });
        }
        res.json({ message: 'Configuração removida com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar configuração', err);
        res.status(500).json({ error: 'Erro interno ao deletar configuração' });
    }
};
