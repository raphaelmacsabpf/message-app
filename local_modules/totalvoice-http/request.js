class Request {
    constructor(method, route, headers = {}, body = {}, ) {
        const DEFAULT_HEADERS = [
            {key: 'User-Agent', value: 'RaphaelSantosApp/1.0.0'},
            {key: 'Accept', value: '*/*'}
        ]
        
        this.method = method;
        this.route = route;
        this.body = body;
        this.headers = DEFAULT_HEADERS;
        
        this.addHeaders(headers);
    }

    addHeaders(headers) {
        Object.keys(headers).forEach((header) => {
            this.headers.push({key: header, value: headers[header]});
        });
    }
}

module.exports = Request;