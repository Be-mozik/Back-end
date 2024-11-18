const { evenement } = require("../../models/event/event");
const v_event = require("../../models/event/v_event");
const { utilisateur } = require("../../models/utilisateur/utilisateur");
const billet = require("../../controllers/billet/billetController");
const info = require("../../controllers/infoline/infolineController");
const eventEtat = require('../../models/eventEtat/eventEtat'); 
const moment = require('moment-timezone');
const multer = require('multer');
const path = require('path');
const clients = require("../../models/clients/clients");
const sendEmail = require("../../services/sendMail");
const {formatEventDateTime} = require("../../services/formatDate");

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

class EventController{

    async getAllEvent(req,res){
        try {
            const events = await v_event.findAll({ order: [['dateheureevenement', 'DESC']] });
            res.json(events);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async getEventById(req,res){
        try {
            const event = await v_event.findByPk(req.params.idEvent);
            res.json(event);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getDetailEvent(idevent){
        try {
            const event = await v_event.findByPk(idevent);
            return event;
        } catch (error) {
            throw error;
        }
    }

    async createEvent(req, res) {
        upload.single('photo')(req, res, async (err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error uploading file' });
            }
            try {
                const { idutilisateur, nomevenement, dateheureevenement, lieuevenement, descrievenement, b, i } = req.body;
                const imgevenement = req.file ? req.file.filename : null;
                const user = await utilisateur.findByPk(idutilisateur);
                if (!user) {
                    return res.status(400).json({ message: 'Erreur: Utilisateur non trouvé' });
                }
                const dateheure = moment(dateheureevenement).tz('Asia/Baghdad').format('YYYY-MM-DD HH:mm:ss');
                const event = await evenement.create({
                    idutilisateur: idutilisateur,
                    nomevenement: nomevenement,
                    dateheureevenement: dateheure,
                    lieuevenement: lieuevenement,
                    descrievenement: descrievenement,
                    imgevenement: imgevenement
                });
                await eventEtat.create({
                    idevenement: event.idevenement,
                    idetat: 1
                });
                const { date, time } = formatEventDateTime(dateheureevenement);
                
                const billets = typeof b === 'string' ? JSON.parse(b) : b;
                const infos = typeof i === 'string' ? JSON.parse(i) : i;
                for( const billetData of billets){
                    await billet.createBillet(event.idevenement,billetData.nombillet,billetData.tarifbillet,billetData.devis,billetData.nombrebillet);
                }
                for( const infoData of infos ){
                    await info.createInfo(event.idevenement,infoData.numeroinfo,infoData.nominfo);
                }
                const emailClients = await clients.findAll({
                    attributes: ['mailclient'],
                });
                const imageUrl = `http://localhost:5000/uploads/${imgevenement}`;
                res.status(200).json(event);
                setImmediate(async () => {
                    try {
                        const emailPromises = emailClients.map((email) => {
                            if (!email.mailclient || email.mailclient.trim() === '') {
                                return Promise.resolve();
                            }
                            return sendEmail({
                                to: email.mailclient,
                                subject: `Invitation à l'événement ${event.nomevenement}`,
                                html: `
                            <p>Nous avons le plaisir de vous inviter à assister à l'événement <strong>${event.nomevenement}</strong> !</p>
                            
                            <p>Voici les détails de l'événement :</p>
                            <ul>
                                <li><strong>Date et Heure :</strong> ${date} à ${time}</li>
                                <li><strong>Lieu :</strong> ${event.lieuevenement}</li>
                                <li><strong>Description :</strong> ${event.descrievenement}</li>
                            </ul>
                            
                            <p>Ne manquez pas cette occasion de rejoindre cet événement passionnant. Nous serions ravis de vous y voir !</p>
                            
                            <p>Pour acheter des billets ou obtenir plus d'informations, veuillez visiter notre site ou nous contacter directement.</p>
                            
                            <p>Cordialement,</p>
                            <p><strong>Équipe Be Mozik</strong></p>
                        `,
                                fromName: 'Be Mozik',
                                attachments: [
                                    {
                                      filename: event.imgevenement,
                                      path: imageUrl,
                                      cid: 'eventImage'
                                    }
                                  ]
                            });
                        });
                        await Promise.all(emailPromises);
                    } catch (error) {
                        console.error('Erreur lors de l\'envoi des e-mails:', error);
                    }
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'événement' });
            }
        });
    }

    async updateEvent(req,res){
        upload.single('photo')(req, res, async (err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'Error uploading file' });
            }
        try {
            const { idevenement,nomevenement,dateheureevenement,lieuevenement,descrievenement,b,i } = req.body;
            const imgevenement = req.file ? req.file.filename : null;
            const event = await evenement.findByPk(idevenement);
            if(!event){
                return res.status(400).send({message: 'Evenement inconnu.'});
            }
            await event.update({
                nomevenement: nomevenement,
                dateheureevenement: dateheureevenement,
                lieuevenement: lieuevenement,
                descrievenement: descrievenement,
                imgevenement: imgevenement
            });
            const imageUrl = `http://localhost:5000/uploads/${imgevenement}`;
            await billet.deleteBilletByEvent(idevenement);
            await info.deleteInfoByEvent(idevenement);
            const billets = typeof b === 'string' ? JSON.parse(b) : b;
            const infos = typeof i === 'string' ? JSON.parse(i) : i;
            for( const billetData of billets){
                await billet.createBillet(event.idevenement,billetData.nombillet,billetData.tarifbillet,billetData.devis,billetData.nombrebillet);
            }
            for( const infoData of infos ){
                await info.createInfo(event.idevenement,infoData.numeroinfo,infoData.nominfo);
            }
            const emailClients = await clients.findAll({
                attributes: ['mailclient'],
            });
            res.status(200).send({success: `Evenement ${event.nomevenement} modifié.`});
            setImmediate(async () => {
                try {
                    const emailPromises = emailClients.map((email) => {
                        if (!email.mailclient || email.mailclient.trim() === '') {
                            return Promise.resolve();
                        }
                        return sendEmail({
                            to: email.mailclient,
                            subject: `Mise à jour de l'événement ${nomevenement}`,
                            html: `
                                <p>Nous vous informons que les détails de l'événement <strong>${nomevenement}</strong> ont été mis à jour. Nous vous invitons à consulter les nouvelles informations sur notre site pour ne rien manquer.</p>
                                <p>Nous nous excusons pour tout inconvénient que cela pourrait causer et restons disponibles pour répondre à toutes vos questions.</p>
                                <p>N'hésitez pas à nous contacter si vous avez besoin de plus d'informations.</p>
                                <p>Cordialement,</p>
                                <p><strong>Équipe Be Mozik</strong></p>
                            `,
                            fromName: 'Be Mozik',
                            attachments: [
                                {
                                  filename: imgevenement,
                                  path: imageUrl,
                                  cid: 'eventImage'
                                }
                              ]
                        });
                    });
                    await Promise.all(emailPromises);
                } catch (error) {
                    console.error('Erreur lors de l\'envoi des e-mails:', error);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({message: 'Erreur lors de la mise à jour de l\'événement: ',error});
        }
        });
    }
    
    async deleteEvenement(req,res){
        try {
            const event = await evenement.findByPk(req.params.idEvent);
            if(!event){
                return res.status(404).send({message: "Evenement inconnu."});
            }
            await evenement.destroy({
                where: {idevenement: event.idevenement}
            });
            res.status(200).send({success: 'Evenement supprimé'});
        } catch (error) {
            res.status(400).send(error);
        }
    }

async annulerEvent(req, res) {
    try {
        const event = await evenement.findByPk(req.params.idEvent);
        const etat = await eventEtat.findOne({
            where: { idevenement: req.params.idEvent },
        });

        if (!event) {
            return res.status(400).send({ message: "Événement inconnu." });
        }

        await event.update({ estvalide: false });
        await etat.update({ idetat: 2 });

        const emailClients = await clients.findAll({
            attributes: ['mailclient'],
        });
        const imageUrl = `http://localhost:5000/uploads/${event.imgevenement}`;
        res.status(200).send({ success: 'Événement annulé et notifications envoyées.' });
        setImmediate(async () => {
            try {
                const emailPromises = emailClients.map((email) => {
                    if (!email.mailclient || email.mailclient.trim() === '') {
                        return Promise.resolve();
                    }
                    return sendEmail({
                        to: email.mailclient,
                        subject: `Annulation de l'événement ${event.nomevenement}`,
                        html: `
                        <p>Pour des raisons indépendantes de notre volonté, nous avons le regret de vous informer que l'événement <strong>${event.nomevenement}</strong> est annulé. Nous vous prions de nous excuser pour tout désagrément que cela pourrait occasionner.</p>
                        <p>Si vous avez déjà effectué un achat pour cet événement, veuillez nous contacter pour discuter des possibilités de remboursement.</p>
                        <p>N'hésitez pas à nous contacter si vous avez des questions ou besoin de plus d'informations.</p>
                        <p>Cordialement,</p>
                        <p><strong>Équipe Be Mozik</strong></p>
                    `,
                        fromName: 'Be Mozik',
                        attachments: [
                            {
                              filename: event.imgevenement,
                              path: imageUrl,
                              cid: 'eventImage'
                            }
                          ]
                    });
                });
                await Promise.all(emailPromises);
            } catch (error) {
                console.error('Erreur lors de l\'envoi des e-mails:', error);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: 'Une erreur est survenue lors de l\'annulation de l\'événement.' });
    }
}
    

    async checkEvent(idevent) {
        try {
            const event = await evenement.findByPk(idevent);
            const [day, month, year] = event.dateheureevenement.split(' ')[0].split('-');
            const time = event.dateheureevenement.split(' ')[1];
            const eventDate = `${year}-${month}-${day}T${time}`;
            const avenir = Date.now() < new Date(eventDate).getTime();
            return event && avenir && event.estvalide;
        } catch (error) {
            throw error;
        }
    }

    async getEventValide(req, res) {
        try {
            const evenement = await v_event.findAll({
                where: { idetat: 1 },
                order: [['dateheureevenement', 'DESC']] 
            });
            res.json(evenement);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Erreur interne du serveur", error: error.message });
        }
    }
    
}

module.exports = new EventController();