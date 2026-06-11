const pool = require('../config/db');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM turmas ORDER BY id_turma'
  );

  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM turmas WHERE id_turma = $1',
    [id]
  );

  return result.rows[0];
}

async function criar(dados) {
  const { nome_curso, modulo_serie, periodo, status } = dados;

  const sql = `
    INSERT INTO turmas (nome_curso, modulo_serie, periodo, status)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const result = await pool.query(
    sql,
    [nome_curso, modulo_serie, periodo, status]
  );

  return result.rows[0];
}

async function atualizar(id, dados) {
  const { nome_curso, modulo_serie, periodo, status } = dados;

  const sql = `
    UPDATE turmas
    SET nome_curso = $1, modulo_serie = $2, periodo = $3, status = $4
    WHERE id_turma = $5
    RETURNING *
  `;

  const result = await pool.query(
    sql,
    [nome_curso, modulo_serie, periodo, status, id]
  );

  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM turmas WHERE id_turma = $1',
    [id]
  );

  return result.rowCount > 0;
}

async function buscarPorNomeCurso(nome_curso) {
  const sql = 'SELECT * FROM turmas WHERE nome_curso ILIKE $1';

  const result = await pool.query(
    sql,
    [`%${nome_curso}%`]
  );

  return result.rows;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorNomeCurso
};