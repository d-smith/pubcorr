# pubcorr

Parts:

* sls api to post JSON to an endpoint
* queue subscription and delivery config

Call it:

```
curl -X POST -H 'x-api-key: xxx' -d '{"foo":true}' https://xxx.execute-api.us-east-1.amazonaws.com/dev/wp/t1
