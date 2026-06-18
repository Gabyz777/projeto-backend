const pool = require('../config/db');

exports.getRankingGincana = async () => {
    const query = 'SELECT * FROM Vw_ranking_turmas ORDER BY classificacao ASC;';
    const result = await pool.query(query);
    return result.rows;
};