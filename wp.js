const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const { v4: uuidv4 } = require('uuid');

let topic_arn = process.env.TOPIC_ARN;


const wrapPub = async (event) => {
    console.log(event);

    let cloudEvent = {
        id: uuidv4(),
        source: 'your mama',
        specversion: '1.0',
        type: event.pathParameters.topic,
        data: JSON.parse(event.body),
        time: new Date().toISOString()
    }

    console.log(cloudEvent);

    console.log(topic_arn);

    try {
        let snsParams = {
            Message: JSON.stringify(cloudEvent),
            TopicArn: topic_arn
        };

        let response = await sns.publish(snsParams).promise();
        console.log(response);

        pubContext = {
            PublishContext: {
                EventId: cloudEvent.id,
                MessageId: response.MessageId
            }
        };

        console.log(JSON.stringify(pubContext));

        return {
            statusCode: 200,
            body: "ok"
        };
    } catch(err) {
        console.log(err);
        return {
            statusCode: 500,
            body: "not ok"
        };
    }
};


module.exports = {
    wrapPub
}