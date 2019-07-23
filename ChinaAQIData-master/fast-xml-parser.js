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
                  AQIData.MonitorPoint[one[key_PositionName]]=[one[key_Area], one[key_PositionName], one[key_AQI], one[key_AQIQuality], one[key_PrimaryPollutant], one[key_PM2_5], one[key_PM10], one[key_CO], one[key_NO2], one[key_O3], one[key_O3_8h], one[key_SO2], one[key_TimePoint]]
            }
        })


        console.log(AQIData)

    }
});



/*
 'b:AQI': 47,
  'b:Area': '南昌市',
  'b:CO': 0.6,
  'b:CO_24h': 0.5,
  'b:CityCode': 0,
  'b:IsPublish': true,
  'b:Latitude': 28.6425,
  'b:Longitude': 115.892,
  'b:Measure': '各类人群可正常活动',
  'b:NO2': 7,
  'b:NO2_24h': 16,
  'b:O3': 120,
  'b:O3_24h': 120,
  'b:O3_8h': 71,
  'b:O3_8h_24h': 71,
  'b:OpenAccessGenerated': 
   { 'c:string': 
      [ '<?xml version="1.0" encoding="utf-16"?>\r\n<ObjectKey T="Env.CnemcPublish.DAL.AQIDataPublishLive" S="StationCode::1295A" />',
        '+' ] },
  'b:OrderId': 1,
  'b:PM10': 47,
  'b:PM10_24h': 57,
  'b:PM2_5': 13,
  'b:PM2_5_24h': 14,
  'b:PositionName': '象湖',
  'b:PrimaryPollutant': '—',
  'b:ProvinceId': 0,
  'b:Quality': '优',
  'b:SO2': 2,
  'b:SO2_24h': 3,
  'b:StationCode': '1295A',
  'b:TimePoint': '2019-07-18T14:00:00',
  'b:Unheathful': '空气质量令人满意，基本无空气污染
*/

/* 
43206 |南昌| 南昌|35 |一级（优）| - |5 |11 0.5 |15 |89 |69 |3 |2019-07-08 08:00:00 | 1562570571890
43191 |南昌|武术学校 |25|优| -1|1 |5 |0.5 |2 |78 |48 |5 | 2019-07-08 08:00:00 | 1562569671878 |
+------------------+-------------+------+-----+---------+----------------+
| Field            | Type        | Null | Key | Default | Extra          |
+------------------+-------------+------+-----+---------+----------------+
| ID               | bigint(13)  | NO   | PRI | NULL    | auto_increment |
| CITYNAME         | varchar(32) | NO   |     | NULL    |                |
| MonitorPointNAME | varchar(32) | NO   |     | NULL    |                |
| AQI              | smallint(6) | NO   |     | NULL    |                |
| LEVELINDEX       | varchar(16) | NO   |     | NULL    |                |
| Pollut           | varchar(16) | NO   |     | NULL    |                |
| PM25             | smallint(6) | NO   |     | NULL    |                |
| PM10             | smallint(6) | NO   |     | NULL    |                |
| CO               | float(4,1)  | NO   |     | NULL    |                |
| NO2              | smallint(6) | NO   |     | NULL    |                |
| O3hour1          | smallint(6) | NO   |     | NULL    |                |
| O3hour8          | smallint(6) | NO   |     | NULL    |                |
| SO2              | smallint(6) | NO   |     | NULL    |                |
| DATATIME         | varchar(32) | NO   |     | NULL    |                |
| SaveTime 



*/