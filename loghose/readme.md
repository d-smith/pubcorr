# loghose

Serverless project to send data to s3 via a firehose configured with a transform function.

sls deploy --stage dev

```
$ aws firehose list-delivery-streams
{
    "DeliveryStreamNames": [
        "loghose-dev-firehose-delivery-stream",
        "s1FH"
    ],
    "HasMoreDeliveryStreams": false
}


aws firehose put-record \
 --delivery-stream-name loghose-dev-firehose-delivery-stream \
 --record '{"Data":"dGhpcyBpcyBhIHRlc3QK"}'
```

serverless invoke local --function transform --path ./logevent.json 


describe pubrecord

eventid             	string              	from deserializer   
messageid           	string              	from deserializer   
eventtype           	string              	from deserializer   
year                	string              	                    
month               	string              	                    
day                 	string              	                    
	 	 
# Partition Information	 	 
# col_name            	data_type           	comment             
	 	 
year                	string              	                    
month               	string              	                    
day                 	string       

select * from pubrecord limit 3

1   f387483f-329d-4d0a-a6aa-39e3672f6ed1	eb075dd4-c058-5819-b441-0493cbda57f2	t1	2021	06	18
2	a2471298-c1eb-4678-8ead-883503b218f6	c61535bd-5d94-51d4-b954-6cfa561781f3	t1	2021	06	18
3	beade643-c107-4810-8cfb-770edf7ea970	06a8b672-6f2d-5990-bf8f-ef3564a9e6ae	t1	2021	06	18

select eventid, eventtype from pubrecord where messageid = 'eb075dd4-c058-5819-b441-0493cbda57f2'

Results
eventid	eventtype
eventid	eventtype
1	f387483f-329d-4d0a-a6aa-39e3672f6ed1	t1

