const historique = require("../../models/historique/historique");
const event = require('../event/evenementController');
const billet = require('../billet/billetController');
const ct = require('../../models/clients/clients');
const moment = require('moment-timezone');
const QRCode = require('qrcode');
const path = require('path');
const { PDFDocument,rgb,StandardFonts } = require('pdf-lib');
const fs = require('fs');
const fontkit = require('@pdf-lib/fontkit');
const v_historique_client = require("../../models/historique/v_histo_client");

class HistoriqueController {

    async achatBillet(req, res) {
        try {
            const { idclient, idevenement, idbillet, nombre } = req.body;
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
            const dateheure = moment().tz('Asia/Baghdad').toDate();
            const eve = await event.getDetailEvent(idevenement);
            const histo = await historique.create({
                idclient,
                idevenement,
                idbillet,
                nombre,
                montant,
                datetransaction: dateheure
            });
            const qrBuffer = await QRCode.toBuffer(histo.tokenachat, {
                errorCorrectionLevel: 'H',
                margin: 1,
            });

            const uploadsFont = path.join(__dirname, '..', '..', 'fonts', 'Cinematografica-Bold-trial.ttf');
            const fontBytes = fs.readFileSync(uploadsFont);
            const uploadsDir = path.join(__dirname, '..', '..', 'assets', 'ticket.jpg');

            if (!fs.existsSync(uploadsDir)) {
                return res.status(500).send({ error: "Image non trouvée." });
            }
            
            const imageBuffer = fs.readFileSync(uploadsDir);                
            const pdfDoc = await PDFDocument.create();
            pdfDoc.registerFontkit(fontkit);
            const fontDate = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const font = await pdfDoc.embedFont(fontBytes);
            const page = pdfDoc.addPage([2500,1250]);

            const backgroundImage = await pdfDoc.embedJpg(imageBuffer);            
            const { width, height } = page.getSize();

            page.drawImage(backgroundImage, {
                x: 0,
                y: 0,
                width,
                height,
            });

            page.drawText(eve.nomevenement,{
                x: 100,
                y: 300,
                font: font,
                size: 200,
                color: rgb(1,1,1)
            });

            page.drawText (eve.dateheureevenement,{
                x:100,
                y:250,
                font: fontDate,
                size: 50,
                color: rgb(1,1,1)
            });

            const qrImage = await pdfDoc.embedPng(qrBuffer);
            const qrSize = 700;
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
            const achat = await v_historique_client.findAll({
                where: {idclient: req.params.idclient},
                attributes: ['idclient','idevenement','nomevenement','nombillet','nombre','montant','nomdevis','datetransaction'],
                order: [['datetransaction', 'DESC']]
            });
            res.status(200).json(achat);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = new HistoriqueController();
