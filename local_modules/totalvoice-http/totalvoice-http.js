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
          sendRequest.call(this, httpRequest, finishCallback);
     }

     post(route, finishCallback) {
          const httpRequest = new Request('POST', route, {'Access-Token': this.accessToken, 'Host': this.hostname});
          sendRequest.call(this, httpRequest, finishCallback);
     }
     
     put(route, finishCallback) {
          const httpRequest = new Request('PUT', route, {'Access-Token': this.accessToken, 'Host': this.hostname});
          sendRequest.call(this, httpRequest, finishCallback);
     }

     delete(route, finishCallback) {
          const httpRequest = new Request('DELETE', route, {'Access-Token': this.accessToken, 'Host': this.hostname});
          sendRequest.call(this, httpRequest, finishCallback);
     }

     options(route, finishCallback) {
          const httpRequest = new Request('OPTIONS', route, {'Access-Token': this.accessToken, 'Host': this.hostname});
          sendRequest.call(this, httpRequest, finishCallback);
     }
}

function sendRequest(request, finishCallback) {
     const tlsSocket = tls.connect(this.port, this.hostname, {rejectUnauthorized: false});
          
     tlsSocket.once('secureConnect', () => {
          tlsSocket.write(serializeRequest.call(request));
          tlsSocket.on('data', (responseData) => {
               finishCallback(request, new Response(responseData));
          });
     });
     
     tlsSocket.on('error', () => {
          this.emit('error');
     });
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