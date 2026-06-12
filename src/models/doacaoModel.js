const pool = require('../config/db');

exports.findAll = async () => {
    const text = 'SELECT id_doacoes, quantidade, data_registro, id_turma, id_usuario FROM doacoes ORDER BY id_doacoes';
    const result = await pool.query(text);
    return result.rows;
};

exports.findById = async (id) => {
    const text = 'SELECT id_doacoes, quantidade, data_registro, id_turma, id_usuario FROM doacoes WHERE id_doacoes = $1';
    const result = await pool.query(text, [id]);
    return result.rows[0] || null;
};

exports.create = async (id_turma, id_usuario, quantidade) => {
    const text = 'INSERT INTO doacoes (id_turma, id_usuario, quantidade) VALUES ($1, $2, $3) RETURNING *';
    const values = [id_turma, id_usuario, quantidade];
    const result = await pool.query(text, values);
    return result.rows[0] || null;
};

exports.update = async (id, id_turma, id_usuario, quantidade) => {
    const text = 'UPDATE doacoes SET id_turma = $1, id_usuario = $2, quantidade = $3 WHERE id_doacoes = $4 RETURNING *';
    const values = [id_turma, id_usuario, quantidade, id];
    const result = await pool.query(text, values);
    return result.rows[0] || null;
};

exports.delete = async (id) => {
    const text = 'DELETE FROM doacoes WHERE id_doacoes = $1 RETURNING *';
    const result = await pool.query(text, [id]);
    return result.rows[0] || null;
};