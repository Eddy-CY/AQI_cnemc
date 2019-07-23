var request=require('request')

request('http://127.0.0.1:30003/AQI/nanchang',function(error,req,body){
	console.log(body)
})