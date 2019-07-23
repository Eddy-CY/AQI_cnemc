var fs=require("fs");
fs.readFile("./GetAQIDataPublishLives", function(error, data) {
	// console.log(data)
    // console.log(error);  //如果err为null就说明读取成功了,没有出错
    // console.log(data); // 如果不给第二个参数[读取的文件编码格式]就会以beffer格式输出

    //  用error来判断文件是否读取成功
    if (error) return console.log("读取文件失败,内容是" + error.message)
    	console.log(data)
})