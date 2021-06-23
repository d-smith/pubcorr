# pubcorr

Parts:

* wrappub -API to wrap data payload in a cloudevents wrapper and publish to SNS
* logsub - subscribe a lambda to the sns failure log and process errors
* loghose - subscribe a firehose to a filtered log stream and land the events in s3, using a lambda to transform the records into something that can be crawled with glue and queried using Athena.


## Wrappub

cd wrappub
npm i
sls deploy

Call it:

```
curl -X POST -H 'x-api-key: xxx' -d '{"foo":true}' https://xxx.execute-api.us-east-1.amazonaws.com/dev/wp/t1
```

serverless logs -f logProcessor

Use the Jupyter Notebook in the wrappub directory to set up a queue subscription that will fail to generate error messages, and to try out some cloudwatch insights queries against the logs.

## logsub

cd logsub
sls deploy
serverless logs -f logProcessor

```

START RequestId: e710c02f-9a7a-4046-846e-9e0194541208 Version: $LATEST
2021-06-19 09:02:03.429 (-07:00)        e710c02f-9a7a-4046-846e-9e0194541208    INFO    Event Data: {
  "messageType": "DATA_MESSAGE",
  "owner": "427848627088",
  "logGroup": "sns/us-east-1/xxxx/t1-dev/Failure",
  "logStream": "8aa50655-1d04-4420-8f5c-75c18e3f8a43",
  "subscriptionFilters": [
    "log-filter-sub-dev-LogProcessorLogsSubscriptionFilterCloudWatchLog1-1MYI5N3R789KV"
  ],
  "logEvents": [
    {
      "id": "36219053358007843487776051665359649914128758684584509440",
      "timestamp": 1624118523196,
      "message": "{\"notification\":{\"messageMD5Sum\":\"475a91f632ed72388b5b1137a49e2ac4\",\"messageId\":\"b2f9923f-7909-535f-a773-cb776e2138fb\",\"topicArn\":\"arn:aws:sns:us-east-1:xxx:t1-dev\",\"timestamp\":\"2021-06-19 16:01:44.845\"},\"delivery\":{\"deliveryId\":\"86fccac1-63d3-56d1-b8fd-938974fbe3ec\",\"destination\":\"arn:aws:sqs:us-east-1:xxx:sampleQueue-dev\",\"providerResponse\":\"{\\\"ErrorCode\\\":\\\"AccessDenied\\\",\\\"ErrorMessage\\\":\\\"Access to the resource https://sqs.us-east-1.amazonaws.com/xxx/sampleQueue-dev is denied.\\\",\\\"sqsRequestId\\\":\\\"Unrecoverable\\\"}\",\"dwellTimeMs\":41,\"attempts\":1,\"statusCode\":403},\"status\":\"FAILURE\"}"
    }
  ]
}
END RequestId: e710c02f-9a7a-4046-846e-9e0194541208
REPORT RequestId: e710c02f-9a7a-4046-846e-9e0194541208  Duration: 2.14 ms       Billed Duration: 3 ms  Memory Size: 1024 MB     Max Memory Used: 66 MB
```

## loghose

cd loghose
sls deploy --stage dev

