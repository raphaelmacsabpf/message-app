const tape = require('tape');
const Request = require('../request');
const Response = require('../response');

tape('Create HTTP Request', (t) => {
    // Arrange
    const request = new Request('GET', '/products');
    const requestWithHeadersByConstructor = new Request('GET', '/products', {'xpto-key': 'xpto-value'});

    // Act
    request.addHeaders({'Host': '0.0.0.0'});
    request.removeHeaders('Accept');

    // Assert
    t.assert(request.headers.filter(x => x.key == 'User-Agent' && x.value == 'RaphaelSantosApp/1.0.0').length > 0, 'Default headers are present');
    t.assert(request.headers.filter(x => x.key == 'Host' && x.value == '0.0.0.0').length > 0, 'Header add by Request.AddHeaders()');
    t.assert(requestWithHeadersByConstructor.headers.filter(x => x.key == 'xpto-key' && x.value == 'xpto-value').length > 0, 'Header add by constructor');
    t.assert(request.headers.filter(x => x.key == 'Accept').length == 0, 'Header remove by Request.removeHeaders');
    t.end();
});

tape('Create HTTP Response', (t) => {
    // Arrange
    const VALID_RESPONSE_RAW_STRING = 'HTTP/1.1 200 OK\r\nDate: Fri, 30 Aug 2019 00:52:23 GMT\r\nServer: Apache\r\nAccess-Control-Allow-Origin: *\r\nX-Content-Type-Options: nosniff\r\nContent-Length: 85\r\nContent-Type: application/json\r\n\r\n{"status":200,"sucesso":true,"motivo":0,"mensagem":"saldo atual","dados":{"saldo":3}}';

    const response = new Response(VALID_RESPONSE_RAW_STRING);

    // Act & Assert
    t.throws(() => new Response(), /^Error: Empty raw data$/, 'Empty response creation throws exception');
    t.assert(response.statusCode == 200, 'Response.statusCode parsed');
    t.assert(response.statusMessage == 'OK', 'Response.statusMessage parsed');
    t.end();
});