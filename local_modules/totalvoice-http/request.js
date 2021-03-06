/**
 * Http request
 * @class Request
 */
class Request {
    /**
     *Creates an instance of Request.
     * @param {string} method - HTTP method
     * @param {string} route
     * @param {{}} [headers={}]
     * @param {{}} [body={}]
     * @memberof Request
     */
    constructor(method, route, headers = {}, body = {}, ) {
        const DEFAULT_HEADERS = [
            {key: 'User-Agent', value: 'RaphaelSantosApp/1.0.0'},
            {key: 'Accept', value: 'application/json'},
            {key: 'Content-Type', value: 'application/json'}
        ];
        
        this.method = method;
        this.route = route;
        this.body = body;
        this.headers = DEFAULT_HEADERS;
        this.addHeaders(headers);
    }

    /**
     * Add headers to the request
     * @param {{}} headers
     * @memberof Request
     */
    addHeaders(headers) {
        Object.keys(headers).forEach((header) => {
            this.headers.push({key: header, value: headers[header]});
        });
    }

    /**
     * Remove headers from the request
     * @param {{}} headers
     * @memberof Request
     */
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