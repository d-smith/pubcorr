serverless invoke local --function transform --path ./event1.json

Takes records like...

```
{"Type":"Notification","MessageId":"9f846727-a958-5590-acae-3e77e2fa4c85","TopicArn":"arn:aws:sns:us-east-1:xxx:snshose-dev-topic","Message":"{\"id\":\"4d528f2c-79c6-46cc-923e-b3a00352aff5\",\"source\":\"your mama\",\"specversion\":\"1.0\",\"type\":\"snshose-dev-topic\",\"data\":{\"foo\":true},\"time\":\"2021-06-25T21:23:46.221Z\"}","Timestamp":"2021-06-25T21:23:46.241Z","UnsubscribeURL":"https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:xxxx:snshose-dev-topic:5f6dc7ef-e8a6-4beb-b78d-b61d223afc4d"}
```

And extracts the message id - event id correlation...

```
{"messageId":"9f846727-a958-5590-acae-3e77e2fa4c85","eventId":"4d528f2c-79c6-46cc-923e-b3a00352aff5","eventType":"snshose-dev-topic"}
```
 
 Note that raw delivery must be false to include the SNS delivery context...

Subscription context:

{
            "SubscriptionArn": "arn:aws:sns:us-east-1:xxxx:snshose-dev-topic:5f6dc7ef-e8a6-4beb-b78d-b61d223afc4d",
            "Owner": "xxxx",
            "Protocol": "firehose",
            "Endpoint": "arn:aws:firehose:us-east-1:xxxx:deliverystream/snshose-dev-firehose-delivery-stream",
            "TopicArn": "arn:aws:sns:us-east-1:xxxx:snshose-dev-topic"
}

{
    "Attributes": {
        "Owner": "xxxx",
        "RawMessageDelivery": "false",
        "TopicArn": "arn:aws:sns:us-east-1:xxxx:snshose-dev-topic",
        "Endpoint": "arn:aws:firehose:us-east-1:xxxx:deliverystream/snshose-dev-firehose-delivery-stream",
        "SubscriptionRoleArn": "arn:aws:iam::xxxx:role/snshose-dev-topicStreamSubscriptionRole-CUXKFJ56ANMF",
        "Protocol": "firehose",
        "PendingConfirmation": "false",
        "ConfirmationWasAuthenticated": "true",
        "SubscriptionArn": "arn:aws:sns:us-east-1:xxxx:snshose-dev-topic:5f6dc7ef-e8a6-4beb-b78d-b61d223afc4d"
    }
}
