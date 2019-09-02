const TotalVoiceHttp = require('totalvoice-http').TotalVoiceHttp;

/**
 * Service that access Totalvoice API
 * @class TotalVoiceService
 */
class TotalVoiceService {
    /**
     *Creates an instance of TotalVoiceService.
     * @param {string} accessToken
     * @memberof TotalVoiceService
     */
    constructor(accessToken) { 
        this.http = new TotalVoiceHttp('api.totalvoice.com.br', 443, accessToken);
    }
    
    /**
     * Send SMS to a phone number
     * @param {string} targetPhone
     * @param {string} message
     * @returns {Promise} Promise representing SMS sending
     * @memberof TotalVoiceService
     */
    sendSMS(targetPhone, message) {
        const sendSMSBody = {
            'numero_destino': targetPhone,
            'mensagem': message
        };
        
        return new Promise((resolve, reject) => {
            this.http.post('/sms', sendSMSBody, (req, res) => {
                if(res.statusCode == 200) {
                    resolve(res.messageBody);
                }
                else {
                    reject(res.statusCode);
                }
            });
        });
    }
}

module.exports = TotalVoiceService;