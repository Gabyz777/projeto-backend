const pool = require('../config/db');

exports.findByEmail = async (email) => {
    const text = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await pool.query(text, [email]);
    return result.rows[0] || null;
};

exports.findById = async (id_usuario) => {
    const text = 'SELECT id_usuario, nome, email, criado_em FROM usuarios WHERE id_usuario = $1';
    const result = await pool.query(text, [id_usuario]);
    return result.rows[0] || null;
};

exports.create = async (nome, email, senhaCriptografada) => {
    const text = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id_usuario, nome, email, criado_em';
    const values = [nome, email, senhaCriptografada];
    const result = await pool.query(text, values);
    return result.rows[0] || null;
};