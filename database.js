require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function criarTabelas() {
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios  (
      id_usuario serial primary key,
      nome       varchar(100),
      email      varchar(50),
      senha      varchar(255) NOT NULL,
      perfil     varchar(20) NOT NULL CHECK (perfil IN ('ADMIN', 'OPERADOR')),
      criado_em  date DEFAULT CURRENT_DATE
);

    `);
    console.log("Tabela de usuarios criada com sucesso!");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS turmas (
    id_turma        serial primary key,
    nome_curso      varchar(50),
    modulo_serie    varchar(100),
    periodo         varchar(10),
    status SMALLINT DEFAULT 1 CHECK (status IN (0, 1)),
    criado_em date DEFAULT CURRENT_DATE
);
    `);
        console.log('Tabela de turmas criada com sucesso!');

        await pool.query(`
    CREATE TABLE IF NOT EXISTS doacoes (
     id_doacoes        serial primary key,
     id_turma          int references turmas(id_turma),
     id_usuario        int references usuarios(id_usuario),
     quantidade        int,
     data_registro date DEFAULT CURRENT_DATE
        );
    `);
        console.log('Tabela de doações criada com sucesso!');

        await pool.query(`
    CREATE TABLE IF NOT EXISTS configuracoes  (
    id_configuracoes    INT primary key DEFAULT 1 CHECK (id_configuracoes = 1),
    meta_global         int NOT NULL,
    ano_edicao          int NOT NULL
);
    `);
        console.log('Tabela de configurações criada com sucesso!');


  } catch (erro) {
    console.error("Erro ao criar a tabela:", erro);
  }
}

criarTabelas();

module.exports = pool;