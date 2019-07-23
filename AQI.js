var AQI=require("./ChinaAQIData-master/index")


var nancangAQI={};
setInterval(function(){
	getAQI();
},1000*60*30);
getAQI()
function getAQI(){
	AQI.nanchang(function(data){
		nancangAQI=data;
	});

}




exports.nanchang = function(req, res){
	// AQI.nanchang(function(data){
	// 	// console.log('data+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
	// 	// console.log('data=',data)
	// 	res.send(data);
	// });
	res.send(nancangAQI);
    
}