const eventS = require("../../models/event/eventSummary");
const { seque } = require('../../config/db');

class EventSummaryController{
    async getEventSummary(req,res){
        try {
            const env = await eventS.findOne({
                attributes: ['nb_event','increase'],
            });
            res.status(200).json(env);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getStatEvent(req,res){
        try {
            const query = `
            SELECT 
            mois.mois,
            COALESCE(nb.nombre, 0) AS nombre
        FROM 
            (SELECT generate_series(1, 12) AS mois) AS mois
        LEFT JOIN
            (SELECT COUNT(*) AS nombre, EXTRACT('month' FROM dateheureEvenement) AS nb_mois
             FROM evenement
             WHERE EXTRACT('year' FROM dateheureEvenement) = ?
             GROUP BY EXTRACT('month' FROM dateheureEvenement)) AS nb
        ON mois.mois = nb.nb_mois
        ORDER BY mois.mois;
            `;
        const rep = await seque.query(query, { replacements: [req.params.year], type: seque.QueryTypes.SELECT });
        res.status(200).json(rep);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getYears(req, res) {
        try {
            const query = `SELECT EXTRACT('year' FROM dateheureEvenement) as year
                           FROM evenement
                           GROUP BY EXTRACT('year' FROM dateheureEvenement)`;
            const rep = await seque.query(query, { type: seque.QueryTypes.SELECT });
            const year = rep.map(item => item.year);
            res.status(200).json(year);
        } catch (error) {
            res.status(500).send(error);
        }
    } 
}

module.exports = new EventSummaryController();