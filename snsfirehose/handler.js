const util = require('util');
const zlib = require('zlib');
const gunzip = util.promisify(zlib.gunzip);

module.exports.transform = async (event) => {
    console.log(JSON.stringify(event));
    let recs = event.records;

    let records = [];
    for(rec of recs) {
        console.log(rec);
        let payload = Buffer.from(rec.data, 'base64').toString('utf-8');
        let parsed = JSON.parse(payload);
        let domainEvent = JSON.parse(parsed.Message);

        corrRec = {
            messageId: parsed.MessageId,
            eventId: domainEvent.id,
            eventType: domainEvent.type
        };
        
        let recordString = `${JSON.stringify(corrRec)}\n`

        records.push(
            {
                recordId:rec.recordId,
                result: 'Ok',
                //data: event.records[i].data
                data: Buffer.from(recordString).toString('base64')
            }
        )
    }

    console.log(`Return: ${ JSON.stringify({records}) }`)
    return {records};
  };