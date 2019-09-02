/**
 * Http response
 * @class Response
 */
class Response {
    /**
     *Creates an instance of Response.
     * @param {string} rawData
     * @memberof Response
     */
    constructor(rawData) {
        this.headers = [];
        this.statusCode = undefined;
        this.statusMessage = undefined;
        this.messageBody = undefined;

        if(!rawData)
            throw new Error('Empty raw data');

        parseHttpResponse.call(this, rawData.toString());
    }
}

/**
 * Parse http response
 * @param {string} rawHttpResponse
 */
function parseHttpResponse(rawHttpResponse) {
    const STATUS_LINE_INDEX = 1;
    const HEADERS_INDEX = 2;
    const MESSAGE_BODY_INDEX = 3;

    let regex = /(.*)\r\n([\s\S]+)\r\n\r\n([\s\S]+)/gm;
    let regexMatches = regex.exec(rawHttpResponse);

    extractStatusCodeFrom.call(this, regexMatches[STATUS_LINE_INDEX]);
    extractHeadersFrom.call(this, regexMatches[HEADERS_INDEX]);
    extractMessageBodyFrom.call(this, regexMatches[MESSAGE_BODY_INDEX]);
}

/**
 * Parse statusCode and statusMessage of a request
 * @param {string} rawStatusLine
 */
function extractStatusCodeFrom(rawStatusLine) {
    const STATUS_CODE_INDEX = 1;
    const STATUS_MESSAGE_INDEX = 2;
    
    const regex = /HTTP\/1\.1\s(\d+)\s([A-Za-z\s]+)/gm;
    const regexMatch = regex.exec(rawStatusLine);
    this.statusCode = Number.parseInt(regexMatch[STATUS_CODE_INDEX]);
    this.statusMessage = regexMatch[STATUS_MESSAGE_INDEX];
}

/**
 * Parse http headers of a request
 * @param {string} rawHeaders
 */
function extractHeadersFrom(rawHeaders) {
    const KEY_INDEX = 1;
    const VALUE_INDEX = 2;

    const regex = /^([a-z-A-Z]+):\s(.+)$\r\n/gm;
    let regexMatches;
    while ((regexMatches = regex.exec(rawHeaders)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (regexMatches.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        const header = {key: regexMatches[KEY_INDEX], value: regexMatches[VALUE_INDEX]};
        this.headers.push(header);
    }
}

/**
 * Parse http body of a request
 * @param {string} rawMessageBody
 */
function extractMessageBodyFrom(rawMessageBody) {
    this.messageBody = rawMessageBody;
}

module.exports = Response;