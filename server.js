var express = require("express")
var server = express()

server.use(express.static(__dirname))

server.listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
