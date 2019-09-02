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
          this.defaultHeaders = {
               'Access-Token': this.accessToken, 
               'Host': this.hostname
          };
     }

     get(route, body, finishCallback) {
          const httpRequest = new Request('GET', route, this.defaultHeaders, body);
          sendRequest.call(this, httpRequest, finishCallback);
     }

     post(route, body, finishCallback) {
          const httpRequest = new Request('POST', route, this.defaultHeaders, body);
          sendRequest.call(this, httpRequest, finishCallback);
     }
     
     put(route, body, finishCallback) {
          const httpRequest = new Request('PUT', route, this.defaultHeaders, body);
          sendRequest.call(this, httpRequest, finishCallback);
     }

     delete(route, body, finishCallback) {
          const httpRequest = new Request('DELETE', route, this.defaultHeaders, body);
          sendRequest.call(this, httpRequest, finishCallback);
     }

     options(route, body, finishCallback) {
          const httpRequest = new Request('OPTIONS', route, this.defaultHeaders, body);
          sendRequest.call(this, httpRequest, finishCallback);
     }
}

function sendRequest(request, finishCallback) {
     const tlsSocket = tls.connect(this.port, this.hostname, {rejectUnauthorized: false});
          
     tlsSocket.once('secureConnect', () => {
          const body = JSON.stringify(request.body);
          const bodyLength = body ? body.length : 0;
          
          request.addHeaders({'Content-Length': bodyLength});
          tlsSocket.write(serializeRequest.call(request, body));
          tlsSocket.on('data', (responseData) => {
               finishCallback(request, new Response(responseData));
          });
     });
     
     tlsSocket.on('error', () => {
          this.emit('error');
     });
}

function serializeRequest(body) {
     let serializedHttpRequest = '';
     serializedHttpRequest += `${this.method} ${this.route} HTTP/1.1\r\n`;

     this.headers.forEach((header) => {
         serializedHttpRequest += `${header.key}: ${header.value}\r\n`;
     });
     
     serializedHttpRequest += '\r\n';
     serializedHttpRequest += body;
     
     return serializedHttpRequest;
}

module.exports = TotalVoiceHttp;