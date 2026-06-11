require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'gincana_solidaria', // Nome diferente!
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function criarTabelas() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios  (
     id_usuario serial primary key,
    nome varchar(100),
    email varchar(50),
    senha varchar(255) NOT NULL,
    perfil varchar(20) NOT NULL CHECK (perfil IN ('ADMIN', 'OPERADOR')),
    criado_em date DEFAULT CURRENT_DATE
);

    `);
    console.log("Tabela de usuarios criada com sucesso!");
  } catch (erro) {
    console.error("Erro ao criar a tabela:", erro);
  }
}

criarTabelas();
