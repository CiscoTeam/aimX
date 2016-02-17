require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

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

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/frameworks'));
app.use(express.static(__dirname + '/app/pages/styles'));

app.get('/home',function(req,res){res.sendFile(__dirname + '/app/pages/home.html');});
app.get('/floorPlan',function(req,res){res.sendFile(__dirname + '/app/pages/floorPlan.html');});
app.get('/devices',function(req,res){res.sendFile(__dirname + '/app/pages/devices.html');});
app.get('/quickControls',function(req,res){res.sendFile(__dirname + '/app/pages/quickControls.html');});

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// start server52.91.31.112,
var server = app.listen( 3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
