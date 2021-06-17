# pubcorr

Parts:

* wrappub -API to wrap data payload in a cloudevents wrapper and publish to SNS
* logsub - subscribe to the publish api logs and extract messages that contain message id and event id correlation entries


## Wrappub

cd wrappub
npm i
sls deploy

Call it:

```
curl -X POST -H 'x-api-key: xxx' -d '{"foo":true}' https://xxx.execute-api.us-east-1.amazonaws.com/dev/wp/t1
```

serverless logs -f logProcessor


## logsub

cd logsub

sls deploy

serverless logs -f logProcessor

