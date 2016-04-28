require('rootpath')();
var express = require('express');
var app = express();
var mongoose = require("mongoose");
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

mongoose.connect(config.connectionMongoose);


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use('/openApi/devices', require('./controllers/openApi/devices.controller'));
app.use('/openApi/areas', require('./controllers/openApi/areas.controller'));
app.use('/app/home', require('./controllers/authenticate.controller'));

app.use(express.static(__dirname + '/frameworks'));
app.use('/fonts/', express.static(__dirname + '/frameworks/bootstrap-master/fonts'));

app.get('/bootstrapCSS',function(req,res){res.sendFile(__dirname + '/frameworks/bootstrap-master/dist/css/bootstrap.min.css');});
app.get('/bootstrapCSSIE10',function(req,res){res.sendFile(__dirname + '/frameworks/bootstrap-master/docs/assets/css/ie10-viewport-bug-workaround.css');});
app.get('/bootstrapJS',function(req,res){res.sendFile(__dirname + '/frameworks/bootstrap-master/dist/js/bootstrap.min.js');});
app.get('/bootstrapJSIE10',function(req,res){res.sendFile(__dirname + '/frameworks/bootstrap-master/docs/assets/js/ie-emulation-modes-warning.js');});
app.get('/styleCSS',function(req,res){res.sendFile(__dirname + '/app/style.css');});

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app/home');
});



/*var router = express.Router(), multer = require('multer');

var uploading = multer({dest: __dirname + '../public/uploads/',});

router.post('/upload', uploading, function(req, res) 
{
	
});

module.exports = router;
*/



// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
