const util = require('util');
const zlib = require('zlib');
const gunzip = util.promisify(zlib.gunzip);

module.exports.transform = async (event) => {
    console.log(JSON.stringify(event));
    let records = [];

    for(let i = 0; i<event.records.length; i++) {
        console.log("Inflate event data");
        let payload = Buffer.from(event.records[i].data, 'base64');
        let inflated = await gunzip(payload);
        let cloudwatchLogPayload = JSON.parse(inflated.toString('ascii'));
       
        let logRecords = cloudwatchLogPayload.logEvents;
        let recordString = ""

        for(let j=0;j<logRecords.length;j++) {
            console.log('process log message');
            let messageText = logRecords[j].message;
            let parsedMessage = JSON.parse(messageText)
            let publishContext = JSON.stringify(parsedMessage.message.PublishContext);
            console.log(publishContext)

            recordString = recordString + `${publishContext}\n`
        }

        console.log(recordString);

        records.push({
            recordId: event.records[i].recordId,
            result: 'Ok',
            //data: event.records[i].data
            data: Buffer.from(recordString).toString('base64')
        });
    }
    console.log(`Return: ${ JSON.stringify({records}) }`)
    return Promise.resolve({records});
  };