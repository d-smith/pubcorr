const util = require('util');
const zlib = require('zlib');
const gunzip = util.promisify(zlib.gunzip);

let handler = async (event) => {
    var payload = Buffer.from(event.awslogs.data, 'base64');
    const inflated = await gunzip(payload);
    result = JSON.parse(inflated.toString('ascii'));
    console.log("Event Data:", JSON.stringify(result, null, 2));
}

module.exports = {
    handler
};