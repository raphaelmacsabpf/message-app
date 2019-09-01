const TotalVoiceHttp = require('totalvoice-http').TotalVoiceHttp;

class TotalVoiceService {
    constructor(accessToken) { 
        this.http = new TotalVoiceHttp('api.totalvoice.com.br', 443, accessToken);
    }
    
    sendSMS(targetPhone, message) {
        const sendSMSBody = {
            'numero_destino': targetPhone,
            'mensagem': message
        }
        
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