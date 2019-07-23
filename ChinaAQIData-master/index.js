var request = require('request');
var fs=require('fs')
var parser = require('fast-xml-parser');
var he = require('he');
var options = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : true,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
    attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),//default is a=>a
    tagValueProcessor : a => he.decode(a) //default is a=>a
};
var URL="http://106.37.208.233:20035/emcpublish/ClientBin/Env-CnemcPublish-RiaServices-EnvCnemcPublishDomainService.svc/binary/GetAQIDataPublishLives";

function getfilefromcnemc(callback){
	request(URL).pipe(fs.createWriteStream('GetAQIDataPublishLives',{encoding:"utf-8"}).on('close',function(err){
		console.log('end')	
			const { exec } = require('child_process');
			exec('python ./ChinaAQIData-master/python-wcfbin/wcf2xml.py GetAQIDataPublishLives > data.xml', (error, stdout, stderr) => {
			  if (error) {
				console.error(`执行的错误: ${error}`);
				return;
			  }
			xml2json(callback);				  
			});
	}));
}
function xml2json(callback){
	fs.readFile("./data.xml", "utf8", function(error, data) {
    // console.log(error);  //如果err为null就说明读取成功了,没有出错
    // console.log(data); // 如果不给第二个参数[读取的文件编码格式]就会以beffer格式输出

    //  用error来判断文件是否读取成功
    if (error) return console.log("读取文件失败,内容是" + error.message);
    if( parser.validate(data) === true) { //optional (it'll return an object in case it's not valid)
       var jsonObj = parser.parse(data,options);

       var key1='a:RootResults',
       key2='b:AQIDataPublishLive',
       key_Area='b:Area',
       key_PositionName='b:PositionName',
       key_AQI='b:AQI',
       key_AQIQuality='b:Quality',
       key_PrimaryPollutant='b:PrimaryPollutant',
       key_PM2_5='b:PM2_5',
       key_PM10='b:PM10',
       key_CO='b:CO',
       key_NO2='b:NO2',
       key_O3='b:O3',
       key_O3_8h='b:O3_8h',
       key_SO2='b:SO2',
       key_TimePoint='b:TimePoint';  
        console.log(jsonObj)
        // console.log(jsonObj.GetAQIDataPublishLivesResponse.GetAQIDataPublishLivesResult[key1][key2])
        var alldata=jsonObj.GetAQIDataPublishLivesResponse.GetAQIDataPublishLivesResult[key1][key2];
        var obj={};
        var AQIData={
          CITYNAME:'南昌',
          dataTime:null,
          MonitorPoint:{}

        }
        alldata.forEach(function(one){
            // console.log(one)
            // console.log(one[key_Area] +'      ' + one[key_PositionName]+ "  ==================================")
            if(one[key_Area]== '南昌市'){
                console.log(one)
                AQIData.dataTime=one[key_TimePoint];
                // console.log("+++++++++++++++++++++ ", one[key_PositionName], "  +++++++++++++++++++++++++++++++++++++++++++++=")
                  AQIData.MonitorPoint[one[key_PositionName]]=[one[key_PositionName], one[key_AQI], one[key_AQIQuality], one[key_PrimaryPollutant], one[key_PM2_5], one[key_PM10], one[key_CO], one[key_NO2], one[key_O3], one[key_O3_8h], one[key_SO2], one[key_TimePoint]]
            }
        })


        // console.log(AQIData)

    }
		callback(AQIData);
	});
}


exports.nanchang=getfilefromcnemc;