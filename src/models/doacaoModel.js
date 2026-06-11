const pool = require('../config/db');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM doacoes ORDER BY id_doacoes'
  );

  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM doacoes WHERE id_doacoes = $1',
    [id]
  );

  return result.rows[0];
}

async function criar(dados) {
  const { id_turma, id_usuario, quantidade } = dados;

  const sql = `
    INSERT INTO doacoes (id_turma, id_usuario, quantidade)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const result = await pool.query(
    sql,
    [id_turma, id_usuario, quantidade]
  );

  return result.rows[0];
}

async function atualizar(id, dados) {
  const { id_turma, id_usuario, quantidade } = dados;

  const sql = `
    UPDATE doacoes
    SET id_turma = $1, id_usuario = $2, quantidade = $3
    WHERE id_doacoes = $4
    RETURNING *
  `;

  const result = await pool.query(
    sql,
    [id_turma, id_usuario, quantidade, id]
  );

  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM doacoes WHERE id_doacoes = $1',
    [id]
  );

  return result.rowCount > 0;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};