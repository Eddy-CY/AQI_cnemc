

/**
 * Created by Eddy on 17-6-28.
 */
/**
 * Module dependencies.
 */
var express = require('express');  //express
var session = require('express-session');
var bodyParser = require('body-parser');
// var logger = require('morgan'); //日志
var errorHandler = require('errorhandler');
var path = require('path'); //路径








/**
 * Controllers (route handlers).
 */


var app = express();
var http = require('http');
var server = http.createServer(app);


/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 30003);
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// app.use(compress());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
/**
 * Primary app routes.
 */
 var AQI=require('./AQI')

app.get('/AQI/nanchang',AQI.nanchang);
app.post('/AQI/nanchang',AQI.nanchang);


/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
server.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;