require('rootpath')();
var express = require('express');
var multer = require('multer');

var app = express();
var mongoose = require("mongoose");
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var fs = require('fs');
mongoose.connect(config.connectionMongoose);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) 
	{
	cb(null, file.fieldname + '.png')
  }
})

var upload = multer({storage: storage });

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
app.use('/uploads', express.static(__dirname + '/uploads'));
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


app.post('/upload', upload.single('photho'), function(req, res)
{
	fs.rename('uploads/photho.png', 'uploads/'+req.body.userID+'.png', function(err) 
	{
		if ( err ) console.log('ERROR: ' + err);
	});
    console.log(req.body) // form fields
    console.log(req.file) // form files
    res.status(204).end()
});




// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
