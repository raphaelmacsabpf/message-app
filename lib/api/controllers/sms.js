const TotalVoiceService = require('../services/totalvoice');

/**
 * SMS Controller
 * @class SMSController
 */
class SMSController {
    constructor() {
        this.totalVoiceService = new TotalVoiceService(process.env.ACCESS_TOKEN);
    }

    /**
     * Post method
     * @param {{}} request
     * @param {{}} response
     * @memberof SMSController
     */
    post(request, response) {
        const targetPhone = request.body.targetPhone;
        const message = request.body.message;

        this.totalVoiceService.sendSMS(targetPhone, message).then(() => {
            response.status(200).send({success: true, message: 'SMS Sent'});
        }, () => {
            response.status(500).send({success: false, message: 'Error sending SMS'});
        });
    }
}

module.exports = new SMSController();