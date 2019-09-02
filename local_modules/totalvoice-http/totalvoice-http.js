const tls = require('tls');
const EventEmitter = require('events');

const Request = require('./request');
const Response = require('./response');

/**
 * Http client designed for Totalvoice API
 * @class TotalVoiceHttp
 * @extends {EventEmitter}
 */
class TotalVoiceHttp extends EventEmitter {
     /**
      *Creates an instance of TotalVoiceHttp.
      * @param {string} hostname
      * @param {number} port
      * @param {string} accesstoken
      * @memberof TotalVoiceHttp
      */
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

     /**
      * Send a get http request
      * @param {string} route
      * @param {object} body
      * @param {finishCallback} finishCallback
      * @memberof TotalVoiceHttp
      */
     get(route, body, finishCallback) {
          const httpRequest = new Request('GET', route, this.defaultHeaders, body);
          sendRequest.call(this, httpRequest, finishCallback);
     }

     /**
      * Send a post http request
      * @param {string} route
      * @param {object} body
      * @param {finishCallback} finishCallback
      * @memberof TotalVoiceHttp
      */
     post(route, body, finishCallback) {
          const httpRequest = new Request('POST', route, this.defaultHeaders, body);
          sendRequest.call(this, httpRequest, finishCallback);
     }
     
     /**
      * Send a put http request
      * @param {string} route
      * @param {object} body
      * @param {finishCallback} finishCallback
      * @memberof TotalVoiceHttp
      */
     put(route, body, finishCallback) {
          const httpRequest = new Request('PUT', route, this.defaultHeaders, body);
          sendRequest.call(this, httpRequest, finishCallback);
     }

     /**
      * Send a delete http request
      * @param {string} route
      * @param {object} body
      * @param {finishCallback} finishCallback
      * @memberof TotalVoiceHttp
      */
     delete(route, body, finishCallback) {
          const httpRequest = new Request('DELETE', route, this.defaultHeaders, body);
          sendRequest.call(this, httpRequest, finishCallback);
     }

     /**
      * Send a options http request
      * @param {string} route
      * @param {object} body
      * @param {finishCallback} finishCallback
      * @memberof TotalVoiceHttp
      */
     options(route, body, finishCallback) {
          const httpRequest = new Request('OPTIONS', route, this.defaultHeaders, body);
          sendRequest.call(this, httpRequest, finishCallback);
     }
}

/**
 * Send request via TLS
 * @param {Request} request
 * @param {finishCallback} finishCallback
 */
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

/**
 * Serialize request to HTTP/1.1 format
 * @param {{}} body
 */
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

/**
 * Callback for http methods
 * @callback finishCallback
 * @param {{}} request
 * @param {{}} response
 */