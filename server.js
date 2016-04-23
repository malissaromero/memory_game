var http = require('http');

http.createServer(function (request, response) {
  homeRoute(request, response);
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');

function homeRoute(request, response) {
  if(request.url === '/'){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Header\n");
    response.write(username + "\n");
    response.end('Footer\n');
  }
}

function userRoute(request,response) {
  var username = request.url.replace("/", "")
  if (username.length > 0) {

  }
}
