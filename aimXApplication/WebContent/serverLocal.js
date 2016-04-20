require('rootpath')();
var express = require('express'), http = require('http');
var app = express();
var server = http.createServer(app);

var mongoose = require("mongoose");
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var io = require('socket.io').listen(server);

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
app.get('/socket',function(req,res){res.sendFile(__dirname + '/node_modules/socket.io/lib/socket.io.js');});

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app/home');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//get update from db
setInterval(function() {  
  io.sockets.emit('dbUpdate', { });
}, 3000); //1000 = 1 second

// start server
server.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
})



/*io.listen(server);

var listener = io.listen(server);

listener.sockets.on('connection', function(socket){
  //send data to client
  setInterval(function(){
    //socket.emit('date', {'date': new Date()});
  }, 1000);

  //recieve client data
  socket.on('client_data', function(data){
    process.stdout.write(data.letter);
  });
});

*/
//io.sockets.on('connection', routes.vote);

//server.listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});
