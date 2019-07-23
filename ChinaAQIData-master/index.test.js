var callfile = require('child_process');
function callback(err, stdout, stderr){
	// console.log(err, stdout, stderr)
	// var jsonObj = parser.parse(xmlData [,options] );

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



// if( parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
//     var jsonObj = parser.parse(xmlData,options);
// }

// Intermediate obj
// var tObj = parser.getTraversalObj(xmlData,options);
// var jsonObj = parser.convertToJson(tObj,options);


var fs=require("fs");
fs.readFile("./data.xml", "utf-8", function(error, data) {
	console.log(data)
    // console.log(error);  //如果err为null就说明读取成功了,没有出错
    // console.log(data); // 如果不给第二个参数[读取的文件编码格式]就会以beffer格式输出

    //  用error来判断文件是否读取成功
    if (error) return console.log("读取文件失败,内容是" + error.message);
    if( parser.validate(data) === true) { //optional (it'll return an object in case it's not valid)
        var jsonObj = parser.parse(data,options);
       var key1='a:RootResults';
       var key2='b:AQIDataPublishLive';
       var key3='b:Area';
       var key4='b:PositionName';
       var key_PM2_5='b:PM2_5',key_CO='b:CO',key_NO2='b:NO2',key_PM10='b:PM10',key_SO2='b:SO2',key_TimePoint='b:TimePoint';
        console.log(jsonObj)
        // console.log(jsonObj.GetAQIDataPublishLivesResponse.GetAQIDataPublishLivesResult[key1][key2])
        var alldata=jsonObj.GetAQIDataPublishLivesResponse.GetAQIDataPublishLivesResult[key1][key2];
        var obj={};
        alldata.forEach(function(one){
            if(one[key3]== '南昌市'){
                // console.log(one)
                if(!obj[one[key4]]){
                    obj[one[key4]]={
                        PositionName:one[key4],
                        PM2_5:one[key_PM2_5],
                        PM10:one[key_PM10],
                        CO:one[key_CO],
                        NO2:one[key_NO2],
                        SO2:one[key_SO2],
                        TimePoint:one[key_TimePoint]

                    }
                }
            }
        })
        console.log(obj)

    }
});


}
callfile.execFile('./data_from_cepm.sh',function (err, stdout, stderr) {
    callback(err, stdout, stderr);

});

