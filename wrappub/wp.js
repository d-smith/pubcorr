const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const { v4: uuidv4 } = require('uuid');

let topic_arn_base = process.env.TOPIC_ARN_BASE;

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
            TopicArn: topic_arn_base + cloudEvent.type
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