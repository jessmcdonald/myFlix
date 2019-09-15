const http = require('http'),
      url = require('url'),
      fs = require('fs');

http.createServer((request, response) => {
  var addr = request.url,
      q = url.parse(addr, true),
      filePath = ' ';

  if(q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function (err) {
    if(err) {
      console.log(err);
    }
      else {
        console.log('Added to log');
      }
  });

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end()
}).listen(8080)

console.log('Welcome to myFlix API');
