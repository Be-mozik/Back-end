const historique = require("../../models/historique/historique");
const event = require('../event/evenementController');
const billet = require('../billet/billetController');
const ct = require('../../models/clients/clients');
const moment = require('moment-timezone');
const QRCode = require('qrcode');
const path = require('path');
const sharp = require('sharp');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

class HistoriqueController {

    async createHistorique(req, res) {
        try {
            const { idclient, idevenement, idbillet, nombre,datetransaction } = req.body;
            const client = await ct.findByPk(idclient);
            if (!client) {
                return res.status(400).send({ message: "Client introuvable." });
            }
            const valideEvent = await event.checkEvent(idevenement);
            const valideBillet = await billet.checkBillet(idbillet, nombre);
            if (!valideEvent) {
                return res.status(500).send({ error: "Erreur lors de la transaction : l'événement est passé." });
            }
            if (!valideBillet) {
                return res.status(500).send({ error: "Erreur lors de la transaction : nombre de billet restant insuffisant." });
            }
            const montant = await billet.calculMontant(idbillet, nombre);
            const dateheure = moment(Date.now()).tz('Asia/Baghdad').format('DD-MM-YYYY HH:mm:ss');
            const eve = await event.getDetailEvent(idevenement);
            const histo = await historique.create({
                idclient,
                idevenement,
                idbillet,
                nombre,
                montant,
                datetransaction: datetransaction
            });
            const qrBuffer = await QRCode.toBuffer(histo.tokenachat, {
                errorCorrectionLevel: 'H',
                margin: 1,
            });

            const uploadsDir = path.join(__dirname, '..', '..', 'uploads', eve.imgevenement);
            if (!fs.existsSync(uploadsDir)) {
                return res.status(500).send({ error: "Image non trouvée." });
            }
            const blurredImage = await sharp(uploadsDir)
                .blur(10)
                .modulate({ brightness: 0.8, saturation: 0.8 })
                .toBuffer();
                
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([500,600]);

            const backgroundImage = await pdfDoc.embedJpg(blurredImage);
            const { width, height } = page.getSize();

            page.drawImage(backgroundImage, {
                x: 0,
                y: 0,
                width,
                height,
            });

            const qrImage = await pdfDoc.embedPng(qrBuffer);
            const qrSize = 200;
            const qrX = (width - qrSize) / 2; 
            const qrY = (height - qrSize) / 2;

            page.drawImage(qrImage, {
                x: qrX,
                y: qrY,
                width: qrSize,
                height: qrSize,
            });

            const pdfBytes = await pdfDoc.save();
            res.setHeader('Content-Disposition', `attachment; filename="${eve.nomevenement}.pdf"`);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Length', Buffer.byteLength(pdfBytes));
            res.end(pdfBytes);
        } catch (error) {
            console.error(error);
            res.status(500).send("Erreur: " + error.message);
        }
    }

    async getAchatByClient(req,res){
        try {
            const achat = await historique.findAll({
                where: {idclient: req.params.idclient}
            });
            res.status(200).json(achat);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = new HistoriqueController();
