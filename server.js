var http = require('http');
http.createServer(function(req,res){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World! i am paywalldev enviroment');
}).listen(8090);
console.log('Server started on localhost:8090; press Ctrl-C to terminate...!');
