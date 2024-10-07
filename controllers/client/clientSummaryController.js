const clientS = require('../../models/clients/clientSummary');

class ClientSummaryController{
    async getClientSummary(req,res){
        try {
            const summary = await clientS.findOne({
                attributes: ['nb_client', 'increase'],
              });
            res.status(200).json(summary);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}

module.exports = new ClientSummaryController();