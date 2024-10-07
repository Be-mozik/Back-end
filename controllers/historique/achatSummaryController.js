const { types } = require('pg');
const { seque } = require('../../config/db');
const achatS = require("../../models/historique/achatSummary");

class AchatSummary{
    async getAchatSummary(req,res){
        try {
            const rep = await achatS.findOne({
                attributes: ['nb_achat','increase'],
            });
            res.status(200).json(rep);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getAchatSummaryGraph1(req, res) {
        try {
            const query = `
                SELECT 
                    mois.mois,
                    COALESCE(SUM(achat.montant), 0) AS montant_total
                FROM 
                    (SELECT generate_series(1, 12) AS mois) AS mois
                LEFT JOIN 
                    (SELECT montant, extract('month' from datetransaction) AS mois_achat
                     FROM achat 
                     WHERE extract('year' from datetransaction) = ?) AS achat
                ON mois.mois = achat.mois_achat
                GROUP BY mois.mois
                ORDER BY mois.mois;
            `;
            const rep = await seque.query(query, { replacements: [req.params.year], type: seque.QueryTypes.SELECT });
            res.status(200).json(rep);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Erreur lors de la récupération des données', error });
        }
    }

    async getYears(req, res) {
        try {
            const query = `SELECT EXTRACT('year' FROM datetransaction) as year
                           FROM achat
                           GROUP BY EXTRACT('year' FROM datetransaction)`;
            const rep = await seque.query(query, { type: seque.QueryTypes.SELECT });
            const year = rep.map(item => item.year);
            res.status(200).json(year);
        } catch (error) {
            res.status(500).send(error);
        }
    }  
}

module.exports = new AchatSummary();