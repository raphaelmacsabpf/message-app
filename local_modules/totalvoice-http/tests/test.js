const tape = require('tape');
const Request = require('../request');

tape('Create HTTP Request', (t) => {
    // Arrange
    const request = new Request('GET', '/products')
    const requestWithHeadersByConstructor = new Request('GET', '/products', {'xpto-key': 'xpto-value'});

    // Act
    request.addHeaders({'Host': '0.0.0.0'});
    request.removeHeaders('Accept');

    // Assert
    t.assert(request.headers.filter(x => x.key == 'User-Agent' && x.value == 'RaphaelSantosApp/1.0.0').length > 0, "Default headers are present");
    t.assert(request.headers.filter(x => x.key == 'Host' && x.value == '0.0.0.0').length > 0, "Header add by Request.AddHeaders()");
    t.assert(requestWithHeadersByConstructor.headers.filter(x => x.key == 'xpto-key' && x.value == 'xpto-value').length > 0, "Header add by constructor");
    t.assert(request.headers.filter(x => x.key == 'Accept').length == 0, 'Header remove by Request.removeHeaders');
    t.end()  
})