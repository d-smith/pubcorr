const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const ddb = new AWS.DynamoDB();

const { v4: uuidv4 } = require('uuid');

let topic_arn = process.env.TOPIC_ARN;
let ddb_table = process.env.DYNAMODB_TABLE;

const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});


const wrapPub = async (event) => {
    logger.info(event);

    let cloudEvent = {
        id: uuidv4(),
        source: 'your mama',
        specversion: '1.0',
        type: event.pathParameters.topic,
        data: JSON.parse(event.body),
        time: new Date().toISOString()
    }

    logger.info(cloudEvent);


    try {
        let snsParams = {
            Message: JSON.stringify(cloudEvent),
            TopicArn: topic_arn
        };

        let response = await sns.publish(snsParams).promise();

        pubContext = {
            PublishContext: {
                EventId: cloudEvent.id,
                MessageId: response.MessageId,
                EventType: cloudEvent.type
            }
        };

        logger.info(pubContext);

        let ddbParams = {
            Item: {
                "id": {
                    "S":cloudEvent.id
                },
                "msgid": {
                    "S":response.MessageId
                },
                "event_t": {
                    "S":cloudEvent.type
                }
            },
            TableName: ddb_table
        };

        response = await ddb.putItem(ddbParams).promise();
        logger.info(response);

        return {
            statusCode: 200,
            body: "ok"
        };
    } catch(err) {
        logger.warn(err);
        return {
            statusCode: 500,
            body: "not ok"
        };
    }
};


module.exports = {
    wrapPub
}