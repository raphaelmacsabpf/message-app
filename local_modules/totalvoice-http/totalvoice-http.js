const tls = require('tls');
const EventEmitter = require('events');

const Request = require('./request');
const Response = require('./response');

class TotalVoiceHttp extends EventEmitter {
     constructor(hostname, port, accesstoken) { 
          super();
          this.hostname = hostname;
          this.port = port;
          this.accessToken = accesstoken;
     }

     get(route, finishCallback) {
          const httpRequest = new Request('GET', route, {'Access-Token': this.accessToken, 'Host': this.hostname});
          const tlsSocket = tls.connect(this.port, this.hostname, {rejectUnauthorized: false});
          
          tlsSocket.once('secureConnect', () => {
               tlsSocket.write(serializeRequest.call(httpRequest));
               tlsSocket.on('data', (responseData) => {
                    finishCallback(httpRequest, new Response(responseData));
               });
          });
          
          tlsSocket.on('error', () => {
               this.emit('error');
          })
     }
}

function serializeRequest() {
     let serializedHttpRequest = '';
     serializedHttpRequest += `${this.method} ${this.route} HTTP/1.1\r\n`;

     this.headers.forEach((header) => {
         serializedHttpRequest += `${header.key}: ${header.value}\r\n`
     });
     
     serializedHttpRequest += '\r\n';
     serializedHttpRequest += JSON.stringify(this.body);
     
     return serializedHttpRequest;
 }

module.exports = TotalVoiceHttp;