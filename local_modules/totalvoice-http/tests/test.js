const tape = require('tape');
const Request = require('../request');

tape('Create HTTP Request', (t) => {
    // Arrange
    const request = new Request('GET', '/products')

    // Act
    request.addHeaders({'Host': '0.0.0.0'});

    // Assert
    t.assert(request.headers.filter(x => x.key == 'Host' && x.value == '0.0.0.0').length > 0, "Header add sucessful");
    t.end()  
})