const proxyquire = require('proxyquire');
const tape = require('tape');

// These stubs is used to mock tls module
var stubs = {
    'tls': {
        connect: function() {
            return {
                once: (event, listener) => {
                    if(event == 'secureConnect') {
                        listener();
                    }
                },
                on: (event, listener) => {
                    if(event == 'data') {
                        const VALID_RESPONSE_RAW_STRING = `HTTP/1.1 200 OK\r\nDate: Fri, 30 Aug 2019 00:52:23 GMT\r\nServer: Apache\r\nAccess-Control-Allow-Origin: *\r\nX-Content-Type-Options: nosniff\r\nContent-Length: 85\r\nContent-Type: application/json\r\n\r\n{"status":200,"sucesso":true,"motivo":0,"mensagem":"saldo atual","dados":{"saldo":3}}`;
                        listener(VALID_RESPONSE_RAW_STRING);
                    }
                },
                write: () => { }
            }
        },
        '@global': true
    }
};

const TotalVoiceHttp = proxyquire('totalvoice-http', stubs).TotalVoiceHttp;

tape('Use TotalVoiceHttp GET', (t) => {
    // Arrange
    const totalVoiceHttp = new TotalVoiceHttp('0.0.0.0', 443, 'FAKE_ACCESS_TOKEN');
    t.plan(1);

    // Act & Assert
    totalVoiceHttp.get('/products', (req, res) => {
        t.assert(res.statusCode == 200 && res.statusMessage == 'OK', 'Response.statusCode is 200 and Response.statusMessage is OK');
    });
});