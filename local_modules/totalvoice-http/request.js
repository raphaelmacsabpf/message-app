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

    removeHeaders(headers) {
        let headersToRemove = [].concat(headers || []);
        
        headersToRemove.forEach((header) => {
            const indexToRemove = this.headers.findIndex((existingHeader) => {
                return existingHeader.key == header;
            });

            ~indexToRemove && this.headers.splice(indexToRemove, 1); // Try to remove only if indexToRemove > -1
        });
    }
}

module.exports = Request;