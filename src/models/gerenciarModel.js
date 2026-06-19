const pool = require('../config/db');

exports.findAll = async () => {
    const text = 'SELECT id_configuracoes, meta_global, ano_edicao FROM configuracoes ORDER BY id_configuracoes';
    const result = await pool.query(text);
    return result.rows;
};

exports.findById = async (id) => {
    // CORREÇÃO: Removida a vírgula órfã que estava antes de 'meta_global'
    const text = 'SELECT id_configuracoes, meta_global, ano_edicao FROM configuracoes WHERE id_configuracoes = $1';
    const result = await pool.query(text, [id]);
    return result.rows[0] || null;
};

exports.create = async (meta_global, ano_edicao) => {
    // Mantemos limpo sem passar ID, o Postgres SERIAL vai gerar sozinho com base no setval que rodamos acima
    const text = 'INSERT INTO configuracoes (meta_global, ano_edicao) VALUES ($1, $2) RETURNING *';
    const values = [meta_global, ano_edicao];
    const result = await pool.query(text, values);
    return result.rows[0] || null;
};

exports.update = async (id, meta_global, ano_edicao) => {
    const text = 'UPDATE configuracoes SET meta_global = $1, ano_edicao = $2 WHERE id_configuracoes = $3 RETURNING *';
    const values = [meta_global, ano_edicao, id];
    const result = await pool.query(text, values);
    return result.rows[0] || null;
};

exports.delete = async (id) => {
    const text = 'DELETE FROM configuracoes WHERE id_configuracoes = $1 RETURNING *';
    const result = await pool.query(text, [id]);
    return result.rows[0] || null;
};