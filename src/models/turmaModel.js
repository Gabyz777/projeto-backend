const pool = require('../config/db');

exports.findAll = async () => {
    const text = 'SELECT id_turma, nome_curso, modulo_serie, periodo, status FROM turmas ORDER BY id_turma';
    const result = await pool.query(text);
    return result.rows;
};

exports.findById = async (id) => {
    const text = 'SELECT id_turma, nome_curso, modulo_serie, periodo, status FROM turmas WHERE id_turma = $1';
    const result = await pool.query(text, [id]);
    return result.rows[0] || null;
};

exports.create = async (nome_curso, modulo_serie, periodo, status = 1) => {
    const text = 'INSERT INTO turmas (nome_curso, modulo_serie, periodo, status) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [nome_curso, modulo_serie, periodo, status];
    const result = await pool.query(text, values);
    return result.rows[0] || null;
};

exports.update = async (id, nome_curso, modulo_serie, periodo, status) => {
    const text = 'UPDATE turmas SET nome_curso = $1, modulo_serie = $2, periodo = $3, status = $4 WHERE id_turma = $5 RETURNING *';
    const values = [nome_curso, modulo_serie, periodo, status, id];
    const result = await pool.query(text, values);
    return result.rows[0] || null;
};

exports.delete = async (id) => {
    const text = 'DELETE FROM turmas WHERE id_turma = $1 RETURNING *';
    const result = await pool.query(text, [id]);
    return result.rows[0] || null;
};