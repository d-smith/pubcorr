# pubcorr

Parts:

* wrappub -API to wrap data payload in a cloudevents wrapper and publish to SNS
* logsub - subscribe a lambda to the publish api logs and extract messages that contain message id and event id correlation entries
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

## loghose

cd loghose
sls deploy --stage dev

