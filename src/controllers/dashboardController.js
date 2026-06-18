const dashboardModel = require('../models/dashboardModel');

exports.getRanking = async (req, res) => {
    try {   
        const ranking = await dashboardModel.getRankingGincana();
        res.status(200).json(ranking);
    } catch (err) {
        console.error("Erro ao buscar o ranking do dashboard:", err);
        res.status(500).json({ error: "Erro interno ao gerar o dashboard" });
    }
};