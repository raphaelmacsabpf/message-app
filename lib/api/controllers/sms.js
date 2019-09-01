const TotalVoiceService = require('../services/totalvoice');

class SMSController {
    constructor() {
        this.totalVoiceService = new TotalVoiceService('7e82cdf1d8c8fd44b553c5b0e760ca05');
    }

    post(req, res) {
        const targetPhone = req.body.targetPhone;
        const message = req.body.message;

        this.totalVoiceService.sendSMS(targetPhone, message).then(() => {
            res.status(200).send({success: true, message: 'SMS Sent'});
        }, () => {
            res.status(500).send({success: false, message: 'Error sending SMS'});
        });
    }
}

module.exports = new SMSController();