const TotalVoiceService = require('../services/totalvoice');

/**
 * SMS Controller
 * @class SMSController
 */
class SMSController {
    constructor() { }

    /**
     * Post method
     * @param {{}} request
     * @param {{}} response
     * @memberof SMSController
     */
    post(request, response) {
        const targetPhone = request.body.targetPhone;
        const message = request.body.message;
        const accessToken = request.body.accessToken;

        const totalVoiceService = new TotalVoiceService(accessToken);
        totalVoiceService.sendSMS(targetPhone, message).then(() => {
            response.status(200).send({success: true, message: 'SMS Sent'});
        }, (statusCode) => {
            if(statusCode == 403)
                response.status(401).send({success: false, message: 'Invalid access token'});
            else if(statusCode == 405)
                response.status(400).send({success: false, message: 'Invalid parameters'});
            else
                response.status(500).send({success: false, message: 'Error sending SMS'});
        });
    }
}

module.exports = new SMSController();
