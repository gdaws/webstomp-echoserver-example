var http = require('http');
var serveStatic = require('serve-static');
var finalhandler = require('finalhandler');
var open = require('open');
 
var serve = serveStatic('public', {'index': ['index.html']});

var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done);
});

var port = process.env.PORT || 3000;

server.listen(port);

server.on('listening', function() {
  
  var port = server.address().port;
  var url = 'http://localhost:' + port + '/';
  
  console.log('Demo page located at ' + url);
  
  open('http://localhost:' + port);
});

server.on('error', function(error) {
  console.log('Failed to run server: ' + error.message);
});
